import type { Transition } from "../interfaces";

/**
 * @depricated Use RouterViewOptions instead
 */
export interface RouterBinderViewOptions {
  viewId?: string;
  action?: "replace" | "append";
  containerSelector?: string;
  scrollToTop?: boolean;
  listenAllLinks?: boolean;
  listenPopstate?: boolean;
  scrollToAnchorHash?: boolean;
  datasetToModel?: boolean;
  parseTitle?: boolean;
  changeBrowserUrl?: boolean;
  prefetchLinks?: boolean;
  transition: Transition;
}

export interface RouterViewOptions {
  id?: string;
  action: "replace" | "append";
  scrollToTop: boolean;
  listenAllLinks: boolean;
  listenPopstate: boolean;
  scrollToAnchorHash: boolean;
  parseTitle: boolean;
  changeBrowserUrl: boolean;
  prefetchLinks: boolean;
  transition: Transition;
}
