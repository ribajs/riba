export type DetectSource = "query" | "storage" | "html" | "navigator";

/**
 * What `translate()` does with a missing key:
 * `keep` returns undefined (the binder then keeps the source markup),
 * `marker` returns a visible marker string, `throw` throws.
 */
export type MissingStrategy = "keep" | "marker" | "throw";

export interface LocalesOptions {
  /**
   * Language the markup is written in.
   * Used when a translation is missing or the source language is active.
   * Default: the `lang` attribute of the html element, otherwise `en`.
   */
  sourceLangcode?: string;
  /** Tried per key after the active language and its base language, in this order */
  fallbackLangcodes?: string[];
  /** Selectable languages. Default for the static service: the keys of the catalog. */
  langcodes?: string[];
  /** Where to look for the initial language, first match wins. Default: `["html"]` */
  detect?: DetectSource[];
  /** Remember the chosen language in `localStorage`. Default: false */
  persist?: boolean;
  /** `localStorage` key used by `persist` and `detect: ["storage"]` */
  storageKey?: string;
  /** Query parameter used by `detect: ["query"]`. Default: `lang` */
  queryParam?: string;
  /** Write the active language to the `lang` attribute of the html element. Default: true */
  syncHtmlLang?: boolean;
  missing?: MissingStrategy;
}

export interface LocalesEvents {
  ready: [langcode: string];
  changed: [langcode: string, previousLangcode: string];
  missing: [path: string, langcode: string];
  error: [error: Error];
}
