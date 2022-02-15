import type { JsxHtmlGlobalProps } from "@ribajs/jsx";

export interface JsxBs5SidebarProps extends JsxHtmlGlobalProps {
  "container-selector"?: string;
  position?: "left" | "right";
  mode?: "overlap" | "move" | "side";
  width?: string;
  "auto-show-on-wider-than"?: string;
  "auto-hide-on-slimmer-than"?: string;
  "force-hide-on-location-pathnames"?: string;
  "force-show-on-location-pathnames"?: string;
  "mode-on-slimmer-than"?: string;
  "watch-new-page-ready-event"?: string;
  "close-on-swipe"?: string;
}
