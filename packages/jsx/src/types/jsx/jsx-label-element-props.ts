import type { JsxHtmlGlobalProps } from "./jsx-html-global-props.js";

/**
 * Properties permitted on the `<label>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label
 */
export interface JsxLabelElementProps extends JsxHtmlGlobalProps {
  for?: string;
}
