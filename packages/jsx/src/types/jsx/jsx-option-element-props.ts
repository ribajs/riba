import type { JsxHtmlGlobalProps } from "./jsx-html-global-props";

/**
 * Properties permitted on the `<option>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option
 */
export interface JsxOptionElementProps extends JsxHtmlGlobalProps {
  disabled?: boolean;
  label?: string;
  selected?: boolean;
  value?: string;
}
