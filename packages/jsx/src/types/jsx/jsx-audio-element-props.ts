import type { JsxHtmlGlobalProps } from "./jsx-html-global-props";

/**
 * Properties permitted on the `<audio>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
 */
export interface JsxAudioElementProps extends JsxHtmlGlobalProps {
  autoplay?: boolean;
  controls?: boolean;
  crossOrigin?: "anonymous" | "use-credentials";
  loop?: boolean;
  muted?: boolean;
  preload?: "none" | "metadata" | "auto" | "";
  src?: string;
}
