import type { Bs4SidebarComponent } from "../components/bs4-sidebar/bs4-sidebar.component.js";
import { Bs4SidebarComponentState } from "./sidebar-component-state";

export interface Bs4SidebarComponentScope {
  /**
   * Selector string to get the container element from DOM
   */
  containerSelector?: string;
  /**
   * The current state of the sidebar, can be `'hidden'`, `'side-left'`, `'side-right'`, `'overlay-left'` or `'overlay-right'`
   */
  state: Bs4SidebarComponentState;

  oldState: Bs4SidebarComponentState;
  /**
   * The 'id' is required to react to events of the `bs4-toggle-button`, the `target-id` attribute of the `bs4-toggle-button` must be identical to this `id`
   */
  id?: string;
  /**
   * The width of the sidebar with unit
   */
  width: string;

  // Options
  /**
   * The sidebar can be positioned `right` or `left`
   */
  position: "left" | "right";
  /**
   * Auto show the sidebar if the viewport width is wider than this value
   */
  autoShowOnWiderThan: number;
  /**
   * Auto hide the sidebar if the viewport width is slimmer than this value
   */
  autoHideOnSlimmerThan: number;
  /**
   * Watch the routers `newPageReady` event to update the sidebar state, e.g. hide on slime than after route changes
   */
  watchNewPageReadyEvent: boolean;
  /**
   * You can force to hide the sidebar on corresponding URL pathnames e.g. you can hide the sidebar on home with `['/']`.
   */
  forceHideOnLocationPathnames: Array<string>;
  /**
   * Like `force-hide-on-location-pathnames`, but to force to open the sidebar
   */
  forceShowOnLocationPathnames: Array<string>;
  /**
   * If the viewport width is wider than this value the sidebar adds a margin to the container (detected with the `container-selector`) to reduce its content, if the viewport width is slimmer than this value the sidebar opens over the content
   */
  overlayOnSlimmerThan: number;

  // Template methods
  /**
   * Hides / closes the sidebar
   */
  hide: Bs4SidebarComponent["hide"];
  /**
   * Shows / opens the sidebar
   */
  show: Bs4SidebarComponent["show"];
  /**
   * Toggles (closes or opens) the sidebar
   */
  toggle: Bs4SidebarComponent["toggle"];
}
