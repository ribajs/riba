/**
 * Builds every demo under demos/ into infra/doc/_demos/<id>/ and writes a
 * registry (infra/doc/_demos/manifest.json) that the documentation pages read
 * as the `demos` Pug local (see vite-plugin-doc-pages.js -> loadLocals()).
 *
 * Design decisions:
 * - No build step of its own: this is a plain Node ESM script, run via `node`.
 * - A demo that fails to build NEVER aborts the run. The failure is recorded in
 *   the manifest (status "build-failed" + a trimmed `error`) and the script
 *   continues with the next demo, so one broken demo cannot hide the other 44.
 * - The exit code is 0 as long as the manifest could be written; only a fatal
 *   error (unwritable manifest) makes the script fail.
 * - Per-demo overrides live in demos/<id>/package.json under `riba.demo` so the
 *   demos stay self-describing and the doc build needs no hardcoded list.
 */
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const docRoot = resolve(__dirname, '..');
const projectRoot = resolve(docRoot, '../..');
const demosSrcDir = resolve(projectRoot, 'demos');
const demosOutDir = resolve(docRoot, '_demos');
const manifestFile = resolve(demosOutDir, 'manifest.json');

/** How many demo builds run at the same time. */
const CONCURRENCY = 4;
/** Number of trailing stderr lines kept for a failed build. */
const ERROR_LINES = 15;
/**
 * Hard limit per demo build. Observed flakiness: with parallel spawns under PnP a
 * single `vite build` occasionally blocks at startup forever instead of exiting.
 * Without a limit such a demo would stall the whole registry, which is exactly
 * what the "a failed build never aborts the script" rule is meant to prevent.
 * Override with RIBA_DEMO_BUILD_TIMEOUT (seconds).
 */
const BUILD_TIMEOUT_MS = (() => {
  const raw = Number(process.env.RIBA_DEMO_BUILD_TIMEOUT);
  return Number.isFinite(raw) && raw > 0 ? raw * 1000 : 300_000;
})();

/**
 * URL base for the built demos.
 * VITE_BASE_PATH is also read by the doc's own vite.config.js; when it is unset
 * the doc uses a relative base, so the demos fall back to a plain root base.
 * @returns {string} base path starting with '/'
 */
function resolveSiteBase() {
  const fromEnv = process.env.VITE_BASE_PATH;
  if (fromEnv && fromEnv.startsWith('/')) {
    // A base without a trailing slash would be concatenated to `demos/<id>/`
    // as `/subpathdemos/...`, which silently breaks every asset URL.
    return fromEnv.endsWith('/') ? fromEnv : `${fromEnv}/`;
  }
  return '/';
}

/**
 * All directories under demos/ that carry a package.json.
 * @returns {string[]} demo ids, sorted
 */
