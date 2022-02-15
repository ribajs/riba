import type { JsxHtmlGlobalProps } from "./jsx-html-global-props";

/**
 * Properties permitted on the `<canvas>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas
 */
export interface JsxCanvasElementProps extends JsxHtmlGlobalProps {
  height?: number;
  width?: number;
}
