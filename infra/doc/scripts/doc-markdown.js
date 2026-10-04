/**
 * Markdown pages of the doc site, shared by the Pug helper `md()` and the
 * locale catalog build, so a page and its translation are rendered alike.
 *
 * A page `guide/install.md` is the English source. Translations sit next to it
 * as `guide/install.<lang>.md`; the language tag follows the usual `de`,
 * `de-AT` shape.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { basename, dirname, join, relative, resolve, sep } from "node:path";
import { marked } from "marked";

const LANG_FILE = /^(.+)\.([a-z]{2,3}(?:-[A-Za-z0-9]+)*)\.md$/;

/** @param {string} text */
export function renderMarkdown(text) {
  return marked.parse(text, { async: false });
}

/**
 * Catalog key of a markdown file: its path without the extension, relative to
 * the doc content dir (or the repo root for files outside it). The key never
 * contains a dot, because the i18n module splits key paths on dots.
 * @param {string} file absolute path of the English source
 * @param {{ docDir: string, projectRoot: string }} roots
 */
export function markdownKey(file, { docDir, projectRoot }) {
  const fromDoc = relative(docDir, file);
  const rel = fromDoc.startsWith("..") ? relative(projectRoot, file) : fromDoc;
  return rel.split(sep).join("/").replace(/\.md$/, "");
}

/**
 * Translations that exist next to an English markdown file.
 * @param {string} file absolute path of the English source
 * @returns {string[]} language tags
 */
export function translationsOf(file) {
  const dir = dirname(file);
  const stem = basename(file, ".md");
  if (!existsSync(dir)) return [];
  const langs = [];
  for (const name of readdirSync(dir)) {
    const match = LANG_FILE.exec(name);
    if (match && match[1] === stem) langs.push(match[2]);
  }
  return langs.sort();
}

/**
 * Every translated markdown file below a directory, as the English source plus
 * the translation: `{ lang, source, file }`.
 * @param {string} rootDir
 */
export function findTranslatedMarkdown(rootDir) {
  const found = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== "node_modules") walk(full);
        continue;
      }
      const match = LANG_FILE.exec(entry.name);
      if (match) {
        found.push({
          lang: match[2],
          file: full,
          source: join(dir, `${match[1]}.md`),
        });
      }
    }
  };
  if (existsSync(rootDir)) walk(rootDir);
  return found;
}

/**
 * Pug helper: the English HTML of a markdown file. If a translation exists, the
 * HTML is wrapped so the i18n binder can swap in the translated catalog entry;
 * the wrapper uses `display: contents` and does not change the layout.
 * @param {string} path relative to `docDir`
 * @param {{ docDir: string, projectRoot: string }} roots
 */
export function md(path, roots) {
  const file = resolve(roots.docDir, path);
  const html = renderMarkdown(readFileSync(file, "utf8"));
  if (translationsOf(file).length === 0) return html;
  const key = markdownKey(file, roots);
  return `<div class="md-i18n" rv-i18n-html="'md.${key}'">${html}</div>`;
}
