/**
 * Quality gate for the doc site translations (`yarn workspace @ribajs/doc check:locales`).
 *
 * English is the markup, so a translation can go wrong in ways the build does
 * not notice: it can outlive the text it translates, lose a placeholder, or
 * exist without the English page it belongs to. This script reports
 *   - translation files without an English sibling
 *   - translated pages that no page renders through md() (they would never show)
 *   - catalog keys that no markup, script or demo asks for (orphans)
 *   - `{{ var }}` placeholders that differ from the English text
 *   - demos without an English title and description
 *   - invalid YAML or JSON
 * and exits with 1 if it found anything.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import yaml from "js-yaml";
import {
  buildLocales,
  referencedMarkdown,
  resolveRoots,
} from "./build-locales.js";
import { findTranslatedMarkdown, markdownKey } from "./doc-markdown.js";
import { extractDescription, extractTitle } from "./readme-metadata.js";

const PLURAL_KEYS = ["zero", "one", "two", "few", "many", "other"];
const PLACEHOLDER = /{{\s*([A-Za-z0-9_-]+)\s*}}/g;
/** Status values the manifest can hold, see build-demos.js */
const DEMO_STATUSES = ["ok", "skipped", "build-failed", "unknown"];

// A lone `other` is as likely a key named "other" as a plural, so it is walked as a tree.
const isPluralForms = (value) =>
  value &&
  typeof value === "object" &&
  Object.keys(value).length > 1 &&
  Object.keys(value).every((key) => PLURAL_KEYS.includes(key));

/** Leaves of a catalog tree as `[dotted path, string | plural forms]`. */
function* leaves(tree, prefix = "") {
  for (const [key, value] of Object.entries(tree)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string" || isPluralForms(value)) yield [path, value];
    else if (value && typeof value === "object") yield* leaves(value, path);
  }
}

function* walk(dir, accept) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "node_modules" && entry.name !== "__tests__") {
        yield* walk(full, accept);
      }
    } else if (accept(entry.name)) {
      yield full;
    }
  }
}

const placeholdersOf = (text) =>
  [...String(text).matchAll(PLACEHOLDER)].map((match) => match[1]).sort();

/**
 * Keys the markup and scripts ask for. A key built at runtime (`'ui.status.' + x`,
 * `` `ui.status.${x}` ``) is recorded as a prefix and checked by that prefix.
 * `fallbacks` holds the English text of uiText() calls to compare placeholders.
 */
