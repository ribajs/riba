import type { JsxHtmlGlobalProps } from "./jsx-html-global-props.js";

/**
 * Properties permitted on the `<embed>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/embed
 */
export interface JsxEmbedElementProps extends JsxHtmlGlobalProps {
  height?: number;
  src?: string;
  type?: string;
  width?: number;
}
