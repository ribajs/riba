import type { Transition } from "./transition";

export interface RouterViewOptions {
  id?: string;
  action: "replace" | "append";
  scrollToTop: boolean;
  listenAllLinks: boolean;
  listenPopstate: boolean;
  scrollToAnchorHash: boolean;
  scrollToAnchorOffset: number;
  /** If true the dataset of the first view child is added to the root scope, default is `true` */
  datasetToRootScope?: boolean;
  parseTitle: boolean;
  changeBrowserUrl: boolean;
  prefetchLinks: boolean;
  transition: Transition;
}
