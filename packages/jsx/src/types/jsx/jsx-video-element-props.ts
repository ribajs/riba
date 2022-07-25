import type { JsxHtmlGlobalProps } from "./jsx-html-global-props.js";

/**
 * Properties permitted on the `<video>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
 */
export interface JsxVideoElementProps extends JsxHtmlGlobalProps {
  autoplay?: boolean;
  controls?: boolean;
  crossOrigin?: "anonymous" | "use-credentials";
  height?: number;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  poster?: string;
  preload?: string;
  src?: string;
  width?: number;
}
