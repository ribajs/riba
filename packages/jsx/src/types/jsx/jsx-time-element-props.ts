import type { JsxHtmlGlobalProps } from "./jsx-html-global-props";

/**
 * Properties permitted on the `<time>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time
 */
export interface JsxTimeElementProps extends JsxHtmlGlobalProps {
  dateTime?: string;
}
