/**
 * Smoke gate for the built demos: "the verdict, not the subagent report".
 *
 * Every demo in infra/doc/_demos/manifest.json is loaded in a real browser from a
 * static server over infra/doc/_site, one page per demo, and every observation is
 * classified before it is allowed to fail the run:
 *
 *   same-origin  a request to our own 127.0.0.1:<port> with status >= 400, a
 *                failed same-origin request, a console/page error from our own
 *                origin, or an empty document.body  -> HARD failure
 *   external     a request to (or an error coming from) another origin, e.g.
 *                picsum.photos, a podlove CDN or OSM tiles. Counted separately,
 *                never a failure on its own: the demo is not responsible for a
 *                third party being unreachable.
 *   unknown      anything that cannot be attributed to an origin at all ->
 *                HARD failure, because an unexplained finding is a finding we do
 *                not understand yet.
 *   known        a demo whose manifest entry lists knownIssues keeps its findings
 *                in the report (phase 3 needs them) but cannot fail the gate.
 *
 * The script is a plain Node ESM program, deliberately NOT a @playwright/test
 * spec: it must be runnable from CI or from a terminal without a test runner.
 *
 * Usage:  yarn workspace @ribajs/doc smoke:demos
 *   SMOKE_PORT       port for the own static server (default 4799, 0 = free port)
 *   SMOKE_TIMEOUT    ms per demo (default 30000)
 *   SMOKE_SETTLE     ms to wait after a load / a click (default 1500)
 *
 * Exit code 0 when every demo is ok or known, 1 otherwise.
 */
import { createServer } from 'node:http';
import {
  createReadStream,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const docRoot = resolve(__dirname, '..');
const projectRoot = resolve(docRoot, '../..');
const siteDir = resolve(docRoot, '_site');
const manifestFile = resolve(docRoot, '_demos', 'manifest.json');
const outDir = resolve(docRoot, '_smoke');
const reportFile = join(outDir, 'report.json');

/** Default port for the own static server. Never 4173: that is Pascal's live preview. */
const DEFAULT_PORT = 4799;
/** Port of the running live preview (yarn start:live) which must not be disturbed. */
const FORBIDDEN_PORT = 4173;
/** Settle time after a load and after a link click. */
const SETTLE_MS = numEnv('SMOKE_SETTLE', 1500);
/** Hard limit per demo. */
const DEMO_TIMEOUT_MS = numEnv('SMOKE_TIMEOUT', 30_000);
/** Viewport used for every demo, so findings are comparable between runs. */
const VIEWPORT = { width: 1280, height: 900 };
/** Upper bound of findings kept per demo, so one broken CDN cannot flood the report. */
const MAX_FINDINGS = 50;

/** Media range requests the browser is allowed to abandon on its own. */
const MEDIA_RE = /\.(mp4|webm|ogg|mp3|m4a|wav|avi|mov)(\?|$)/i;
/** How many findings of a failed demo are named on stdout. */
const STDOUT_FINDINGS = 3;

/**
 * @param {string} name
 * @param {number} fallback
 * @returns {number}
 */
function numEnv(name, fallback) {
  const raw = Number(process.env[name]);
  return Number.isFinite(raw) && raw > 0 ? raw : fallback;
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.eot': 'application/vnd.ms-fontobject',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.wasm': 'application/wasm',
  '.pdf': 'application/pdf',
};

/**
 * Maps a request path onto a file inside the site directory, refusing every path
 * that tries to leave it.
 * @param {string} urlPath
 * @returns {string | null} absolute file path or null
 */
export function resolveSiteFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  const rel = normalize(decoded).replace(/^([/\\])+/, '');
  const abs = resolve(siteDir, rel);
  // Traversal guard: anything outside the site dir is a 404, never a file read.
  if (abs !== siteDir && !abs.startsWith(siteDir + sep)) return null;
  try {
    if (statSync(abs).isDirectory()) {
      const index = join(abs, 'index.html');
      return existsSync(index) ? index : null;
    }
    return abs;
  } catch {
    return null;
  }
}

