import type { JsxHtmlGlobalProps } from "@ribajs/jsx/src/index.js";

export interface JsxBs5CollapseProps extends JsxHtmlGlobalProps {
  title: string;
  content?: string;
  collapsed?: boolean;
}
