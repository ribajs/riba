import type { JsxHtmlGlobalProps } from "./jsx-html-global-props";

/**
 * Properties permitted on the `<blockquote>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote
 */
export interface JsxBlockquoteElementProps extends JsxHtmlGlobalProps {
  cite?: string;
}
