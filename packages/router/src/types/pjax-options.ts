import { Transition } from "./transition.js";

export interface PjaxOptions {
  id: string;
  action?: "replace" | "append";
  wrapper?: HTMLElement;
  containerSelector: string;
  listenAllLinks: boolean;
  listenPopstate: boolean;
  transition: Transition;
  parseTitle: boolean;
  changeBrowserUrl: boolean;
  prefetchLinks: boolean;
  scrollToTop?: boolean;
  scrollToAnchorOffset?: number;
}
