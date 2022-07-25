import type { JsxHtmlGlobalProps } from "./jsx-html-global-props.js";

/**
 * Properties permitted on the `<ol>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol
 */
export interface JsxOlElementProps extends JsxHtmlGlobalProps {
  reversed?: boolean;
  start?: number;
  type?: "a" | "A" | "i" | "I" | "1";
}
