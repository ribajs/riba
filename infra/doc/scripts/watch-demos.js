/**
 * Incremental watcher for the live demos.
 *
 * scripts/build-demos.js builds all 45 demos into infra/doc/_demos/<id>/ in one
 * go; scripts/watch.js rebuilds the whole documentation. During a live demo
 * neither is what you want: editing one demo file should rebuild ONE demo and
 * republish it into the served infra/doc/_site/demos/<id>/, leaving the doc
 * pages alone (see vite.config.js -> demoCopyPlugin, whose copy this mirrors).
 *
 * Design decisions:
 * - No chokidar: same Node built-ins only approach as scripts/watch.js.
 * - Per-demo debounce (DEBOUNCE_MS) plus a concurrency-limited queue, so an
 *   editor save burst collapses into one build and at most CONCURRENCY builds
 *   run at once. A change that lands while its demo is building queues a second
 *   run, so the last save always wins.
 * - infra/doc/_demos/<id> is the truth and infra/doc/_site/demos/<id> the mirror,
 *   exactly like the doc build's writeBundle copy. The destination is removed
 *   before the copy because --emptyOutDir only empties _demos/<id>; without it
 *   the hashed assets of every previous build would pile up in _site forever.
 * - Same hardening as build-demos.js: a per-build timeout with one retry and a
 *   stray-process sweep by --outDir marker, because rolldown (vite 8)
 *   intermittently deadlocks and never exits. A watcher that hangs on the first
 *   change is useless, so the whole watcher stays alive instead.
 */
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, watch as fsWatch } from 'node:fs';
import { cp, rm } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const docRoot = resolve(__dirname, '..');
const projectRoot = resolve(docRoot, '../..');
const demosSrcDir = resolve(projectRoot, 'demos');
const demosOutDir = resolve(docRoot, '_demos');
const siteDemosDir = resolve(docRoot, '_site', 'demos');
/** Shared Vite config every demo builds with (infra/vite-config/index.js). */
const viteConfigDir = resolve(projectRoot, 'infra', 'vite-config');

/** How many demo builds run at the same time. */
const CONCURRENCY = 4;
/** Debounce per demo: an editor save writes several files in a row. */
const DEBOUNCE_MS = 300;
/** Number of trailing stderr lines kept for a failed build. */
const ERROR_LINES = 15;
/**
 * Hard limit per demo build, same reason as in build-demos.js: with parallel
 * spawns under PnP a single `vite build` occasionally blocks at startup forever
 * instead of exiting. Override with RIBA_DEMO_BUILD_TIMEOUT (seconds).
 */
const BUILD_TIMEOUT_MS = (() => {
  const raw = Number(process.env.RIBA_DEMO_BUILD_TIMEOUT);
  return Number.isFinite(raw) && raw > 0 ? raw * 1000 : 300_000;
})();

/**
 * URL base for the built demos. Kept identical to build-demos.js: VITE_BASE_PATH
 * when absolute, a plain root base otherwise.
 * @returns {string} base path starting with '/'
 */
