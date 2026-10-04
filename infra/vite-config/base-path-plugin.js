/**
 * Vite plugin that rewrites root-absolute asset references in the build output so
 * they carry Vite's `base`.
 *
 * Why this exists: Riba.js components take their asset URLs as plain strings
 * (`collapse-icon-src="/iconset/svg/arrow_carrot.svg"`,
 * `image-src="/images/raum27.jpg"`, `rv-bs5-attr-xs-src="'/videos/mobile.mp4'"`).
 * Vite only rewrites the URLs *it* knows about — the ones it emits — so those
 * hardcoded root-absolute strings survive the build untouched. As soon as the
 * site is not served from the domain root (GitHub Pages project sites, any
 * sub-path install) every one of them 404s. A fix per demo would have to touch
 * ~45 demos and would rot again on the next component; this plugin fixes it once,
 * centrally, for every demo and every consumer of this shared config.
 *
 * Design constraints (they are what keeps the rewrite safe):
 * - Only roots that can actually resolve are rewritten. A reference is only
 *   touched when the first path segment is a top-level entry of the public
 *   directory (files that are served from the site root) or one of the roots
 *   this package itself guarantees (see ALWAYS_PUBLIC_ROOTS). So `/api/foo`,
 *   `/some/route` and every route-relative reference stay exactly as they are.
 * - The path must look like a URL reference, not a coincidence: it has to start
 *   at a quote / paren / equals sign (optionally with whitespace in between) and
 *   its first segment has to end on a boundary character. That is what keeps
 *   `https://example.com/images/a.png` (preceded by `m`), protocol-relative
 *   `//cdn.example.com/x.js` and data URIs (`"/data:image/png;base64,...` — the
 *   `:` is not a boundary) untouched.
 * - A path that already carries the base is left alone, so a second run, or a
 *   URL that was written with the base by hand, never becomes `/a/a/…`.
 * - `srcset` candidates are not quoted, so a comma is accepted as an anchor as
 *   well: prefixing the first candidate but not the second would change what
 *   `srcset` means.
 */

import { existsSync, readdirSync } from "fs";

/**
 * Roots that are valid in every project using this config, independent of what
 * a public directory happens to contain.
 *
 * `/iconset/` is here because ribaIconsetPlugin() emits @ribajs/iconset into the
 * build root (`iconset/svg/*.svg`) even when there is no public directory at
 * all — the demo builds write to `/iconset/svg/…` while their public folder
 * only holds `images/`.
 *
 * @type {string[]}
 */
const ALWAYS_PUBLIC_ROOTS = [
  "iconset",
  "images",
  "videos",
  "fonts",
  "css",
  "js",
  "media",
  "data",
];

/**
 * The two halves of the match, as CHARACTER CLASS BODIES (no surrounding
 * brackets). Kept bracket-free on purpose: interpolating a string that already
 * ends in `]` into `[...]` yields `[...]]`, and V8 does not read that back as
 * "class plus literal bracket" — the pattern then compiles and matches nothing
 * at all, which is very hard to see.
 */

/** Characters that may follow the first path segment of a rewrite candidate. */
// prettier-ignore
const TAIL_BOUNDARY = '"\'`\\s?#/&\\)=';

/**
 * Characters a root-absolute reference may be anchored at: a quote (JS string,
// HTML attribute), a paren (CSS `url()`, Pug output) or `=` (unquoted attribute).
 * A comma is included for the `srcset="a 1x, b 2x"` case.
 */
// prettier-ignore
const ANCHORS = '"\'`\\(=,';

/**
 * @param {string} value
 * @returns {string}
 */
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Normalizes a Vite `base` into the prefix that is concatenated in front of a
 * root-absolute path.
 *
 * Inactive bases ('/', './', '', undefined) return null, which switches the
 * plugin off entirely. An absolute-URL base (`https://cdn.example.com/`) is
 * kept as it is; only the path part behind the scheme gets its duplicate
 * slashes collapsed.
 *
 * @param {unknown} raw
 * @returns {string|null} base with a single trailing slash, or null
 */
export function normalizeBasePath(raw) {
  if (typeof raw !== "string") {
    return null;
  }
  const trimmed = raw.trim();
  if (!trimmed || trimmed === "/" || trimmed === "./") {
    return null;
  }

  const schemeMatch = /^(?:[a-z][a-z0-9+.-]*:)?\/\//i.exec(trimmed);
  const scheme = schemeMatch ? schemeMatch[0] : "";
  let rest = trimmed.slice(scheme.length);

  // './base/' and '../base/' are relative bases: the site root-absolute paths
  // still need the leading slash of a URL, so normalise them to '/base/'.
  if (rest.startsWith("./") || rest.startsWith("../")) {
    rest = `/${rest.replace(/^(\.\.\/|\.\/)+/, "")}`;
  }

  rest = rest.replace(/\/{2,}/g, "/");
  if (!rest.endsWith("/")) {
    rest += "/";
  }
  return scheme + rest;
}

/**
 * Top-level entries of a public directory: everything the site serves from its
 * root. Dotfiles are skipped (`.nojekyll` is not referenced from a template, and
 * a leading dot cannot appear in a URL path segment anyway).
 *
 * @param {string|undefined} publicDir
 * @returns {string[]}
 */
