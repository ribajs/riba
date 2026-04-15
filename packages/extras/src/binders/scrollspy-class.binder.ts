import { Binder } from "@ribajs/core";
import { debounce } from "@ribajs/utils/src/control.js";
import { isInViewport } from "@ribajs/utils/src/dom.js";

/**
 * Adds or removes a CSS class based on whether a target element is in the viewport.
 *
 * Usage: `rv-scrollspy-active="'#section-id'"`
 * This will add/remove the class "active" on the bound element when #section-id
 * is in the viewport.
 */
export class ScrollspyClassBinder extends Binder<string, HTMLInputElement> {
  static key = "scrollspy-*";

  private target?: HTMLElement;
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

  private _isInViewport(elem: Element) {
    if (!elem) {
      return false;
    }
    const offsetTop = Number(this.el.dataset.offset || 0);
    const offsetBottom = Number(this.el.dataset.offsetBottom || 0);
    return isInViewport(elem, { top: offsetTop, bottom: offsetBottom });
  }

  private isInViewport = this._isInViewport.bind(this);

  bind() {
    window.addEventListener("scroll", this.onScroll, {
      passive: true,
    });
    this.onScroll();
  }

  routine(el: HTMLElement, targetSelector: string) {
    const nativeIDTargetSelector = targetSelector.replace("#", "");
    this.target = document.getElementById(nativeIDTargetSelector) || undefined;
    this.className = this.args[0] as string;
  }

  unbind() {
    window.removeEventListener("scroll", this.onScroll);
  }
}
