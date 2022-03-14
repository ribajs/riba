import { Binder } from "@ribajs/core/src/index.js";
import { EventDispatcher } from "@ribajs/events";
import { onParentRoute } from "@ribajs/utils/src/url";

export class ParentRouteClassStarBinder extends Binder<
  string,
  HTMLAnchorElement | HTMLInputElement
> {
  static class = "parent-route-class-*";

  private dispatcher = new EventDispatcher("main");

  private className?: string;

  private url?: string;

  private _onUrlChange() {
    if (!this.url) {
      throw new Error("url is not defined!");
    }

    if (!this.className) {
      throw new Error("className is not defined!");
    }

    if (onParentRoute(this.url)) {
      this.el.classList.add(this.className);
      // check if element is radio input
      if (this.el.getAttribute("type") === "radio") {
        (this.el as HTMLInputElement).checked = true;
      }
      return true;
    } else {
      this.el.classList.remove(this.className);
      // uncheck if element is radio input
      if (this.el.getAttribute("type") === "radio") {
        (this.el as HTMLInputElement).checked = false;
      }
    }
    return false;
  }

  private onUrlChange = this._onUrlChange.bind(this);

  /**
   * Tests the url with the current location, if the current location starts with the url this element gets the `[classname]` class
   * @param el Binder HTML Element
   * @param url Url to compare with the current location
   */
  routine(el: HTMLElement, url?: string) {
    this.url = url;
    this.className = this.args[0].toString() || "active";
    const isAnkerHTMLElement = el.tagName === "A";
    if (!this.url && isAnkerHTMLElement) {
      const href = el.getAttribute("href");
      if (href) {
        this.url = href;
      }
    }
    this.onUrlChange();
  }

  bind() {
    this.dispatcher.on("newPageReady", this.onUrlChange);
  }

  unbind() {
    this.dispatcher.off("newPageReady", this.onUrlChange);
  }
}
