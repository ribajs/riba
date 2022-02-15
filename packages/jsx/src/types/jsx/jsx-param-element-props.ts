import type { JsxHtmlGlobalProps } from "./jsx-html-global-props";

/**
 * Properties permitted on the `<param>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/param
 */
export interface JsxParamElementProps extends JsxHtmlGlobalProps {
  name?: string;
  value?: string;
}
