/**
 * Builds the translation catalogs of the doc site: one JSON tree per language
 * with content, loaded at runtime by the i18n module (`locales/<lang>.json`).
 *
 * English is the source language of every page and needs no catalog. Sources:
 *   - src/locales/<lang>/<name>.yml   UI strings, `<name>` is the top-level key
 *   - demos/<id>/README.<lang>.md     title and description -> demos.<id>.*
 *   - <page>.<lang>.md                rendered html -> md.<key>, see doc-markdown.js
 *
 * Used by the Vite plugin (build + dev server), by watch-demos and by
 * check-locales.js. Run directly it writes the catalogs to _site/locales/.
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import yaml from "js-yaml";
import { markdownKey, renderMarkdown, translationsOf } from "./doc-markdown.js";
import { extractDescription, extractTitle } from "./readme-metadata.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Paths the catalog build needs, all derived from the doc project root. */
export function resolveRoots(docRoot = resolve(__dirname, "..")) {
  const projectRoot = resolve(docRoot, "../..");
  return {
    docRoot,
    projectRoot,
    srcDir: join(docRoot, "src"),
    docDir: join(docRoot, "src", "doc"),
    localesDir: join(docRoot, "src", "locales"),
    demosDir: join(projectRoot, "demos"),
  };
}

/** `de` or `de-AT`, the shape of the language tag in a file name. */
const LANG_FILE = /^README\.([a-z]{2,3}(?:-[A-Za-z0-9]+)*)\.md$/;

function deepMerge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      target[key] = deepMerge(
        target[key] && typeof target[key] === "object" ? target[key] : {},
        value,
      );
    } else {
      target[key] = value;
    }
  }
  return target;
}

/** @returns {Record<string, Record<string, unknown>>} lang -> { <yml name>: tree } */
export function readUiStrings({ localesDir }) {
  const result = {};
  if (!existsSync(localesDir)) return result;
  for (const dir of readdirSync(localesDir, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue;
    const tree = {};
    const langDir = join(localesDir, dir.name);
    for (const file of readdirSync(langDir).sort()) {
      if (!/\.ya?ml$/.test(file)) continue;
      const name = file.replace(/\.ya?ml$/, "");
      const parsed = yaml.load(readFileSync(join(langDir, file), "utf8"));
      if (parsed && typeof parsed === "object") tree[name] = parsed;
    }
    if (Object.keys(tree).length) result[dir.name] = tree;
  }
  return result;
}

/**
 * Title and description of every translated demo README.
 * @returns {Record<string, Record<string, { title?: string, description?: string }>>} lang -> demo id -> fields
 */
export function readDemoTranslations({ demosDir }) {
  const result = {};
  if (!existsSync(demosDir)) return result;
  for (const demo of readdirSync(demosDir, { withFileTypes: true })) {
    if (!demo.isDirectory()) continue;
    const demoDir = join(demosDir, demo.name);
    for (const file of readdirSync(demoDir)) {
      const match = LANG_FILE.exec(file);
      if (!match) continue;
      const markdown = readFileSync(join(demoDir, file), "utf8");
      const fields = {};
      const title = extractTitle(markdown);
      const description = extractDescription(markdown);
      if (title) fields.title = title;
      if (description) fields.description = description;
      if (Object.keys(fields).length) {
        (result[match[1]] ||= {})[demo.name] = fields;
      }
    }
  }
  return result;
}

function* walkPug(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walkPug(full);
    else if (entry.name.endsWith(".pug")) yield full;
  }
}

/**
 * English markdown files the pages render through `md()`, found by reading the
 * Pug sources. Only these can show a translation, so only these enter the catalog.
 * @returns {string[]} absolute paths
 */
export function referencedMarkdown({ srcDir, docDir }) {
  const files = new Set();
  for (const dir of [join(srcDir, "views"), docDir]) {
    for (const pug of walkPug(dir)) {
      for (const line of readFileSync(pug, "utf8").split("\n")) {
        if (/^\s*\/\/-/.test(line)) continue;
        for (const match of line.matchAll(/\bmd\('([^']+)'\)/g)) {
          files.add(resolve(docDir, match[1]));
        }
      }
    }
  }
  return [...files].sort();
}

/**
 * Rendered html of every translation of a referenced markdown file.
 * @returns {Record<string, Record<string, string>>} lang -> md key -> html
 */
export function readMarkdownTranslations(roots) {
  const result = {};
  for (const source of referencedMarkdown(roots)) {
    if (!existsSync(source)) continue;
    const key = markdownKey(source, roots);
    for (const lang of translationsOf(source)) {
      const file = source.replace(/\.md$/, `.${lang}.md`);
      (result[lang] ||= {})[key] = renderMarkdown(readFileSync(file, "utf8"));
    }
  }
  return result;
}

/**
 * Nest `md` keys the way the i18n module reads them: `md.guide/install`.
 * The key holds slashes but never a dot.
 */
function setPath(tree, path, value) {
  const segments = path.split(".");
  let node = tree;
  for (const segment of segments.slice(0, -1)) {
    node = node[segment] ||= {};
  }
  node[segments[segments.length - 1]] = value;
}

/**
 * @returns {Record<string, Record<string, unknown>>} lang -> catalog tree, only languages with content
 */
export function buildLocales(roots = resolveRoots()) {
  const catalogs = {};
  const add = (lang, tree) => {
    catalogs[lang] = deepMerge(catalogs[lang] || {}, tree);
  };

  for (const [lang, tree] of Object.entries(readUiStrings(roots)))
    add(lang, tree);

  for (const [lang, demos] of Object.entries(readDemoTranslations(roots))) {
    add(lang, { demos });
  }

  for (const [lang, pages] of Object.entries(readMarkdownTranslations(roots))) {
    const tree = {};
    for (const [key, html] of Object.entries(pages))
      setPath(tree, `md.${key}`, html);
    add(lang, tree);
  }

  return Object.fromEntries(
    Object.entries(catalogs).filter(([, tree]) => Object.keys(tree).length > 0),
  );
}

/** @param {string} outDir directory that receives `<lang>.json` */
export function writeLocales(outDir, catalogs) {
  mkdirSync(outDir, { recursive: true });
  for (const [lang, tree] of Object.entries(catalogs)) {
    writeFileSync(
      join(outDir, `${lang}.json`),
      `${JSON.stringify(tree)}\n`,
      "utf8",
    );
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const roots = resolveRoots();
  const catalogs = buildLocales(roots);
  const outDir = join(roots.docRoot, "_site", "locales");
  writeLocales(outDir, catalogs);
  console.log(
    `[build-locales] ${Object.keys(catalogs).join(", ") || "no languages"} -> ${outDir}`,
  );
}
