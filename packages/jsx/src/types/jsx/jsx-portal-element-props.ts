import type { JsxHtmlGlobalProps } from "./jsx-html-global-props.js";

/**
 * Properties permitted on the `<portal>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/portal
 */
export interface JsxPortalElementProps extends JsxHtmlGlobalProps {
  referrerPolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";
  src: string;
}
