import type { JsxHtmlGlobalProps } from "@ribajs/jsx/src/index.js";

export interface JsxBs5ThemeButtonProps extends JsxHtmlGlobalProps {
  mode?: "dropdown" | "icon";
  labels?: string; // JSON string
  "light-icon-src"?: string;
  "dark-icon-src"?: string;
  "icon-size"?: number;
}
