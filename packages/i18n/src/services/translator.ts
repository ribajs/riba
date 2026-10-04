import type { LocalVars, MessageTree, PluralForms } from "../types/index.js";
import { langcodeVariants } from "../utils/environment.js";

const PLURAL_KEYS = ["zero", "one", "two", "few", "many", "other"];

export const isPluralForms = (value: unknown): value is PluralForms => {
  if (!value || typeof value !== "object") {
    return false;
  }
  const entries = Object.entries(value);
  return (
    entries.length > 0 &&
    entries.every(
      ([key, form]) => PLURAL_KEYS.includes(key) && typeof form === "string",
    )
  );
};

/** Walk a key path without copying the tree. Empty strings are valid messages. */
export const lookup = (
  tree: MessageTree | undefined,
  path: string | string[],
): string | PluralForms | MessageTree | undefined => {
  const segments = Array.isArray(path) ? path : path.split(".");
  let node: unknown = tree;
  for (const segment of segments) {
    if (
      !segment ||
      !node ||
      typeof node !== "object" ||
      !Object.prototype.hasOwnProperty.call(node, segment)
    ) {
      return undefined;
    }
    node = (node as MessageTree)[segment];
  }
  return node as string | PluralForms | MessageTree | undefined;
};

/** Replace `{{ name }}`, unknown names stay untouched */
export const interpolate = (message: string, vars?: LocalVars): string => {
  if (!vars) {
    return message;
  }
  return message.replace(/{{\s*([A-Za-z0-9_-]+)\s*}}/g, (match, name) => {
    const value = Object.prototype.hasOwnProperty.call(vars, name)
      ? vars[name]
      : undefined;
    return typeof value === "string" || typeof value === "number"
      ? String(value)
      : match;
  });
};

export const selectPlural = (
  forms: PluralForms,
  count: unknown,
  langcode: string,
): string | undefined => {
  const n =
    typeof count === "string" && count.trim() === "" ? NaN : Number(count);
  if (count === undefined || count === null || Number.isNaN(n)) {
    return forms.other;
  }
  // Exact numbers win, so "zero" works in languages whose rules have no such category
  const exact =
    n === 0 ? "zero" : n === 1 ? "one" : n === 2 ? "two" : undefined;
  if (exact && forms[exact] !== undefined) {
    return forms[exact];
  }
  let category = "other";
  try {
    category = new Intl.PluralRules(langcode).select(n);
  } catch {
    /* unknown langcode, "other" is the safe form */
  }
  return forms[category as keyof PluralForms] ?? forms.other;
};

export interface TranslatorOptions {
  getTree: (langcode: string) => MessageTree | undefined;
  fallbackLangcodes?: string[];
}

/** Pure key lookup with a per-key fallback chain: `de-AT` -> `de` -> fallbacks */
export class Translator {
  constructor(protected options: TranslatorOptions) {}

  public chain(langcode: string): string[] {
    const chain: string[] = [];
    for (const code of [langcode, ...(this.options.fallbackLangcodes || [])]) {
      for (const variant of langcodeVariants(code)) {
        if (!chain.includes(variant)) {
          chain.push(variant);
        }
      }
    }
    return chain;
  }

  public translate(
    langcode: string,
    path: string | string[],
    vars?: LocalVars,
  ): string | undefined {
    for (const code of this.chain(langcode)) {
      const found = lookup(this.options.getTree(code), path);
      if (typeof found === "string") {
        return interpolate(found, vars);
      }
      if (isPluralForms(found)) {
        const form = selectPlural(found, vars?.count, code);
        if (form !== undefined) {
          return interpolate(form, vars);
        }
      }
    }
    return undefined;
  }
}
