import type { JsxHtmlGlobalProps } from "./jsx-html-global-props";

/**
 * Properties permitted on the `<slot>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot
 */
export interface JsxSlotElementProps extends JsxHtmlGlobalProps {
  name?: string;
}
