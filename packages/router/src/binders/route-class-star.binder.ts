import { Binder } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { onRoute } from "@ribajs/utils/src/url";

export class RouteClassStarBinder extends Binder<string, HTMLInputElement> {
  static key = "route-class-*";

  private dispatcher = new EventDispatcher("main");
  private url?: string;
  private className = "";

  private _onUrlChange() {
    if (this.url) {
      if (onRoute(this.url)) {
        this.el.classList.add(this.className);
        // check if element is radio input
        if (this.el.getAttribute("type") === "radio") {
          this.el.checked = true;
        }
        return true;
      } else {
        this.el.classList.remove(this.className);
        // uncheck if element is radio input
        if (this.el.getAttribute("type") === "radio") {
          this.el.checked = false;
        }
      }
    }
    return false;
  }

  private onUrlChange = this._onUrlChange.bind(this);

  bind() {
    this.dispatcher.on("newPageReady", this.onUrlChange);
  }

  /**
   * Tests the url with the current location, if the url is equal to the current location this element gets the `[classname]` class
   * @param el Binder HTML Element
   * @param url Url to compare with the current location
   */
  routine(el: HTMLElement, url?: string) {
    this.url = url;
    this.className = this.args[0].toString() || "active";
    const isAnchorElement = el.tagName === "A";
    if (!this.url && isAnchorElement) {
      const href = el.getAttribute("href");
      if (href) {
        this.url = href;
      }
    }

    this.onUrlChange();
  }

  unbind() {
    this.dispatcher.off("newPageReady", this.onUrlChange);
  }
}
