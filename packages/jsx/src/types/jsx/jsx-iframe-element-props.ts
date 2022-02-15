import type { JsxHtmlGlobalProps } from "./jsx-html-global-props";

/**
 * Properties permitted on the `<iframe>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
 */
export interface JsxIframeElementProps extends JsxHtmlGlobalProps {
  allow?: string;
  height?: number;
  name?: string;
  referrerPolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";
  sandbox?: string;
  src?: string;
  srcdoc?: string;
  width?: number;
}
