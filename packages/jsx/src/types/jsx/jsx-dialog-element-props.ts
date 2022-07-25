import type { JsxHtmlGlobalProps } from "./jsx-html-global-props.js";

/**
 * Properties permitted on the `<dialog>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
 */
export interface JsxDialogElementProps extends JsxHtmlGlobalProps {
  open?: boolean;
}
