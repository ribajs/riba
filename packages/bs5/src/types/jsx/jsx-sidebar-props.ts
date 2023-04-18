import type {
  JsxHtmlGlobalProps,
  JSXComponentBoolean,
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
  "mode-on-slimmer-than"?: string | number;
  "watch-new-page-ready-event"?: JSXComponentBoolean;
  "close-on-swipe"?: JSXComponentBoolean;
  "prevent-scrolling-on-overlap"?: JSXComponentBoolean;
}
