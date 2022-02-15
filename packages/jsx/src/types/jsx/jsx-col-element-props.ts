import type { JsxHtmlGlobalProps } from "./jsx-html-global-props";

/**
 * Properties permitted on the `<col>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col
 */
export interface JsxColElementProps extends JsxHtmlGlobalProps {
  span?: number;
}
