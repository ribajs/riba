import type { JsxHtmlGlobalProps } from "./jsx-html-global-props";

/**
 * Properties permitted on the `<progress>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress
 */
export interface JsxProgressElementProps extends JsxHtmlGlobalProps {
  max?: number;
  value?: number;
}