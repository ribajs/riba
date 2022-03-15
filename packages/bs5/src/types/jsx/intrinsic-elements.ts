/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */

import type {
  JsxBs5IconProps,
  JsxBs5NavbarProps,
  JsxBs5SidebarProps,
  JsxBs5ThemeButtonProps,
  JsxBs5ToggleButtonProps,
  JsxBs5SlideshowProps
} from "./";

export interface Bs5IntrinsicElements {
  "bs5-theme-button": JsxBs5ThemeButtonProps;
  "bs5-sidebar": JsxBs5SidebarProps;
  "bs5-toggle-button": JsxBs5ToggleButtonProps;
  "bs5-icon": JsxBs5IconProps;
  "bs5-navbar": JsxBs5NavbarProps;
  "bs5-slideshow": JsxBs5SlideshowProps;
}

declare global {
  namespace JSX {
    // This extends the IntrinsicElements interface defined in @ribajs/jsx
    interface IntrinsicElements extends Bs5IntrinsicElements {}
  }
}
