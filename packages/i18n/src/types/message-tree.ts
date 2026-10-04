/**
 * Plural forms of one message, selected by the `count` variable.
 * `zero`, `one` and `two` match the exact number first, the rest follows `Intl.PluralRules`.
 */
export interface PluralForms {
  zero?: string;
  one?: string;
  two?: string;
  few?: string;
  many?: string;
  other?: string;
}

/** The messages of one language, nested by key path (`form.newsletter.title`) */
export interface MessageTree {
  [key: string]: string | PluralForms | MessageTree;
}

/** Messages of all languages, keyed by langcode */
export interface Catalog {
  [langcode: string]: MessageTree;
}

/** Variables for `{{ name }}` placeholders; `count` also selects the plural form */
export interface LocalVars {
  [name: string]: string | number;
}
