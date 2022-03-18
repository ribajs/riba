import type {
  JsxHtmlGlobalProps,
  JSXComponentBoolean
} from "@ribajs/jsx/src/index.js";

export interface JsxRouterViewProps extends JsxHtmlGlobalProps {
  id?: string;
  action?: "replace" | "append";
  "container-selector"?: string;
  "scroll-to-top"?: JSXComponentBoolean;
  "listen-all-links"?: JSXComponentBoolean;
  "listen-popstate"?: JSXComponentBoolean;
  "scroll-to-anchor-hash"?: JSXComponentBoolean;
  "scroll-to-anchor-offset"?: JSXComponentBoolean;
  "dataset-to-root-scope"?: JSXComponentBoolean;
  "parse-title"?: JSXComponentBoolean;
  "change-browser-url"?: JSXComponentBoolean;
  "prefetch-links"?: JSXComponentBoolean;
}
