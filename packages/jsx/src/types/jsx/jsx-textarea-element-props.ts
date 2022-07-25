import type { JsxHtmlGlobalProps } from "./jsx-html-global-props.js";

/**
 * Properties permitted on the `<textarea>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea
 */
export interface JsxTextareaElementProps extends JsxHtmlGlobalProps {
  autocomplete?: string;
  autofocus?: boolean;
  cols?: number;
  disabled?: boolean;
  maxLength?: number;
  minLength?: number;
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  rows?: number;
  wrap?: "hard" | "soft";
}
