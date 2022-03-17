import { Item } from "./item.js";
import * as PhotoSwipe from "photoswipe";

/**
 * Options for the PhotoSwipe Default UI. Derived from http://photoswipe.com/documentation/options.html
 */
export interface Options extends PhotoSwipe.Options {
  /**
   * Size of top & bottom bars in pixels. "bottom" parameter can be 'auto' (will calculate height of caption).
   * Option applies only when mouse is used, or when width of screen is more than 1200px.
   * Also look at `parseVerticalMargin` event.
   *
   * Default {top: 44, bottom: "auto"}.
   */
  barsSize?: { top: number; bottom: number | string };

  /**
   * Adds class pswp__ui--idle to pswp__ui element when mouse isn't moving for timeToIdle milliseconds.
   *
   * Default 4000.
   */
  timeToIdle?: number;

  /**
   * Adds class pswp__ui--idle to pswp__ui element when mouse leaves the window for timeToIdleOutside milliseconds.
   *
   * Default 1000.
   */
  timeToIdleOutside?: number;

  /**
   * Delay in milliseconds until loading indicator is displayed.
   *
   * Default 1000.
   */
  loadingIndicatorDelay?: number;

  /**
   * Function to build caption markup. The function takes three parameters:
   *
   * item      - slide object
   * captionEl - caption DOM element
   * isFake    - true when content is added to fake caption container
   *             (used to get size of next or previous caption)
   *
   * Return whether to show the caption or not.
   *
   * Default is:
   *
   * function(item, captionEl, isFake) {
   *     if(!item.title) {
   *         captionEl.children[0].innerHTML = '';
   *         return false;
   *     }
   *     captionEl.children[0].innerHTML = item.title;
   *     return true;
   * }
   *
   */
  addCaptionHTMLFn?: (
    item: Item,
    captionEl: HTMLElement,
    isFake?: boolean
  ) => boolean;

  /**
   * Whether to show the close button.
   *
   * Default true.
   */
  closeEl?: boolean;

  /**
   * Whether to show the caption.
   *
   * Default true.
   */
  captionEl?: boolean;

  /**
   * Whether to show the fullscreen button.
   *
   * Default true.
   */
  fullscreenEl?: boolean;

  /**
   * Whether to show the zoom button.
   *
   * Default true.
   */
  zoomEl?: boolean;

  /**
   * Whether to show the current image's index in the gallery (located in top-left corner by default).
   *
   * Default true.
   */
  counterEl?: boolean;

  /**
   * Whether to show the left/right directional arrows.
   *
   * Default true.
   */
  arrowEl?: boolean;

  /**
   * Whether to show the preloader element.
   *
   * Default true.
   */
  preloaderEl?: boolean;

  /**
   * Tap on sliding area should close gallery.
   *
   * Default false.
   */
  tapToClose?: boolean;

  /**
   * Tap should toggle visibility of controls.
   *
   * Default true.
   */
  tapToToggleControls?: boolean;

  /**
   * Mouse click on image should close the gallery, only when image is smaller than size of the viewport.
   *
   * Default true.
   */
  clickToCloseNonZoomable?: boolean;

  /**
   * Element classes that should close PhotoSwipe when clicked on.
   * In HTML markup, class should always start with "pswp__", e.g.: "pswp__item", "pswp__caption".
   *
   * "pswp__ui--over-close" class will be added to root element of UI when mouse is over one of these elements
   * By default it's used to highlight the close button.
   *
   * Default ['item', 'caption', 'zoom-wrap', 'ui', 'top-bar'].
   */
  closeElClasses?: string[];

  /**
   * Separator for "1 of X" counter.
   *
   * Default ' / '.
   */
  indexIndicatorSep?: string;

  fitControlsWidth?: number;
}
