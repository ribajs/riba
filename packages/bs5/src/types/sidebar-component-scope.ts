import type { SidebarState } from "./index.js";
import type { Bs5SidebarComponent } from "../components/bs5-sidebar/bs5-sidebar.component.js";

export interface Bs5SidebarComponentScope {
  // Template properties

  /**
   * Selector string to get the container element from DOM
   */
  containerSelector?: string;
  /**
   * The current state of the sidebar, can be `'hidden'`, `'side-left'`, `'side-right'`, `'overlap-left'` or `'overlap-right'`
   */
  state: SidebarState;
  /**
   * The last state before the state was changed
   */
  oldState: SidebarState;
  /**
   * The 'id' is required to react to events of the `bs5-toggle-button`, the `target-id` attribute of the `bs5-toggle-button` must be identical to this `id`
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
   * The sidebar can be `move` the full page (iPhone style), `overlap` (Android style) or `side` (shrinks the container)
   */
  mode: "overlap" | "move" | "side";
  /**
   * Auto show the sidebar.
   * It is recommended to use the `bs5-co-[breakpoint]-auto-hide` for this attribute.
   */
  autoShow: boolean;
  /**
   * Auto hide the sidebar.
   * It is recommended to use the `bs5-co-[breakpoint]-auto-hide` for this attribute.
   */
  autoHide: boolean;
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
   * Close sidebar on swipe
   */
  closeOnSwipe: boolean;

  /**
   * Prevent scrolling on open overlap mode
   */
  preventScrollingOnOverlap: boolean;

  // Template methods

  /**
   * Hides / closes the sidebar
   */
  hide: Bs5SidebarComponent["hide"];
  /**
   * Shows / opens the sidebar
   */
  show: Bs5SidebarComponent["show"];
  /**
   * Toggles (closes or opens) the sidebar
   */
  toggle: Bs5SidebarComponent["toggle"];
}
