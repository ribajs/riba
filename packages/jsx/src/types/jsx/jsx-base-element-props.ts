import type { JsxHtmlGlobalProps } from "./jsx-html-global-props.js";

/**
 * Properties permitted on the `<base>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base
 */
export interface JsxBaseElementProps extends JsxHtmlGlobalProps {
  href?: string;
  target?: string;
}
