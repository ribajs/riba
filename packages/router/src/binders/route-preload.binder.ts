import { Binder } from "@ribajs/core";
import { Pjax } from "@ribajs/router";

export const routePreloadBinder: Binder<string> = {
  name: "route-preload",

  bind(/*el: HTMLUnknownElement*/) {
    //
  },

  routine(el: HTMLElement, url?: string) {
    const isAnchorElement = el.tagName === "A";
    if (!url && isAnchorElement) {
      const href = el.getAttribute("href");
      if (href) {
        url = href;
      }
    }
    if (url) {
      Pjax.getInstance()?.prefetchLink(url);
    }
  },

  unbind() {
    //
  },
};
