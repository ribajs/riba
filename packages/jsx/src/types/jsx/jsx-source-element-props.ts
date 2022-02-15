import type { JsxHtmlGlobalProps } from "./jsx-html-global-props";

/**
 * Properties permitted on the `<source>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source
 */
export interface JsxSourceElementProps extends JsxHtmlGlobalProps {
  media?: string;
  sizes?: string;
  src?: string;
  srcset?: string;
  type?: string;
}
