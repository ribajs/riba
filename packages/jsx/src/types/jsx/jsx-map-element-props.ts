import type { JsxHtmlGlobalProps } from "./jsx-html-global-props.js";

/**
 * Properties permitted on the `<map>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map
 */
export interface JsxMapElementProps extends JsxHtmlGlobalProps {
  name?: string;
}