function resolveSiteBase() {
  const fromEnv = process.env.VITE_BASE_PATH;
  if (fromEnv && fromEnv.startsWith('/')) {
    // Keep in sync with build-demos.js: no trailing slash would concatenate to
    // `/subpathdemos/...` and silently break every asset URL.
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
 * A demo whose package.json sets `riba.demo.skip` is not built by
 * build-demos.js either, so the watcher leaves it alone.
 * @param {string} id
 * @returns {boolean}
 */
function isSkipped(id) {
  try {
    const pkg = JSON.parse(readFileSync(join(demosSrcDir, id, 'package.json'), 'utf8'));
    return Boolean(pkg?.riba?.demo?.skip);
  } catch {
    return false;
  }
}

/**
 * Last few stderr lines of a failed build, printed so the cause is visible
 * without scrolling back through the watcher output.
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
 * Builds currently running, so stopping the watcher cannot leave orphaned vite
 * builds behind: `yarn` spawns `vite build` as a child, so the whole process
 * group has to go down, not just the process we spawned.
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
 * observed as a vite build blocked for hours at 0 % CPU. The marker is specific
 * to demo builds (they all carry the shared `_demos` output dir), so nothing
 * outside a demo build can match.
 */
function killStrayBuilds() {
  const marker = `--outDir ${demosOutDir}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  try {
    spawnSync('pkill', ['-9', '-f', `vite build.*${marker}`], { stdio: 'ignore' });
  } catch {
    // pkill missing or nothing matched - the sweep is best effort.
  }
}

/**
 * Builds one demo. Same call as build-demos.js, so both paths produce
 * identical output.
 * @param {string} id
 * @param {string} base
 * @returns {Promise<{ ok: boolean, stderr: string, timedOut: boolean, reason: string }>}
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

    const finish = (ok, reason, timedOut = false) => {
      if (settled) return;
      settled = true;
      if (timer) clearTimeout(timer);
      runningBuilds.delete(child);
      if (ok) {
        resolvePromise({ ok: true, stderr: '', timedOut: false, reason: '' });
        return;
      }
      resolvePromise({
        ok: false,
        stderr: stderr.trim() || stdout.trim(),
        timedOut,
        reason: String(reason),
      });
    };

    child.stdout?.on('data', (chunk) => {
      stdout += String(chunk);
    });
    child.stderr?.on('data', (chunk) => {
      stderr += String(chunk);
    });

    timer = setTimeout(() => {
      const message = `timeout after ${Math.round(BUILD_TIMEOUT_MS / 1000)}s, killed`;
      stderr = `${stderr}\n[watch-demos] ${message}`.trim();
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
      finish(false, `exit ${code}`);
    });
  });
}

/**
 * Mirrors the finished build into the served site, the same target the doc
 * build's writeBundle copy uses.
 * @param {string} id
 * @returns {Promise<void>}
 */
async function publishDemo(id) {
  const src = join(demosOutDir, id);
  const dest = join(siteDemosDir, id);
  if (!existsSync(src)) return;
  await rm(dest, { recursive: true, force: true });
  await cp(src, dest, { recursive: true, force: true });
}

/**
 * Builds one demo and republishes it. A build failure is reported, never fatal:
 * the watcher has to stay up for the next save.
 * @param {string} id
 * @param {string} base
 */
async function runDemo(id, base) {
  const started = Date.now();
  // A timed-out build is not a demo error (rolldown deadlock), so it is retried
  // once on its own before it counts as a failure.
  let result = await buildDemo(id, base);
  if (!result.ok && result.timedOut) {
    console.log(`  retry    ${id} after timeout`);
    result = await buildDemo(id, base);
  }
  const seconds = ((Date.now() - started) / 1000).toFixed(1);
  if (!result.ok) {
    console.error(`  FAILED   ${id} (${seconds}s): ${result.reason}`);
    if (result.stderr) console.error(trimError(result.stderr));
    return;
  }
  try {
    await publishDemo(id);
  } catch (err) {
    console.error(`  FAILED   ${id} (${seconds}s): copy to _site: ${err instanceof Error ? err.message : err}`);
    return;
  }
  const dest = relative(docRoot, join(siteDemosDir, id)).split(sep).join('/');
  console.log(`  rebuilt ${id} (${seconds}s) -> ${dest}`);
}

/** Ids waiting for a free build slot. @type {string[]} */
const queue = [];
/** Ids already in `queue`, so a second change does not duplicate them. @type {Set<string>} */
const queued = new Set();
/** Ids with a running debounce timer. @type {Map<string, NodeJS.Timeout>} */
const debounceTimers = new Map();
let inFlight = 0;

/**
 * Starts queued builds while below CONCURRENCY.
 */
function pump() {
  while (inFlight < CONCURRENCY && queue.length > 0) {
    const id = queue.shift();
    queued.delete(id);
    inFlight += 1;
    runDemo(id, base).finally(() => {
      inFlight -= 1;
      pump();
    });
  }
}

/**
 * Marks a demo dirty, debounced per demo so an editor save burst builds once.
 * @param {string} id
 */
function markDirty(id) {
  const pending = debounceTimers.get(id);
  if (pending) clearTimeout(pending);
  debounceTimers.set(
    id,
    setTimeout(() => {
      debounceTimers.delete(id);
      if (queued.has(id)) return;
      queued.add(id);
      queue.push(id);
      pump();
    }, DEBOUNCE_MS),
  );
}

/**
 * A change in the shared Vite config affects every demo, so all of them are
 * marked dirty and the pool rebuilds them with the usual concurrency.
 * @param {string[]} ids
 */
function markAllDirty(ids) {
  for (const id of ids) markDirty(id);
}

/** Path fragments that never carry demo sources. */
function isIgnoredFile(filename) {
  if (!filename) return false;
  const parts = filename.split(/[/\\]/);
  return parts.some(
    (part) =>
      part === 'node_modules' ||
      part.startsWith('.') ||
      // Vite writes a temporary compiled config next to the real one.
      /timestamp-\d+-\w+\.mjs$/.test(part),
  );
}

/**
 * Watches one directory, ignoring noise. A directory that cannot be watched
 * (missing, too many open files) is reported and skipped, never fatal.
 * @param {string} dir
 * @param {string} label
 * @param {(filename: string) => void} onChange
 * @returns {import('node:fs').FSWatcher | null}
 */
function watchDir(dir, label, onChange) {
  try {
    const watcher = fsWatch(dir, { recursive: true }, (_event, filename) => {
      if (isIgnoredFile(filename)) return;
      onChange(String(filename ?? ''));
    });
    watcher.on('error', (err) => console.error(`[watch-demos] ${label}: ${err}`));
    return watcher;
  } catch (err) {
    console.error(`[watch-demos] cannot watch ${dir}: ${err instanceof Error ? err.message : err}`);
    return null;
  }
}

/** @type {import('node:fs').FSWatcher[]} */
const watchers = [];
const base = resolveSiteBase();

function main() {
  // A previous watcher that was killed hard can have left a deadlocked vite
  // build behind; those hold handles and pollute this run, so clear them first.
  killStrayBuilds();

  const ids = discoverDemos();
  if (ids.length === 0) {
    console.error(`[watch-demos] no demos with a package.json found in ${demosSrcDir}`);
    process.exitCode = 1;
    return;
  }

  for (const id of ids) {
    if (isSkipped(id)) continue;
    const mark = (filename) => markDirty(id);
    for (const sub of ['src', 'public']) {
      const dir = join(demosSrcDir, id, sub);
      if (!existsSync(dir)) continue;
      const watcher = watchDir(dir, `demos/${id}/${sub}`, mark);
      if (watcher) watchers.push(watcher);
    }
  }

  if (existsSync(viteConfigDir)) {
    const watcher = watchDir(viteConfigDir, 'infra/vite-config', () => markAllDirty(ids));
    if (watcher) watchers.push(watcher);
  } else {
    console.error(`[watch-demos] shared Vite config ${viteConfigDir} not found, not watching it`);
  }

  if (!existsSync(siteDemosDir)) {
    console.warn(
      `[watch-demos] ${relative(docRoot, siteDemosDir)} does not exist yet - run ` +
        `\`yarn build:demos\` and a doc build once before serving the site.`,
    );
  }

  console.log(
    `[watch-demos] ${ids.length} demos (base ${base}demos/<id>/, concurrency ${CONCURRENCY}, ` +
      `timeout ${Math.round(BUILD_TIMEOUT_MS / 1000)}s)`,
  );
  console.log(
    `[watch-demos] watching demos/*/src, demos/*/public, infra/vite-config - rebuild on change`,
  );
}

function stop() {
  for (const timer of debounceTimers.values()) clearTimeout(timer);
  debounceTimers.clear();
  for (const watcher of watchers) {
    try {
      watcher.close();
    } catch {
      // already closed
    }
  }
  for (const child of runningBuilds) killBuild(child);
}

for (const signal of ['exit', 'SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    stop();
    if (signal !== 'exit') process.exitCode = 0;
  });
}

main();
