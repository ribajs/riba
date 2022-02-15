import type { JsxHtmlGlobalProps } from "./jsx-html-global-props";

/**
 * Properties permitted on the `<del>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/del
 */
export interface JsxDelElementProps extends JsxHtmlGlobalProps {
  cite?: string;
  dateTime?: string;
}
