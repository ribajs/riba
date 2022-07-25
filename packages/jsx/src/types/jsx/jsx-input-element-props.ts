import type { JsxHtmlGlobalProps } from "./jsx-html-global-props.js";

/**
 * Properties permitted on the `<input>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
 */
export interface JsxInputElementProps extends JsxHtmlGlobalProps {
  accept?: string;
  alt?: string;
  autocomplete?: string;
  autofocus?: boolean;
  capture?: string;
  checked?: boolean;
  dirName?: string;
  disabled?: boolean;
  form?: string;
  formAction?: string;
  formEnctype?: string;
  formMethod?: string;
  formNoValidate?: boolean;
  formTarget?: string;
  height?: number;
  list?: string;
  max?: number;
  maxLength?: number;
  min?: number;
  minLength?: number;
  multiple?: boolean;
  name?: string;
  pattern?: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  size?: number;
  src?: string;
  step?: number;
  type?:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
  value?: string;
  width?: number;
}
