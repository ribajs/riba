import type { Transition } from "./transition";

export interface RouterViewOptions {
  id?: string;
  action: "replace" | "append";
  scrollToTop: boolean;
  listenAllLinks: boolean;
  listenPopstate: boolean;
  scrollToAnchorHash: boolean;
  scrollToAnchorOffset: number;
  datasetToModel?: boolean;
  parseTitle: boolean;
  changeBrowserUrl: boolean;
  prefetchLinks: boolean;
  transition: Transition;
}
