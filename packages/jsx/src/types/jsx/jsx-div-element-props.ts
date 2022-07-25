import type { JsxHtmlGlobalProps } from "./jsx-html-global-props.js";

/**
 * Properties permitted on the `<div>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div
 */
export interface JsxDivElementProps extends JsxHtmlGlobalProps {
  role?: string;
}