function readPublicRoots(publicDir) {
  if (!publicDir || !existsSync(publicDir)) {
    return [];
  }
  try {
    return readdirSync(publicDir).filter(
      (entry) => entry.length > 0 && !entry.startsWith("."),
    );
  } catch {
    // Unreadable public dir: fall back to the guaranteed roots only.
    return [];
  }
}

/**
 * Rewrites root-absolute asset references in text so they carry `base`.
 *
 * @param {string} text
 * @param {string} base - normalized base with a trailing slash
 * @param {string[]} roots - valid first path segments, without leading slash
 * @returns {string}
 */
export function applyBasePath(text, base, roots) {
  if (!text || !roots.length) {
    return text;
  }

  // Longest first, so `images` cannot shadow a root named `images-raw`.
  const alternation = [...roots]
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join("|");

  // The optional base group is what makes the rewrite idempotent: a reference
  // that already carries the base matches with that group filled and is put
  // back unchanged.
  const pattern = new RegExp(
    `([${ANCHORS}])(\\s*)(${escapeRegExp(base)})?\\/(?:${alternation})(?=[${TAIL_BOUNDARY}])`,
    "g",
  );

  return text.replace(pattern, (match, anchor, space, existingBase) => {
    if (existingBase !== undefined) {
      // Already prefixed — never produce `/demos/x/demos/x/…`.
      return match;
    }
    const consumed = `${anchor}${space}`;
    // `base` ends with '/', the path starts with '/' — join on one slash.
    return `${anchor}${space}${base}${match.slice(consumed.length + 1)}`;
  });
}

/**
 * Extensions whose (emitted) file contents are text and may be rewritten.
 * Everything else in the bundle is binary and is passed through untouched.
 */
const TEXT_EXTENSIONS = new Set([
  "html",
  "js",
  "mjs",
  "cjs",
  "css",
  "json",
  "map",
  "svg",
  "txt",
  "xml",
  "webmanifest",
]);

/**
 * @param {string} fileName
 * @returns {boolean}
 */
function isTextFile(fileName) {
  const ext = fileName.slice(fileName.lastIndexOf(".") + 1).toLowerCase();
  return TEXT_EXTENSIONS.has(ext);
}

/**
 * Vite plugin that prefixes root-absolute asset references with the resolved
 * `base` in the generated bundle.
 *
 * Active only when `config.base` is a real prefix. With base '/', './' or unset
 * the plugin removes its own hooks, so it costs nothing at all.
 *
 * @param {Object} [options]
 * @param {string[]} [options.additionalRoots] - further valid first path
 *   segments, for projects that serve more than the public directory from root
 * @param {boolean} [options.alwaysOn] - keep the hooks even when base is a root
 *   base (used by the tests to assert the rewrite itself)
 * @returns {import('vite').Plugin}
 */
export function ribaBasePathPlugin(options = {}) {
  const { additionalRoots = [] } = options;

  /** @type {string|null} normalized base, null while the plugin is inactive */
  let base = null;
  /** @type {Set<string>} valid first path segments */
  let roots = new Set();

  /** @type {import('vite').Plugin} */
  const plugin = {
    name: "riba-base-path",

    configResolved(config) {
      const resolvedBase = normalizeBasePath(config && config.base);
      if (!resolvedBase) {
        // Root base: nothing to rewrite. Drop the hook so the plugin is a no-op
        // instead of walking the bundle for every build.
        delete plugin.generateBundle;
        return;
      }
      base = resolvedBase;
      roots = new Set([
        ...ALWAYS_PUBLIC_ROOTS,
        ...readPublicRoots(config && config.publicDir),
        ...additionalRoots,
      ]);
    },

    generateBundle(_outputOptions, bundle) {
      if (!base || !roots.size) {
        return;
      }
      const rootList = [...roots];

      for (const fileName of Object.keys(bundle)) {
        const chunk = bundle[fileName];
        if (!chunk || (chunk.type !== "asset" && chunk.type !== "chunk")) {
          continue;
        }
        // Rolldown (Vite 8) carries the code of a chunk in `code`; plain Rollup
        // uses `source` for both chunks and assets. Read and write whichever
        // field is actually present, otherwise the rewrite silently does
        // nothing on a Rolldown build.
        const isAsset = chunk.type === "asset" || fileName.endsWith(".html");
        if (isAsset && !isTextFile(fileName)) {
          continue;
        }
        const field =
          !isAsset && typeof chunk.code === "string" ? "code" : "source";
        const current = chunk[field];
        if (typeof current !== "string") {
          // Uint8Array/Buffer: decode, rewrite, re-encode. Binary assets are
          // filtered out above by extension, so utf8 in / utf8 out is safe.
          if (!current || typeof current.length !== "number") {
            continue;
          }
          const text = Buffer.from(
            current.buffer ?? current,
            current.byteOffset ?? 0,
            current.byteLength ?? current.length,
          ).toString("utf8");
          const rewrittenBytes = applyBasePath(text, base, rootList);
          if (rewrittenBytes !== text) {
            chunk[field] = Buffer.from(rewrittenBytes, "utf8");
          }
          continue;
        }

        const rewritten = applyBasePath(current, base, rootList);
        if (rewritten !== current) {
          chunk[field] = rewritten;
        }
      }
    },
  };

  return plugin;
}

export default ribaBasePathPlugin;
