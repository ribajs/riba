import type { JsxHtmlGlobalProps } from "./jsx-html-global-props";

/**
 * Properties permitted on the `<optgroup>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup
 */
export interface JsxOptgroupElementProps extends JsxHtmlGlobalProps {
  disabled?: boolean;
  label: string;
}
