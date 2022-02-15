import type { JsxHtmlGlobalProps } from "./jsx-html-global-props";

/**
 * Properties permitted on the `<form>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
 */
export interface JsxFormElementProps extends JsxHtmlGlobalProps {
  "accept-charset"?: string;
  action?: string;
  enctype?:
    | "application/x-www-form-urlencoded"
    | "multipart/form-data"
    | "text/plain";
  autocomplete?: string;
  method?: "get" | "post" | "dialog";
  name?: string;
  noValidate?: boolean;
  rel?: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
}