function discoverDemos() {
  if (!existsSync(demosSrcDir)) return [];
  return readdirSync(demosSrcDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((id) => existsSync(join(demosSrcDir, id, 'package.json')))
    .sort();
}

/**
 * @param {string} file
 * @returns {Record<string, any>}
 */
function readJson(file) {
  return JSON.parse(readFileSync(file, 'utf8'));
}

/**
 * @param {string} id
 * @returns {Record<string, any>}
 */
function readDemoPackage(id) {
  try {
    return readJson(join(demosSrcDir, id, 'package.json'));
  } catch {
    return {};
  }
}

/**
 * Strips markdown decoration that must not leak into the registry.
 * @param {string} value
 * @returns {string}
 */
function stripMarkdown(value) {
  return String(value)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links -> label
    .replace(/`([^`]*)`/g, '$1') // inline code
    .replace(/[*_]{1,3}/g, '') // emphasis
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * First level-1 heading of a README.
 * @param {string} md
 * @returns {string} heading text or ''
 */
function extractTitle(md) {
  const match = md.match(/^\s{0,3}#\s+(.+?)\s*#*\s*$/m);
  if (!match) return '';
  return stripMarkdown(match[1]);
}

/**
 * First meaningful prose paragraph of a README: the first block of text that is
 * neither a heading, a code block, a badge row, a list, a table nor HTML.
 * @param {string} md
 * @returns {string} paragraph or ''
 */
function extractDescription(md) {
  const lines = md.split(/\r?\n/);
  const paragraph = [];
  let inFence = false;
  let inHtmlBlock = false;

  const flush = () => {
    const text = stripMarkdown(paragraph.join(' '));
    paragraph.length = 0;
    return text;
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (/^\s{0,3}(```|~~~)/.test(line)) {
      const text = flush();
      if (text) return text;
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    if (/^\s{0,3}<!--/.test(line)) {
      inHtmlBlock = true;
      continue;
    }
    if (inHtmlBlock) {
      if (line.includes('-->')) inHtmlBlock = false;
      continue;
    }

    if (trimmed === '') {
      const text = flush();
      if (text) return text;
      continue;
    }
    // Headings, rules, lists, quotes, tables, badges and raw HTML are not prose.
    if (
      /^#{1,6}\s/.test(trimmed) ||
      /^(-{3,}|\*{3,}|_{3,})$/.test(trimmed) ||
      /^([-*+]|\d+\.)\s/.test(trimmed) ||
      /^>/.test(trimmed) ||
      /^\|/.test(trimmed) ||
      /^<[a-zA-Z!/]/.test(trimmed) ||
      /^!\[/.test(trimmed)
    ) {
      const text = flush();
      if (text) return text;
      continue;
    }

    paragraph.push(trimmed);
  }
  return flush();
}

/**
 * Category of a demo: the id prefix before the first dash. Ids without a dash
 * (iconset, jsx, lottie, luxon, moment) stay uncategorised.
 * @param {string} id
 * @returns {string}
 */
function extractCategory(id) {
  const dash = id.indexOf('-');
  return dash > 0 ? id.slice(0, dash) : '';
}

/**
 * @param {string} readmePath
 * @param {string} id
 * @param {string} pkgDescription
 * @returns {{ title: string, description: string }}
 */
function readMetadata(id, pkgDescription) {
  const readmePath = join(demosSrcDir, id, 'README.md');
  let md = '';
  if (existsSync(readmePath)) {
    try {
      md = readFileSync(readmePath, 'utf8');
    } catch {
      md = '';
    }
  }
  const title = extractTitle(md) || id;
  const description =
    extractDescription(md) || stripMarkdown(pkgDescription || '') || '';
  return { title, description };
}

/**
 * HTML entry points of a finished demo build, `index.html` first.
 * @param {string} outDir
 * @returns {string[]} posix relative paths
 */
function collectEntries(outDir) {
  if (!existsSync(outDir)) return [];
  const html = [];
  const walk = (dir, prefix) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) walk(join(dir, entry.name), rel);
      else if (entry.name.toLowerCase().endsWith('.html')) html.push(rel);
    }
  };
  walk(outDir, '');
  return html.sort((a, b) => {
    if (a === 'index.html') return -1;
    if (b === 'index.html') return 1;
    return a.localeCompare(b);
  });
}

/**
 * Total size of a directory tree in whole kilobytes.
 * @param {string} dir
 * @returns {number}
 */
function dirSizeKB(dir) {
  if (!existsSync(dir)) return 0;
  let total = 0;
  const walk = (current) => {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const full = join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile()) {
        try {
          total += statSync(full).size;
        } catch {
          // vanished mid-walk: ignore, it just is not counted
        }
      }
    }
  };
  walk(dir);
  return Math.round(total / 1024);
}

/**
 * Last few stderr lines of a failed build, kept short for the manifest.
 * @param {string} stderr
 * @returns {string}
 */
function trimError(stderr) {
  return String(stderr || '')
    .split(/\r?\n/)
    .filter((line) => line.trim() !== '')
    .slice(-ERROR_LINES)
    .join('\n')
    .trim();
}

