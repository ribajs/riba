import type { Navigation } from "./navigation.js";

export interface NavigationSecondary {
  name?: string;
  href?: string;
  classNames?: string;
  pageNavigation: Navigation[];
}
