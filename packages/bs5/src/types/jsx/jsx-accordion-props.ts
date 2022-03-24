import type { JsxHtmlGlobalProps } from "@ribajs/jsx/src/index.js";

export interface JsxBs5AccordionProps extends JsxHtmlGlobalProps {
  /** JSON string of an array of type `AccordionItem[]` */
  items?: string;
  "collapse-icon-src"?: string;
  "collapse-icon-size"?: number;
  "show-only-one"?: string;
}
