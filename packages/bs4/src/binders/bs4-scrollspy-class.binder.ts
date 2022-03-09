import { Binder } from "@ribajs/core/src/index.js";
import { debounce } from "@ribajs/utils/src/control";
import { isInViewport } from "@ribajs/utils/src/dom.js";

/**
 * scrollspy-class
 * @see https://getbootstrap.com/docs/4.1/components/scrollspy/
 */
export class ScrollspyClassBinder extends Binder<string, HTMLInputElement> {
  static key = "bs4-scrollspy-*";

  private target?: Element;
  private className?: string;

  private _onScroll() {
    if (!this.target) {
      throw new Error("No target element found!");
    }

    if (!this.className) {
      throw new Error("className not set!");
    }

    if (this.isInViewport(this.target)) {
      this.el.classList.add(this.className);
      if (this.el.type === "radio") {
        this.el.checked = true;
      }
    } else {
      this.el.classList.remove(this.className);
      if (this.el.type === "radio") {
        this.el.checked = false;
      }
    }
  }
  private onScroll = debounce(this._onScroll.bind(this));

  /**
   * Determine if an element is in the viewport
   * @param elem The element
   * @return Returns true if element is in the viewport
   */
  private _isInViewport(elem: Element) {
    if (!elem) {
      return false;
    }
    const offsetTop = Number(this.el.dataset.offset || 0);
    const offsetBottom = Number(this.el.dataset.offsetBottom || 0);
    return isInViewport(elem, offsetTop, offsetBottom);
  }

  private isInViewport = this._isInViewport.bind(this);

  bind() {
    window.addEventListener("scroll", this.onScroll, {
      passive: true,
    });
    this.onScroll();
  }
  routine(el: HTMLInputElement, targetSelector: string) {
    const nativeIDTargetSelector = targetSelector.replace("#", "");
    this.target = document.getElementById(nativeIDTargetSelector) || undefined;
    this.className = this.args[0] as string;
  }
  unbind() {
    window.removeEventListener("scroll", this.onScroll);
  }
}
