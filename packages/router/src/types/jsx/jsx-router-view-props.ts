import type { JsxHtmlGlobalProps } from "@ribajs/jsx";

export interface JsxRouterViewProps extends JsxHtmlGlobalProps {
  id?: string
  action?: "replace" | "append",
  "container-selector"?: string;
  "scroll-to-top"?: boolean;
  "listen-all-links"?: boolean;
  "listen-popstate"?: boolean;
  "scroll-to-anchor-hash"?: boolean;
  "scroll-to-anchor-offset"?: boolean;
  "dataset-to-model"?: boolean;
  "parse-title"?: boolean;
  "change-browser-url"?: boolean;
  "prefetch-links"?: boolean;
}
