import type { JsxHtmlGlobalProps } from "./jsx-html-global-props.js";

/**
 * Properties permitted on the `<td>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td
 */
export interface JsxTdElementProps extends JsxHtmlGlobalProps {
  colSpan?: number;
  headers?: string;
  rowSpan?: number;
}
