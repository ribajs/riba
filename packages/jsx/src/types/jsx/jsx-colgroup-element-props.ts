import type { JsxHtmlGlobalProps } from "./jsx-html-global-props.js";

/**
 * Properties permitted on the `<colgroup>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup
 */
export interface JsxColgroupElementProps extends JsxHtmlGlobalProps {
  span?: number;
}
