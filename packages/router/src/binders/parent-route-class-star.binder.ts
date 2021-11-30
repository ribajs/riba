import { BinderDeprecated } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { onParentRoute } from "@ribajs/utils/src/url";

export const parentRouteClassStarBinder: BinderDeprecated<string> = {
  name: "parent-route-class-*",

  bind(/*el: HTMLUnknownElement*/) {
    this.customData = {
      dispatcher: new EventDispatcher("main"),
    };
  },

  /**
   * Tests the url with the current location, if the current location starts with the url this element gets the `[classname]` class
   * @param el Binder HTML Element
   * @param url Url to compare with the current location
   */
  routine(el: HTMLElement, url?: string) {
    const className = this.args[0].toString() || "active";
    const isAnkerHTMLElement = el.tagName === "A";
    if (!url && isAnkerHTMLElement) {
      const href = el.getAttribute("href");
      if (href) {
        url = href;
      }
    }
    const onUrlChange = (urlToCheck?: string) => {
      if (urlToCheck) {
        if (onParentRoute(urlToCheck)) {
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
    this.customData.dispatcher.on("newPageReady", () => onUrlChange(url));
    onUrlChange(url);
  },

  unbind(/*el: HTMLUnknownElement*/) {
    // console.warn('routeClassStarBinder routine', el);
  },
};
