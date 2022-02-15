import type { JsxHtmlGlobalProps } from "./jsx-html-global-props";

/**
 * Properties permitted on the `<q>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q
 */
export interface JsxQElementProps extends JsxHtmlGlobalProps {
  cite?: string;
}
