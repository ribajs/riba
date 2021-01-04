import { Binder } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { onRoute } from "@ribajs/utils/src/url";

export const routeClassStarBinder: Binder<string> = {
  name: "route-class-*",

  bind(/*el: HTMLUnknownElement*/) {
    this.customData = {
      dispatcher: new EventDispatcher("main"),
    };
  },

  /**
   * Tests the url with the current location, if the url is equal to the current location this element gets the `[classname]` class
   * @param el Binder HTML Element
   * @param url Url to compare with the current location
   */
  routine(el: HTMLElement, url: string) {
    const className = this.args[0].toString() || "active";
    const isAnkerHTMLElement = el.tagName === "A";
    if (!url && isAnkerHTMLElement) {
      const href = el.getAttribute("href");
      if (href) {
        url = href;
      }
    }
    if (this.customData.onUrlChange) {
      this.customData.dispatcher.off(
        "newPageReady",
        this.customData.onUrlChange
      );
    }
    this.customData.onUrlChange = () => {
      if (url) {
        if (onRoute(url)) {
          el.classList.add(className);
          // check if element is radio input
          if (el.getAttribute("type") === "radio") {
            (el as HTMLInputElement).checked = true;
          }
          return true;
        } else {
          el.classList.remove(className);
          // uncheck if element is radio input
          if (el.getAttribute("type") === "radio") {
            (el as HTMLInputElement).checked = false;
          }
        }
      }
      return false;
    };
    this.customData.dispatcher.on("newPageReady", this.customData.onUrlChange);
    this.customData.onUrlChange();
  },

  unbind(/*el: HTMLUnknownElement*/) {
    // console.warn('routeClassStarBinder routine', el);
    if (this.customData.onUrlChange) {
      this.customData.dispatcher.off(
        "newPageReady",
        this.customData.onUrlChange
      );
    }
  },
};
