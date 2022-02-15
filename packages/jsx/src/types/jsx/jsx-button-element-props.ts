import type { JsxHtmlGlobalProps } from "./jsx-html-global-props";

/**
 * Properties permitted on the `<button>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
 */
export interface JsxButtonElementProps extends JsxHtmlGlobalProps {
  autofocus?: boolean;
  disabled?: boolean;
  form?: string;
  formAction?: string;
  formEnctype?:
    | "application/x-www-form-urlencoded"
    | "multipart/form-data"
    | "text/plain";
  formMethod?: "get" | "post";
  formNoValidate?: boolean;
  formTarget?: "_self" | "_blank" | "_parent" | "_top";
  name?: string;
  type?: "submit" | "reset" | "button";
  value?: string;
}
