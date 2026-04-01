import { Transition } from "./transition.js";
import type { TransitionDefinition } from "./transition-definition.js";

export interface PjaxOptions {
  id: string;
  action?: "replace" | "append";
  wrapper?: HTMLElement;
  containerSelector: string;
  listenAllLinks: boolean;
  listenPopstate: boolean;
  transition?: Transition;
  transitions?: TransitionDefinition[];
  parseTitle: boolean;
  changeBrowserUrl: boolean;
  prefetchLinks: boolean;
  scrollToTop?: boolean;
  scrollToAnchorOffset?: number;
}
