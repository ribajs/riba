import type { JsxHtmlGlobalProps } from "./jsx-html-global-props.js";

/**
 * Properties permitted on the `<select>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
 */
export interface JsxSelectElementProps extends JsxHtmlGlobalProps {
  autocomplete?: string;
  autofocus?: boolean;
  disabled?: boolean;
  form?: string;
  multiple?: boolean;
  name?: string;
  required?: boolean;
  size?: number;
}
