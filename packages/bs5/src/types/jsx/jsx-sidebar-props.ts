import type {
  JsxHtmlGlobalProps,
  JSXComponentBoolean
} from "@ribajs/jsx/src/index.js";

export interface JsxBs5SidebarProps extends JsxHtmlGlobalProps {
  id: string;
  "container-selector"?: string;
  position?: "left" | "right";
  mode?: "overlap" | "move" | "side";
  width?: string;
  "auto-show"?: JSXComponentBoolean;
  "auto-hide"?: JSXComponentBoolean;
  "force-hide-on-location-pathnames"?: string;
  "force-show-on-location-pathnames"?: string;
  "mode-on-slimmer-than"?: string;
  "watch-new-page-ready-event"?: string;
  "close-on-swipe"?: string;
}
