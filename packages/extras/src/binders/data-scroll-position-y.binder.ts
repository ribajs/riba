import { BinderDeprecated } from "@ribajs/core";
import { debounce } from "@ribajs/utils/src/control";

const DEFAULT_OFFSET = 10;

/**
 * rv-data-scroll-position
 * Sets the scroll position to the element as a data attribute,
 * useful if you want to define styles depending on the scroll position.
 * ```
 * html:not([[data-scroll-position-y='top']) {
 *    padding-top: 3em;
 * }
 * ```
 * @see https://css-tricks.com/styling-based-on-scroll-position/
 */
export const dataScrollPositionYBinder: BinderDeprecated<string> = {
  name: "data-scroll-position-y",
  customData: {},
  bind() {
    this.customData = {
      onScroll: debounce(() => {
        if (this.customData.elementSelector === "window") {
          const element = this.customData.watchScrollOnElement as Window;
          if (element.scrollY <= 0 + this.customData.offsetTop) {
            this.el.dataset.scrollPositionY = "top";
          } else if (
            element.innerHeight +
              element.pageYOffset +
              this.customData.offsetBottom >=
            document.body.offsetHeight
          ) {
            this.el.dataset.scrollPositionY = "bottom";
          } else {
            this.el.dataset.scrollPositionY = "scrolled";
          }
        } else {
          const element = this.customData.watchScrollOnElement as HTMLElement;
          if (element.scrollTop <= 0 + this.customData.offsetTop) {
            this.el.dataset.scrollPositionY = "top";
          } else if (
            element.scrollTop + this.customData.offsetBottom >=
            element.scrollHeight - element.clientHeight
          ) {
            this.el.dataset.scrollPositionY = "bottom";
          } else {
            this.el.dataset.scrollPositionY = "scrolled";
          }
        }
      }).bind(this),
    };
  },
  routine(el: HTMLElement, elementSelector = "window") {
    // Remove old scroll event
    if (this.customData.watchScrollOnElement) {
      this.customData.watchScrollOnElement.removeEventListener(
        "scroll",
        this.customData.onScroll
      );
    }

    // Set new element to watch for the scroll event
    if (elementSelector === "window") {
      this.customData.watchScrollOnElement = window;
    } else if (elementSelector === "this") {
      this.customData.watchScrollOnElement = this.el;
    } else {
      this.customData.watchScrollOnElement =
        document.querySelector(elementSelector);
    }

    // Watch new element for scroll event
    if (this.customData.watchScrollOnElement) {
      // console.debug('addEventListener', this.customData.watchScrollOnElement);
      this.customData.watchScrollOnElement.addEventListener(
        "scroll",
        this.customData.onScroll,
        { passive: true }
      );
    }

    this.customData.offsetTop =
      Number(this.el.dataset.offsetTop) || DEFAULT_OFFSET;
    this.customData.offsetBottom =
      Number(this.el.dataset.offsetBottom) || DEFAULT_OFFSET;
    this.customData.elementSelector = elementSelector;

    // inital scroll position
    this.customData.onScroll();
  },
  unbind() {
    // Remove old scroll event
    if (this.customData.watchScrollOnElement) {
      this.customData.watchScrollOnElement.removeEventListener(
        "scroll",
        this.customData.onScroll
      );
    }
  },
};
