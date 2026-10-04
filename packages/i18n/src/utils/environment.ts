// Every access to document, window and navigator goes through here so the
// services stay usable without a DOM (SSR, workers, node tests).

export const getHtmlLangcode = (): string | undefined => {
  if (typeof document === "undefined" || !document.documentElement) {
    return undefined;
  }
  return document.documentElement.lang || undefined;
};

export const setHtmlLangcode = (langcode: string) => {
  if (typeof document === "undefined" || !document.documentElement) {
    return;
  }
  if (document.documentElement.lang !== langcode) {
    document.documentElement.lang = langcode;
  }
};

export const getQueryLangcode = (param: string): string | undefined => {
  if (typeof location === "undefined") {
    return undefined;
  }
  return new URLSearchParams(location.search).get(param) || undefined;
};

export const getNavigatorLangcodes = (): string[] => {
  if (typeof navigator === "undefined") {
    return [];
  }
  if (navigator.languages?.length) {
    return [...navigator.languages];
  }
  return navigator.language ? [navigator.language] : [];
};

// localStorage throws in some privacy modes, a missing store is not an error
export const readStorage = (key: string): string | undefined => {
  try {
    return globalThis.localStorage?.getItem(key) || undefined;
  } catch {
    return undefined;
  }
};

export const writeStorage = (key: string, value: string) => {
  try {
    globalThis.localStorage?.setItem(key, value);
  } catch {
    /* storage unavailable, the choice is just not remembered */
  }
};

/** Accept `de_AT` as well as `de-AT` */
export const normalizeLangcode = (langcode: string) =>
  langcode.trim().replace(/_/g, "-");

/** `zh-Hant-TW` -> `["zh-Hant-TW", "zh-Hant", "zh"]` */
export const langcodeVariants = (langcode: string): string[] => {
  const parts = normalizeLangcode(langcode).split("-").filter(Boolean);
  const variants: string[] = [];
  for (let length = parts.length; length > 0; length--) {
    variants.push(parts.slice(0, length).join("-"));
  }
  return variants;
};

/** Find the entry of `available` that serves `candidate`, ignoring case and region */
export const matchLangcode = (
  candidate: string,
  available: string[],
): string | undefined => {
  for (const variant of langcodeVariants(candidate)) {
    const found = available.find(
      (code) => normalizeLangcode(code).toLowerCase() === variant.toLowerCase(),
    );
    if (found) {
      return found;
    }
  }
  return undefined;
};
