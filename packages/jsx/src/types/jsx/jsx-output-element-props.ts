import type { JsxHtmlGlobalProps } from "./jsx-html-global-props";

/**
 * Properties permitted on the `<output>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output
 */
export interface JsxOutputElementProps extends JsxHtmlGlobalProps {
  for?: string;
  form?: string;
  name?: string;
}
