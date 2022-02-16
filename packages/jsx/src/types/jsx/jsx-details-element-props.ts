import type { JsxHtmlGlobalProps } from "./jsx-html-global-props";

/**
 * Properties permitted on the `<details>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
 */
export interface JsxDetailsElementProps extends JsxHtmlGlobalProps {
  open?: boolean;
}