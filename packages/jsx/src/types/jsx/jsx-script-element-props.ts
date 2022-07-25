import type { JsxHtmlGlobalProps } from "./jsx-html-global-props.js";

/**
 * Properties permitted on the `<script>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
 */
export interface JsxScriptElementProps extends JsxHtmlGlobalProps {
  async?: boolean;
  crossOrigin?: "anonymous" | "use-credentials";
  defer?: boolean;
  integrity?: string;
  noModule?: boolean;
  referrerPolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";
  src?: string;
  type?: "module" | (string & Record<string, unknown>);
}
