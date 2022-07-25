import type { JsxHtmlGlobalProps } from "./jsx-html-global-props.js";

/**
 * Properties permitted on the `<meter>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter
 */
export interface JsxMeterElementProps extends JsxHtmlGlobalProps {
  form?: string;
  high?: number;
  low?: number;
  max?: number;
  min?: number;
  optimum?: number;
  value?: number;
}