/**
 * Minimal static file server for infra/doc/_site. Node http + fs on purpose: no
 * dependency, and it must never be the vite preview that already serves the live
 * documentation site.
 * @param {number} port
 * @returns {Promise<{ server: import('node:http').Server, port: number }>}
 */
function startServer(port) {
  return new Promise((resolvePromise, rejectPromise) => {
    const server = createServer((req, res) => {
      const file = resolveSiteFile(req.url || '/');
      if (!file) {
        res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
        return;
      }
      res.writeHead(200, {
        'content-type': MIME_TYPES[extname(file).toLowerCase()] || 'application/octet-stream',
        'cache-control': 'no-store',
      });
      createReadStream(file).pipe(res);
    });
    server.on('error', rejectPromise);
    server.listen(port, '127.0.0.1', () => {
      const address = server.address();
      resolvePromise({ server, port: typeof address === 'object' && address ? address.port : port });
    });
  });
}

/**
 * Starts the static server, falling back to a free port when the preferred one is
 * taken. An explicitly requested SMOKE_PORT is never silently moved.
 * @returns {Promise<{ server: import('node:http').Server, port: number }>}
 */
async function startServerWithFallback() {
  const requested = process.env.SMOKE_PORT !== undefined ? numEnv('SMOKE_PORT', DEFAULT_PORT) : DEFAULT_PORT;
  if (requested === FORBIDDEN_PORT) {
    throw new Error(
      `SMOKE_PORT=${FORBIDDEN_PORT} is the running live preview (yarn start:live) and must not be reused`,
    );
  }
  try {
    return await startServer(requested);
  } catch (err) {
    if (process.env.SMOKE_PORT !== undefined) throw err;
    console.log(`[smoke-demos] port ${requested} is busy, falling back to a free port`);
    return startServer(0);
  }
}

/**
 * @returns {Promise<Array<Record<string, any>>>}
 */
function loadManifest() {
  if (!existsSync(manifestFile)) {
    throw new Error(`manifest not found: ${manifestFile} (run "yarn workspace @ribajs/doc build:demos" first)`);
  }
  /** @type {any} */
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(manifestFile, 'utf8'));
  } catch (err) {
    throw new Error(`manifest is not valid JSON: ${manifestFile} (${err instanceof Error ? err.message : err})`);
  }
  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error(`manifest is empty or not an array: ${manifestFile}`);
  }
  return parsed;
}

/**
 * Playwright is a dependency of the repository root, not of @ribajs/doc. Under Yarn
 * PnP an import from this script would therefore be refused, so it is resolved
 * through the root package as a fallback.
 * @returns {Promise<import('@playwright/test').BrowserType>}
 */
async function loadChromium() {
  try {
    const direct = await import('@playwright/test');
    if (direct.chromium) return direct.chromium;
  } catch {
    // not a dependency of this workspace, try the root below
  }
  const requireFromRoot = createRequire(join(projectRoot, 'package.json'));
  /** @type {string} */
  let resolved;
  try {
    resolved = requireFromRoot.resolve('@playwright/test');
  } catch (err) {
    throw new Error(
      `@playwright/test could not be resolved from ${projectRoot}. Run this script through Yarn ` +
        `(yarn workspace @ribajs/doc smoke:demos) so the PnP runtime is loaded. ` +
        `Under plain node the workspace dependency of the repository root is invisible. ` +
        `Original error: ${err instanceof Error ? err.message : err}`,
    );
  }
  const mod = await import(pathToFileURL(resolved).href);
  return mod.chromium || (mod.default && mod.default.chromium);
}

/**
 * Origin class of a URL relative to our own server.
 * @param {string} url
 * @param {string} baseOrigin
 * @returns {'same-origin' | 'external' | 'unknown'}
 */
export function classifyUrl(url, baseOrigin) {
  if (!url) return 'unknown';
  let parsed;
  try {
    parsed = new URL(url, baseOrigin);
  } catch {
    return 'unknown';
  }
  if (parsed.origin === baseOrigin) return 'same-origin';
  if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return 'external';
  // data:, blob:, about: carry no origin, so they cannot be attributed at all.
  return 'unknown';
}

