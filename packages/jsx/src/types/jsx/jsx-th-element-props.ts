import type { JsxHtmlGlobalProps } from "./jsx-html-global-props.js";

/**
 * Properties permitted on the `<th>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th
 */
export interface JsxThElementProps extends JsxHtmlGlobalProps {
  abbr?: string;
  colSpan?: number;
  headers?: string;
  rowSpan?: number;
  scope?: "row" | "col" | "rowgroup" | "colgroup";
}
