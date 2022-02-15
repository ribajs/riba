import type { JsxHtmlGlobalProps } from "./jsx-html-global-props";

/**
 * Properties permitted on the `<img>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img
 */
export interface JsxImgElementProps extends JsxHtmlGlobalProps {
  alt?: string;
  crossOrigin?: "anonymous" | "use-credentials";
  decoding?: "async" | "sync" | "auto";
  height?: number;
  isMap?: boolean;
  referrerPolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";
  sizes?: string;
  src: string;
  srcset?: string;
  width?: number;
}