export function collectUsedKeys({ srcDir }) {
  const exact = new Set();
  const prefixes = new Set();
  const fallbacks = new Map();

  // rv-i18n-text="'ui.demos.other'" (complete) or "'ui.status." + x (prefix)
  const attribute = /rv-i18n-[a-z-]+="'([A-Za-z0-9_.\-/]+)('")?/g;
  const views = [
    ...walk(join(srcDir, "views"), (name) => name.endsWith(".pug")),
    ...walk(join(srcDir, "ts"), (name) => name.endsWith(".html")),
  ];
  for (const file of views) {
    for (const match of readFileSync(file, "utf8").matchAll(attribute)) {
      (match[2] ? exact : prefixes).add(match[1]);
    }
  }

  // uiText("key", "English fallback") or uiText(`prefix.${x}`, someVariable)
  const call =
    /uiText\(\s*(["'`])([^"'`]+)\1(?:\s*,\s*(["'`])((?:\\.|(?!\3).)*)\3)?/gs;
  for (const file of walk(join(srcDir, "ts"), (name) => name.endsWith(".ts"))) {
    for (const match of readFileSync(file, "utf8").matchAll(call)) {
      const key = match[2];
      if (key.includes("${")) {
        prefixes.add(key.slice(0, key.indexOf("${")));
      } else {
        exact.add(key);
        if (match[4] !== undefined) fallbacks.set(key, match[4]);
      }
    }
  }
  return { exact, prefixes, fallbacks };
}

/**
 * Sidebar keys, by the rule of the navTitle mixin in views/partials/sidebar.pug:
 * the page name for a link to a page, `group-<title>` for a group.
 */
export function navigationKeys({ srcDir }) {
  const file = join(srcDir, "content", "navigation.yml");
  const keys = new Set();
  if (!existsSync(file)) return keys;
  const visit = (items) => {
    for (const item of items || []) {
      keys.add(
        item.url && item.url.endsWith(".html")
          ? item.url.slice(0, -5)
          : `group-${String(item.title).toLowerCase().replace(/\s+/g, "-")}`,
      );
      visit(item.links);
    }
  };
  visit(yaml.load(readFileSync(file, "utf8")));
  return keys;
}

function demoIds({ demosDir }) {
  if (!existsSync(demosDir)) return [];
  return readdirSync(demosDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => existsSync(join(demosDir, entry.name, "package.json")))
    .map((entry) => entry.name)
    .sort();
}

/** @returns {string[]} problems, empty when everything is consistent */
export function checkLocales(roots = resolveRoots()) {
  const problems = [];
  const rel = (file) => relative(roots.projectRoot, file);

  // 1. YAML and JSON must parse
  if (existsSync(roots.localesDir)) {
    for (const file of walk(roots.localesDir, (name) =>
      /\.ya?ml$/.test(name),
    )) {
      try {
        yaml.load(readFileSync(file, "utf8"));
      } catch (error) {
        problems.push(
          `${rel(file)}: invalid YAML (${error.message.split("\n")[0]})`,
        );
      }
    }
  }
  const builtDir = join(roots.docRoot, "_site", "locales");
  for (const file of walk(builtDir, (name) => name.endsWith(".json"))) {
    try {
      JSON.parse(readFileSync(file, "utf8"));
    } catch (error) {
      problems.push(`${rel(file)}: invalid JSON (${error.message})`);
    }
  }

  // 2. every translated file has an English sibling, every translated page is rendered
  const translated = [
    ...findTranslatedMarkdown(roots.docDir),
    ...findTranslatedMarkdown(roots.demosDir),
    ...findTranslatedMarkdown(join(roots.projectRoot, "packages")),
  ];
  const rendered = new Set(referencedMarkdown(roots));
  for (const { source, file, lang } of translated) {
    if (!existsSync(source)) {
      problems.push(`${rel(file)}: no English sibling ${rel(source)}`);
      continue;
    }
    const isDemoReadme = file.startsWith(roots.demosDir);
    if (isDemoReadme) {
      const text = readFileSync(file, "utf8");
      if (!extractTitle(text) || !extractDescription(text)) {
        problems.push(
          `${rel(file)}: needs a title and a first paragraph, the card would show English`,
        );
      }
    } else if (!rendered.has(source)) {
      problems.push(
        `${rel(file)}: no page renders ${rel(source)} through md(), the ${lang} text would never show`,
      );
    }
    // 4. the placeholders (and code that looks like them) must survive
    const english = placeholdersOf(readFileSync(source, "utf8"));
    const foreign = placeholdersOf(readFileSync(file, "utf8"));
    if (english.join() !== foreign.join()) {
      problems.push(
        `${rel(file)}: {{ placeholders }} differ from ${rel(source)} (en: ${english.join(", ") || "none"}; ${lang}: ${foreign.join(", ") || "none"})`,
      );
    }
  }

  // 5. every demo has an English title and description; a translation has its own
  for (const id of demoIds(roots)) {
    const readme = join(roots.demosDir, id, "README.md");
    const text = existsSync(readme) ? readFileSync(readme, "utf8") : "";
    if (!extractTitle(text) || !extractDescription(text)) {
      problems.push(
        `demos/${id}/README.md: needs an English title and a first paragraph`,
      );
    }
  }

  // 3. every catalog key is asked for by something
  let catalogs = {};
  try {
    catalogs = buildLocales(roots);
  } catch (error) {
    // an unparsable source is reported above, do not hide it behind this
    if (problems.length === 0) problems.push(`catalogs: ${error.message}`);
  }
  const used = collectUsedKeys(roots);
  const nav = navigationKeys(roots);
  const demos = new Set(demoIds(roots));
  const markdown = new Set(
    referencedMarkdown(roots).map((file) => markdownKey(file, roots)),
  );
  for (const [lang, tree] of Object.entries(catalogs)) {
    for (const [path, value] of leaves(tree)) {
      let known =
        used.exact.has(path) ||
        [...used.prefixes].some((prefix) => path.startsWith(prefix));
      if (path.startsWith("ui.nav.")) {
        known = nav.has(path.slice("ui.nav.".length));
      } else if (path.startsWith("ui.status.")) {
        known = DEMO_STATUSES.includes(path.slice("ui.status.".length));
      } else if (path.startsWith("demos.")) {
        const [, id, field] = path.split(".");
        known = demos.has(id) && (field === "title" || field === "description");
      } else if (path.startsWith("md.")) {
        known = markdown.has(path.slice("md.".length));
      }
      if (!known) {
        problems.push(
          `${lang}: orphan key "${path}", nothing in the markup or scripts asks for it`,
        );
        continue;
      }
      // 4. placeholders of a uiText() translation match its English fallback
      const fallback = used.fallbacks.get(path);
      if (fallback !== undefined && typeof value === "string") {
        const english = placeholdersOf(fallback);
        const foreign = placeholdersOf(value);
        if (english.join() !== foreign.join()) {
          problems.push(
            `${lang}: "${path}" has other {{ placeholders }} than its English text (en: ${english.join(", ") || "none"}; ${lang}: ${foreign.join(", ") || "none"})`,
          );
        }
      }
    }
  }

  return problems;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  const problems = checkLocales();
  if (problems.length === 0) {
    console.log("[check-locales] ok");
  } else {
    for (const problem of problems) console.error(`[check-locales] ${problem}`);
    console.error(`[check-locales] ${problems.length} problem(s)`);
    process.exitCode = 1;
  }
}
