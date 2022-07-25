import type { JsxHtmlGlobalProps } from "./jsx-html-global-props.js";

/**
 * Properties permitted on the `<area>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/area
 */
export interface JsxAreaElementProps extends JsxHtmlGlobalProps {
  alt?: string;
  coords?: string;
  download?: string;
  href?: string;
  hreflang?: string;
  ping?: string;
  referrerPolicy?: string;
  rel?: string;
  shape?: "rect" | "circle" | "poly" | "default";
  target?: "_self" | "_blank" | "_parent" | "_top";
}
