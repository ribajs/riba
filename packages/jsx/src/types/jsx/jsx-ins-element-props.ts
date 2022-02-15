import type { JsxHtmlGlobalProps } from "./jsx-html-global-props";

/**
 * Properties permitted on the `<ins>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ins
 */
export interface JsxInsElementProps extends JsxHtmlGlobalProps {
  cite?: string;
  dateTime?: string;
}