/**
 * First http(s) URL inside a message or stack trace, which is how an error coming
 * from a third party names its origin.
 * @param {string} text
 * @returns {string}
 */
function firstUrlInText(text) {
  const match = String(text).match(/https?:\/\/[^\s'"()<>]+/);
  return match ? match[0] : '';
}

/**
 * THE decision of the gate: external findings are free, everything else that was
 * not explained away by knownIssues fails, and a demo with declared knownIssues is
 * reported but never fails the run.
 * @param {Array<{ origin: string }>} findings
 * @param {unknown[]} knownIssues
 * @returns {'ok' | 'known' | 'failed'}
 */
export function demoStatus(findings, knownIssues) {
  if (Array.isArray(knownIssues) && knownIssues.length > 0) return 'known';
  return findings.some((finding) => finding.origin !== 'external') ? 'failed' : 'ok';
}

/**
 * @param {string} value
 * @param {number} max
 * @returns {string}
 */
function shorten(value, max) {
  const flat = String(value).replace(/\s+/g, ' ').trim();
  return flat.length > max ? `${flat.slice(0, max - 1)}…` : flat;
}

/**
 * @param {number} ms
 * @param {string} label
 * @returns {Promise<never>}
 */
function rejectAfter(ms, label) {
  return new Promise((_, rejectPromise) => {
    const timer = setTimeout(() => rejectPromise(new Error(`timeout after ${ms}ms (${label})`)), ms);
    timer.unref?.();
  });
}

/**
 * Attaches the listeners that collect findings for one page.
 * @param {import('@playwright/test').Page} page
 * @param {string} baseOrigin
 * @returns {(finding: { kind: string, url: string, detail: string }) => void} add
 */
function collectFindings(page, baseOrigin) {
  /** @type {Array<{ kind: string, origin: string, url: string, detail: string }>} */
  const findings = [];
  /** @type {Set<string>} */
  const seen = new Set();
  let truncated = false;

  /**
   * @param {string} kind
   * @param {string} url
   * @param {string} detail
   * @param {'same-origin' | 'external' | 'unknown'} [origin]
   */
  const add = (kind, url, detail, origin) => {
    const key = `${kind}|${url}|${detail}`;
    if (seen.has(key)) return;
    seen.add(key);
    if (findings.length >= MAX_FINDINGS) {
      truncated = true;
      return;
    }
    findings.push({ kind, origin: origin || classifyUrl(url, baseOrigin), url, detail: shorten(detail, 400) });
  };

  page.on('console', (message) => {
    if (message.type() !== 'error') return;
    // Chrome reports "Failed to load resource: 404" with the resource URL as the
    // message location, which is exactly what the classification needs.
    const location = message.location();
    add('console', (location && location.url) || page.url(), message.text());
  });

  page.on('pageerror', (error) => {
    const text = `${error.message}\n${error.stack || ''}`;
    const candidate = firstUrlInText(text);
    // An error naming a foreign origin is that origin's problem, not the demo's.
    if (candidate && classifyUrl(candidate, baseOrigin) === 'external') {
      add('pageerror', candidate, error.message, 'external');
      return;
    }
    if (candidate) {
      add('pageerror', candidate, error.message);
      return;
    }
    add('pageerror', page.url(), error.message, 'unknown');
  });

  page.on('requestfailed', (request) => {
    const failure = request.failure();
    const errorText = failure ? failure.errorText : 'request failed';
    // A browser aborts a media range request on its own once it has enough of
    // the file (or when the element leaves the DOM). The file is present and
    // served, so ERR_ABORTED on media is the normal path, not a defect.
    if (errorText === 'net::ERR_ABORTED' && MEDIA_RE.test(request.url())) {
      add('media-aborted', request.url(), errorText, 'external');
      return;
    }
    add('requestfailed', request.url(), errorText);
  });

  page.on('response', (response) => {
    if (response.status() < 400) return;
    add(`http-${response.status()}`, response.url(), `${response.status()} ${response.statusText()}`);
  });

  return Object.assign(add, {
    /** @returns {Array<{ kind: string, origin: string, url: string, detail: string }>} */
    list() {
      if (truncated) {
        findings.push({
          kind: 'truncated',
          origin: 'unknown',
          url: '',
          detail: `more than ${MAX_FINDINGS} findings, only the first ${MAX_FINDINGS} are listed`,
        });
      }
      return findings;
    },
  });
}

/**
 * Finds a link that leaves the current entry and leads to another entry of the
 * same demo. Router demos are multi page apps, so the link is what proves that the
 * pjax navigation works.
 * @param {import('@playwright/test').Page} page
 * @param {string[]} entries
 * @param {string} current
 * @returns {Promise<{ index: number, href: string, matchesEntry: boolean } | null>}
 */
function findInternalLink(page, entries, current) {
  return page.evaluate(
    ({ names, currentEntry }) => {
      const links = Array.from(document.querySelectorAll('a[href]'));
      const usable = links.filter((link) => {
        const href = (link.getAttribute('href') || '').trim();
        if (!href || href.startsWith('#')) return false;
        if (/^(mailto:|tel:|javascript:|https?:)/i.test(href)) return false;
        return true;
      });
      const targetOf = (href) => {
        const clean = href.split('#')[0].split('?')[0];
        return clean.split('/').pop() || '';
      };
      const indexOfOther = usable.findIndex(
        (link) => names.includes(targetOf(link.getAttribute('href') || '')) &&
          targetOf(link.getAttribute('href') || '') !== currentEntry,
      );
      if (indexOfOther >= 0) {
        const link = usable[indexOfOther];
        return {
          index: links.indexOf(link),
          href: (link.getAttribute('href') || '').trim(),
          matchesEntry: true,
        };
      }
      const first = usable[0];
      if (!first) return null;
      return { index: links.indexOf(first), href: (first.getAttribute('href') || '').trim(), matchesEntry: false };
    },
    { names: entries, currentEntry: current },
  );
}

/**
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<number>} length of the rendered text, -1 when not measurable
 */
function bodyTextLength(page) {
  return page.evaluate(() => {
    const text = document.body ? document.body.innerText : '';
    return text.trim().length;
  });
}

/**
 * @param {string} origin
 * @param {string} id
 * @param {string} entry
 * @returns {string}
 */
function demoUrl(origin, id, entry) {
  return `${origin}/demos/${id}/${entry}`;
}

/**
 * Runs one demo in its own page. Never throws: every failure becomes a finding so
 * that one broken demo cannot hide the other 44.
 * @param {import('@playwright/test').Browser} browser
 * @param {Record<string, any>} entry
 * @param {string} origin
 * @returns {Promise<Record<string, any>>}
 */
async function smokeDemo(browser, entry, origin) {
  const id = String(entry.id);
  const entries = Array.isArray(entry.entries) ? entry.entries.map(String) : [];
  const knownIssues = Array.isArray(entry.knownIssues) ? entry.knownIssues : [];
  const primary = entries[0] || 'index.html';
  const screenshot = join(outDir, `${id}.png`);
  /** @type {Array<{ kind: string, origin: string, url: string, detail: string }>} */
  let findings = [];
  let navigatedTo = '';
  let error = '';

  /** @type {import('@playwright/test').Page} */
  const page = await browser.newPage({ viewport: VIEWPORT });
  page.setDefaultNavigationTimeout(DEMO_TIMEOUT_MS);
  page.setDefaultTimeout(Math.min(10_000, DEMO_TIMEOUT_MS));
  const add = collectFindings(page, origin);

  try {
    if (entries.length === 0) {
      add('no-entry', `${origin}/demos/${id}/`, `manifest entry has no built html (status: ${entry.status || 'unknown'})`);
    }
    for (const rel of entries) {
      const url = demoUrl(origin, id, rel);
      // domcontentloaded, not load: `load` waits for third party resources too
      // (images, CDNs), so one unreachable external host would turn into a demo
      // timeout instead of an `external` finding. Resource errors raised during
      // the settle window are still collected, the listeners stay attached.
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(SETTLE_MS);
      let length = -1;
      try {
        length = await bodyTextLength(page);
      } catch (err) {
        add('unreadable-body', page.url(), `document.body not readable: ${err instanceof Error ? err.message : err}`);
      }
      if (length === 0) {
        add('empty-body', page.url(), 'document.body.innerText is empty, the demo rendered nothing');
      }
      // The link click is the proof that pjax navigation works, so only the first
      // entry of a multi page (router) demo needs it.
      if (rel === primary && entries.length > 1) {
        const link = await findInternalLink(page, entries, primary);
        if (!link) {
          add('no-link', url, 'multi entry demo but no internal link to click, pjax navigation untested');
        } else {
          let clicked = false;
          for (const force of [false, true]) {
            try {
              await page.locator('a[href]').nth(link.index).click({ force, timeout: 5_000 });
              clicked = true;
              break;
            } catch {
              // a hidden link is worth one retry, then it is a finding
            }
          }
          if (!clicked) {
            add('link-click', url, `internal link "${link.href}" could not be clicked`);
          } else {
            await page.waitForTimeout(SETTLE_MS);
            navigatedTo = page.url();
          }
        }
      }
    }
  } catch (err) {
    error = err instanceof Error ? err.message : String(err);
    add('demo-error', page.url(), error);
  }

  try {
    mkdirSync(outDir, { recursive: true });
    await page.screenshot({ path: screenshot });
  } catch (err) {
    console.log(`  screenshot failed for ${id}: ${err instanceof Error ? err.message : err}`);
  }
  findings = add.list();
  await page.close();

  const hard = findings.filter((f) => f.origin !== 'external');
  const external = findings.length - hard.length;
  // A demo with declared knownIssues keeps its findings but cannot fail the gate.
  const status = demoStatus(findings, knownIssues);

  return {
    id,
    entry: primary,
    url: demoUrl(origin, id, primary),
    status,
    entries,
    navigatedTo,
    knownIssues,
    counts: { findings: findings.length, sameOriginOrUnknown: hard.length, external },
    findings,
    error,
    screenshot: screenshot.replace(`${projectRoot}${sep}`, ''),
  };
}

/**
 * @param {Record<string, any>} result
 * @returns {string} one line cause for stdout
 */
function failureCause(result) {
  const hard = result.findings.filter((f) => f.origin !== 'external');
  const parts = hard.slice(0, STDOUT_FINDINGS).map((f) => `${f.kind}${f.origin === 'unknown' ? '(unknown)' : ''} ${f.detail || f.url}`);
  const more = hard.length > STDOUT_FINDINGS ? ` (+${hard.length - STDOUT_FINDINGS} more)` : '';
  return `${parts.join('; ')}${more}`;
}

/**
 * Removes screenshots of a previous run, so the count of png files always
 * reflects this run.
 */
function clearOldScreenshots() {
  if (!existsSync(outDir)) return;
  for (const file of readdirSync(outDir)) {
    if (file.toLowerCase().endsWith('.png')) {
      try {
        unlinkSync(join(outDir, file));
      } catch {
        // best effort
      }
    }
  }
}

async function main() {
  if (!existsSync(siteDir)) {
    console.error(`[smoke-demos] site not found: ${siteDir} (run "yarn workspace @ribajs/doc build" first)`);
    process.exitCode = 1;
    return;
  }
  const manifest = loadManifest();

  mkdirSync(outDir, { recursive: true });
  clearOldScreenshots();

  const { server, port } = await startServerWithFallback();
  const origin = `http://127.0.0.1:${port}`;
  console.log(`[smoke-demos] serving ${siteDir} at ${origin}/ (${manifest.length} demos)`);

  /** @type {import('@playwright/test').Browser | null} */
  let browser = null;
  /** @type {Record<string, any>[]} */
  const results = [];
  try {
    const chromium = await loadChromium();
    try {
      browser = await chromium.launch();
    } catch (err) {
      console.error('[smoke-demos] Chromium did not start, so no demo could be judged.');
      console.error(`[smoke-demos] ${shorten(err instanceof Error ? err.message : err, 400)}`);
      try {
        console.error(`[smoke-demos] expected executable: ${chromium.executablePath()}`);
      } catch {
        // executablePath may throw for a broken install
      }
      console.error('[smoke-demos] Playwright browsers are never installed automatically here.');
      console.error('[smoke-demos] fix: yarn playwright install chromium');
      process.exitCode = 1;
      return;
    }

    for (const entry of manifest) {
      // `riba.demo.skip` leaves a demo out on purpose; a build-failed one stays judged.
      if (entry.status === 'skipped') continue;
      const started = Date.now();
      /** @type {Record<string, any>} */
      let result;
      try {
        result = await Promise.race([smokeDemo(browser, entry, origin), rejectAfter(DEMO_TIMEOUT_MS, String(entry.id))]);
      } catch (err) {
        // Hard timeout: the demo never finished, that is a failure of the demo.
        const message = err instanceof Error ? err.message : String(err);
        result = {
          id: String(entry.id),
          entry: (Array.isArray(entry.entries) && entry.entries[0]) || 'index.html',
          url: demoUrl(origin, String(entry.id), (Array.isArray(entry.entries) && entry.entries[0]) || 'index.html'),
          status: demoStatus([{ origin: 'unknown' }], entry.knownIssues),
          entries: Array.isArray(entry.entries) ? entry.entries : [],
          navigatedTo: '',
          knownIssues: Array.isArray(entry.knownIssues) ? entry.knownIssues : [],
          counts: { findings: 1, sameOriginOrUnknown: 1, external: 0 },
          findings: [{ kind: 'timeout', origin: 'unknown', url: '', detail: message }],
          error: message,
          screenshot: join(outDir, `${entry.id}.png`).replace(`${projectRoot}${sep}`, ''),
        };
      }
      results.push(result);
      const seconds = ((Date.now() - started) / 1000).toFixed(1);
      if (result.status === 'ok') {
        console.log(`${result.id}: ok${result.counts.external ? ` (${result.counts.external} external)` : ''} (${seconds}s)`);
      } else if (result.status === 'known') {
        console.log(`${result.id}: known (${result.counts.findings} findings) (${seconds}s)`);
      } else {
        console.log(`${result.id}: FAILED ${failureCause(result)} (${seconds}s)`);
      }
    }
  } finally {
    if (browser) await browser.close().catch(() => undefined);
    await new Promise((done) => server.close(() => done(undefined)));
  }

  const passed = results.filter((r) => r.status === 'ok').length;
  const known = results.filter((r) => r.status === 'known').length;
  const failed = results.filter((r) => r.status === 'failed').length;
  const external = results.reduce((sum, r) => sum + r.counts.external, 0);
  const report = {
    generatedAt: new Date().toISOString(),
    base: `${origin}/demos/`,
    port,
    total: results.length,
    passed,
    known,
    failed,
    external,
    results,
  };
  writeFileSync(reportFile, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  console.log(
    `[smoke-demos] ${report.total} demos: ${passed} ok, ${known} known, ${failed} failed, ${external} external findings`,
  );
  console.log(`[smoke-demos] report: ${reportFile}`);
  process.exitCode = failed > 0 ? 1 : 0;
}

/**
 * True when this file is the process entry point, false when it was imported.
 * The module exports its pure helpers (classifyUrl, demoStatus, resolveSiteFile)
 * so they can be checked without a browser and without running a gate.
 * @returns {boolean}
 */
function isEntryPoint() {
  const entry = process.argv[1];
  if (!entry) return false;
  try {
    return resolve(entry) === fileURLToPath(import.meta.url);
  } catch {
    return false;
  }
}

if (isEntryPoint()) {
  main().catch((err) => {
    console.error('[smoke-demos] fatal:', err instanceof Error ? err.message : err);
    process.exitCode = 1;
  });
}