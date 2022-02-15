import type { JsxHtmlGlobalProps } from "./jsx-html-global-props";

/**
 * Properties permitted on the `<html>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html
 */
export interface JsxHtmlElementProps extends JsxHtmlGlobalProps {
  xmlns?: string;
}
