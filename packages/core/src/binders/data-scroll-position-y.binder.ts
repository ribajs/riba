import { Binder } from "../interfaces";
import { Utils } from "../services/utils";

const DEFAULT_OFFSET = 10;

/**
 * rv-data-scroll-position
 * Sets the scroll position to the element as a data attribute,
 * useful if you want to define styles depending on the scroll position.
 * ```scss
 * html:not([[data-scroll-position-y='top']) {
 *    padding-top: 3em;
 * }
 * ```
 * @see https://css-tricks.com/styling-based-on-scroll-position/
 */
export const dataScrollPositionYBinder: Binder<string> = {
  name: "data-scroll-position-y",
  bind() {
    if (!this.customData) {
      this.customData = {};
    }
    this.customData.offset = Number(this.el.dataset.offset) || DEFAULT_OFFSET;
    this.customData.onScroll = () => {
      const element = this.customData.watchScrollOnElement as Window;
      if (element.scrollY <= 0 + this.customData.offset) {
        this.el.dataset.scrollPositionY = "top";
      } else if (
        window.innerHeight + window.pageYOffset + this.customData.offset >=
        document.body.offsetHeight
      ) {
        // TODO only working for window!
        this.el.dataset.scrollPositionY = "bottom";
      } else {
        this.el.dataset.scrollPositionY = "scrolled";
      }
    };
  },
  routine(el: HTMLUnknownElement, elementSelector = "window") {
    // Remove old scroll event
    if (this.customData.watchScrollOnElement) {
      this.customData.watchScrollOnElement.removeEventListener(
        "scroll",
        Utils.debounce.bind(this, this.customData.onScroll.bind(this))
      );
    }

    // Set new element to watch for the scroll event
    if (elementSelector === "window") {
      this.customData.watchScrollOnElement = window;
    } else {
      this.customData.watchScrollOnElement = document.querySelector(
        elementSelector
      );
    }

    // Watch new element for scroll event
    if (this.customData.watchScrollOnElement) {
      // console.debug('addEventListener', this.customData.watchScrollOnElement);
      this.customData.watchScrollOnElement.addEventListener(
        "scroll",
        Utils.debounce(this.customData.onScroll.bind(this)),
        { passive: true }
      );
    }

    // inital scroll position
    this.customData.onScroll();
  },
  unbind() {
    // Remove old scroll event
    if (this.customData.watchScrollOnElement) {
      this.customData.watchScrollOnElement.removeEventListener(
        "scroll",
        Utils.debounce(this.customData.onScroll.bind(this))
      );
    }
  }
};
