import type { JsxHtmlGlobalProps } from "./jsx-html-global-props.js";

/**
 * Properties permitted on the `<data>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/data
 */
export interface JsxDataElementProps extends JsxHtmlGlobalProps {
  value?: string;
}
