import type { JsxHtmlGlobalProps } from "./jsx-html-global-props.js";

/**
 * Properties permitted on the `<a>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
 */
export interface JsxAElementProps extends JsxHtmlGlobalProps {
  download?: string;
  href?: string;
  hreflang?: string;
  ping?: string;
  referrerPolicy?: string;
  rel?: string;
  target?: string;
  type?: string;
}
