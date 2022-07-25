import type { JsxHtmlGlobalProps } from "./jsx-html-global-props.js";

/**
 * Properties permitted on the `<object>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object
 */
export interface JsxObjectElementProps extends JsxHtmlGlobalProps {
  data?: string;
  form?: string;
  height?: number;
  name?: string;
  type?: string;
  useMap?: string;
  width?: number;
}
