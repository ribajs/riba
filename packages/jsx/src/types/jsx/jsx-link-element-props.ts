import type { JsxHtmlGlobalProps } from "./jsx-html-global-props.js";

/**
 * Properties permitted on the `<link>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link
 */
export interface JsxLinkElementProps extends JsxHtmlGlobalProps {
  as?:
    | "audio"
    | "document"
    | "embed"
    | "fetch"
    | "font"
    | "image"
    | "object"
    | "script"
    | "style"
    | "track"
    | "video"
    | "worker";
  crossOrigin?: "anonymous" | "use-credentials";
  disabled?: boolean;
  href?: string;
  hreflang?: string;
  imageSizes?: string;
  imageSrcset?: string;
  media?: string;
  rel?: string;
  sizes?: string;
  type?: string;
  color?: string;
}
