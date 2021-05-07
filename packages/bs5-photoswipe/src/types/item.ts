import * as PhotoSwipe from "photoswipe";

/**
 * Extra properties that the Default UI accepts.
 */
export interface Item extends PhotoSwipe.Item {
  /**
   * The caption for this item.
   */
  title?: string;
  element?: HTMLImageElement;
}
