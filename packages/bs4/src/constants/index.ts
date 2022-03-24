export const NODE_TEXT = 3;

// EventDispatcher events
export const TOGGLE_BUTTON = {
  nsPrefix: "bs4-toggle-button:",
  eventNames: {
    toggle: "toggle",
    toggled: "toggled",
    init: "init",
    state: "state",
  },
};

export const TOGGLE_ATTRIBUTE = {
  elEventNames: {
    removed: "removed",
    added: "added",
  },
};

export const TOGGLE_CLASS = {
  elEventNames: {
    removed: "removed",
    added: "added",
  },
};

export const URI_ATTRS = [
  "background",
  "cite",
  "href",
  "itemtype",
  "longdesc",
  "poster",
  "src",
  "xlink:href",
];

export const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;

/**
 * A pattern that recognizes a commonly useful subset of URLs that are safe.
 *
 * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
 */
export const SAFE_URL_PATTERN =
  /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi;

/**
 * A pattern that matches safe data URLs. Only matches image, video and audio types.
 *
 * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
 */
export const DATA_URL_PATTERN =
  /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

export const DEFAULT_ALLOWLIST = {
  // Global attributes allowed on any supplied element below.
  "*": ["class", "dir", "id", "lang", "role", ARIA_ATTRIBUTE_PATTERN],
  a: ["target", "href", "title", "rel"],
  area: [] as string[],
  b: [] as string[],
  br: [] as string[],
  col: [] as string[],
  code: [] as string[],
  div: [] as string[],
  em: [] as string[],
  hr: [] as string[],
  h1: [] as string[],
  h2: [] as string[],
  h3: [] as string[],
  h4: [] as string[],
  h5: [] as string[],
  h6: [] as string[],
  i: [] as string[],
  img: ["src", "srcset", "alt", "title", "width", "height"],
  li: [] as string[],
  ol: [] as string[],
  p: [] as string[],
  pre: [] as string[],
  s: [] as string[],
  small: [] as string[],
  span: [] as string[],
  sub: [] as string[],
  sup: [] as string[],
  strong: [] as string[],
  u: [] as string[],
  ul: [] as string[],
};

export const MILLISECONDS_MULTIPLIER = 1000;
export const TRANSITION_END = "transitionend";
