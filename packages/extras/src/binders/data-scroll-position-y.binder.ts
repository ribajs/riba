import { Binder } from "@ribajs/core";
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
export class DataScrollPositionYBinder extends Binder<
  string,
  HTMLInputElement
> {
  static key = "data-scroll-position-y";

  private watchScrollOnElement?: HTMLElement | Window;

  private offsetTop = 0;
  private offsetBottom = 0;
  private elementSelector = "";

  private _onScroll() {
    if (this.elementSelector === "window") {
      const element = this.watchScrollOnElement as Window;
      if (element.scrollY <= 0 + this.offsetTop) {
        this.el.dataset.scrollPositionY = "top";
      } else if (
        element.innerHeight + element.pageYOffset + this.offsetBottom >=
        document.body.offsetHeight
      ) {
        this.el.dataset.scrollPositionY = "bottom";
      } else {
        this.el.dataset.scrollPositionY = "scrolled";
      }
    } else {
      const element = this.watchScrollOnElement as HTMLElement;
      if (element.scrollTop <= 0 + this.offsetTop) {
        this.el.dataset.scrollPositionY = "top";
      } else if (
        element.scrollTop + this.offsetBottom >=
        element.scrollHeight - element.clientHeight
      ) {
        this.el.dataset.scrollPositionY = "bottom";
      } else {
        this.el.dataset.scrollPositionY = "scrolled";
      }
    }
  }

  private onScroll = debounce(this._onScroll.bind(this));

  routine(el: HTMLElement, elementSelector = "window") {
    // Remove old scroll event
    if (this.watchScrollOnElement) {
      this.watchScrollOnElement.removeEventListener("scroll", this.onScroll);
    }

    // Set new element to watch for the scroll event
    if (elementSelector === "window") {
      this.watchScrollOnElement = window;
    } else if (elementSelector === "this") {
      this.watchScrollOnElement = this.el;
    } else {
      this.watchScrollOnElement =
        document.querySelector<HTMLElement>(elementSelector) || undefined;
    }

    // Watch new element for scroll event
    if (this.watchScrollOnElement) {
      this.watchScrollOnElement.addEventListener("scroll", this.onScroll, {
        passive: true
      });
    }

    this.offsetTop = Number(this.el.dataset.offsetTop) || DEFAULT_OFFSET;
    this.offsetBottom = Number(this.el.dataset.offsetBottom) || DEFAULT_OFFSET;
    this.elementSelector = elementSelector;

    // inital scroll position
    this.onScroll();
  }

  unbind() {
    // Remove old scroll event
    if (this.watchScrollOnElement) {
      this.watchScrollOnElement.removeEventListener("scroll", this.onScroll);
    }
  }
}
