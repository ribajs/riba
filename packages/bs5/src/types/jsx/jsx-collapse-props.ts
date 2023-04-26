import type { JsxHtmlGlobalProps } from "@ribajs/jsx";

export interface JsxBs5CollapseProps extends JsxHtmlGlobalProps {
  title: string;
  content?: string;
  collapsed?: boolean;
}