/**
 * Builds currently running, so a broken run cannot leave orphaned vite builds
 * behind: `yarn` spawns `vite build` as a child, so the whole process group has
 * to go down, not just the process we spawned.
 * @type {Set<import('node:child_process').ChildProcess>}
 */
const runningBuilds = new Set();

/**
 * @param {import('node:child_process').ChildProcess} child
 */
function killBuild(child) {
  try {
    // Negative pid = the child's process group (works because of `detached`).
    process.kill(-child.pid, 'SIGKILL');
  } catch {
    try {
      child.kill('SIGKILL');
    } catch {
      // already gone
    }
  }
}

/**
 * Kills a demo build by its --outDir marker, independently of the pid we
 * spawned. `yarn` spawns `vite build` as a grandchild, and a grandchild that
 * outlives its parent gets reparented to init and survives `kill(-pgid)` —
 * observed as a vite build blocked for hours at 0 % CPU. The marker is
 * specific to this script (every demo build carries the shared `_demos` output
 * dir), so nothing outside a demo build can match.
 */
function killStrayBuilds() {
  const marker = `--outDir ${demosOutDir}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  try {
    spawnSync('pkill', ['-9', '-f', `vite build.*${marker}`], { stdio: 'ignore' });
  } catch {
    // pkill missing or nothing matched - the sweep is best effort.
  }
}

for (const signal of ['exit', 'SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    for (const child of runningBuilds) killBuild(child);
  });
}

/**
 * Runs one demo build.
 * @param {string} id
 * @param {string} base
 * @returns {Promise<{ ok: boolean, stderr: string, timedOut: boolean }>}
 */
function buildDemo(id, base) {
  const cwd = join(demosSrcDir, id);
  const outDir = join(demosOutDir, id);
  // --emptyOutDir is required because outDir lies outside the demo's Vite root.
  const args = [
    'vite',
    'build',
    '--mode',
    'production',
    '--base',
    `${base}demos/${id}/`,
    '--outDir',
    outDir,
    '--emptyOutDir',
  ];
  return new Promise((resolvePromise) => {
    const started = Date.now();
    const child = spawn('yarn', args, {
      cwd,
      env: { ...process.env, FORCE_COLOR: '0', NO_COLOR: '1' },
      stdio: ['ignore', 'pipe', 'pipe'],
      // Own process group, so killBuild() can take the vite grandchild with it.
      detached: true,
    });
    runningBuilds.add(child);
    let stderr = '';
    let stdout = '';
    let settled = false;
    let timer = null;

    const finish = (ok, error, timedOut = false) => {
      if (settled) return;
      settled = true;
      if (timer) clearTimeout(timer);
      runningBuilds.delete(child);
      const seconds = ((Date.now() - started) / 1000).toFixed(1);
      if (ok) {
        console.log(`  ok       ${id} (${seconds}s)`);
        resolvePromise({ ok: true, stderr: '', timedOut: false });
        return;
      }
      console.log(`  FAILED   ${id} (${seconds}s): ${error}`);
      resolvePromise({ ok: false, stderr, timedOut });
    };

    child.stdout?.on('data', (chunk) => {
      stdout += String(chunk);
    });
    child.stderr?.on('data', (chunk) => {
      stderr += String(chunk);
    });

    timer = setTimeout(() => {
      const message = `timeout after ${Math.round(BUILD_TIMEOUT_MS / 1000)}s, killed`;
      stderr = `${stderr}\n[build-demos] ${message}`.trim();
      killBuild(child);
      // The grandchild may survive its reparented group; sweep by outDir marker.
      killStrayBuilds();
      finish(false, message, true);
    }, BUILD_TIMEOUT_MS);
    // Do not hold the event loop open just for this timer.
    timer.unref?.();

    child.on('error', (err) => finish(false, String(err)));
    child.on('close', (code) => {
      if (code === 0) {
        finish(true, '');
        return;
      }
      const detail = stderr.trim() || stdout.trim() || `exit ${code}`;
      stderr = detail;
      finish(false, `exit ${code}`);
    });
  });
}

/**
 * Bounded-concurrency runner: at most `CONCURRENCY` demos build at once.
 * @param {string[]} ids
 * @param {(id: string) => Promise<void>} task
 */
async function runPool(ids, task) {
  let cursor = 0;
  const workers = Array.from({ length: Math.min(CONCURRENCY, ids.length) }, async () => {
    while (cursor < ids.length) {
      const id = ids[cursor++];
      await task(id);
    }
  });
  await Promise.all(workers);
}

/**
 * @param {string} id
 * @param {string} base
 * @returns {Promise<Record<string, any>>} manifest entry
 */
async function buildEntry(id, base) {
  const pkg = readDemoPackage(id);
  const override = (pkg['riba'] && pkg['riba']['demo']) || {};
  const meta = readMetadata(id, pkg.description);
  const knownIssues = Array.isArray(override.knownIssues) ? override.knownIssues : [];

  /** @type {Record<string, any>} */
  const entry = {
    id,
    title: override.title || meta.title,
    description: override.description || meta.description,
    category: override.category !== undefined ? override.category : extractCategory(id),
    entries: [],
    sizeKB: 0,
    status: 'ok',
    knownIssues,
  };

  if (override.skip) {
    entry.status = 'skipped';
    console.log(`  skipped  ${id}`);
    return entry;
  }

  const outDir = join(demosOutDir, id);
  // Rolldown (vite 8) deadlocks intermittently under parallel builds: all
  // rolldown worker threads block on a condvar while the main thread sits in an
  // empty event loop, so the build promise never settles. It is not a demo
  // error, so a timed-out build is retried once on its own before it counts.
  let result = await buildDemo(id, base);
  if (!result.ok && result.timedOut) {
    console.log(`  retry    ${id} after timeout`);
    result = await buildDemo(id, base);
  }
  if (!result.ok) {
    entry.status = 'build-failed';
    entry.error = trimError(result.stderr);
    return entry;
  }
  entry.entries = collectEntries(outDir);
  entry.sizeKB = dirSizeKB(outDir);
  return entry;
}

async function main() {
  // A previous run that was interrupted may have left a deadlocked vite build
  // behind; those hold handles and pollute this run, so clear them first.
  killStrayBuilds();
  const ids = discoverDemos();
  if (ids.length === 0) {
    console.error(`[build-demos] no demos with a package.json found in ${demosSrcDir}`);
    process.exitCode = 1;
    return;
  }

  const base = resolveSiteBase();
  console.log(
    `[build-demos] ${ids.length} demos -> ${demosOutDir}${sep} (base ${base}demos/<id>/, concurrency ${CONCURRENCY})`,
  );

  /** @type {Map<string, Record<string, any>>} */
  const entries = new Map();
  await runPool(ids, async (id) => {
    try {
      entries.set(id, await buildEntry(id, base));
    } catch (err) {
      entries.set(id, {
        id,
        title: id,
        description: '',
        category: extractCategory(id),
        entries: [],
        sizeKB: 0,
        status: 'build-failed',
        knownIssues: [],
        error: trimError(err instanceof Error ? err.stack || err.message : String(err)),
      });
    }
  });

  const manifest = ids.map((id) => entries.get(id));
  writeFileSync(manifestFile, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  const counts = { ok: 0, 'build-failed': 0, skipped: 0 };
  for (const entry of manifest) counts[entry.status] = (counts[entry.status] || 0) + 1;
  const failed = manifest.filter((entry) => entry.status === 'build-failed');
  for (const entry of failed) {
    console.error(`[build-demos] build-failed: ${entry.id}`);
  }
  console.log(
    `[build-demos] ${manifest.length} demos, ${counts.ok} ok, ${counts['build-failed']} build-failed, ${counts.skipped} skipped`,
  );
  console.log(`[build-demos] manifest: ${manifestFile}`);
}

main().catch((err) => {
  console.error('[build-demos] fatal:', err);
  process.exitCode = 1;
});