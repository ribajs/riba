import type { JsxHtmlGlobalProps } from "./jsx-html-global-props";

/**
 * Properties permitted on the `<meta>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
 */
export interface JsxMetaElementProps extends JsxHtmlGlobalProps {
  "http-equiv"?:
    | "content-security-policy"
    | "content-type"
    | "default-style"
    | "x-ua-compatible"
    | "refresh";
  charSet?: "utf-8";
  content?: string;
  media?: string;
}
