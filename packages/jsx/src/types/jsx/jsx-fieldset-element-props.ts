import type { JsxHtmlGlobalProps } from "./jsx-html-global-props.js";

/**
 * Properties permitted on the `<fieldset>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset
 */
export interface JsxFieldsetElementProps extends JsxHtmlGlobalProps {
  disabled?: boolean;
  form?: string;
  name?: string;
}
