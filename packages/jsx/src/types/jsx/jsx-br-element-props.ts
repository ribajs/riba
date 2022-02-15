import type { JsxHtmlGlobalProps } from "./jsx-html-global-props";

/**
 * Properties permitted on the `<br>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/br
 */
export interface JsxBrElementProps extends JsxHtmlGlobalProps {
  clear?: string;
}
