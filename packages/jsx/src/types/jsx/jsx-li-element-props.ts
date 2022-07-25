import type { JsxHtmlGlobalProps } from "./jsx-html-global-props.js";

/**
 * Properties permitted on the `<li>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li
 */
export interface JsxLiElementProps extends JsxHtmlGlobalProps {
  value?: number;
}
