import type { JsxHtmlGlobalProps } from "./jsx-html-global-props.js";

/**
 * Properties permitted on the `<track>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track
 */
export interface JsxTrackElementProps extends JsxHtmlGlobalProps {
  default?: boolean;
  kind?: "subtitles" | "captions" | "descriptions" | "chapters" | "metadata";
  label?: string;
  src?: string;
  srclang?: string;
}
