import type { JsxHtmlGlobalProps } from "./jsx-html-global-props";

/**
 * Properties permitted on the `<style>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style
 */
export interface JsxStyleElementProps extends JsxHtmlGlobalProps {
  media?: string;
  type?: string;
  nonce?: string;
}
