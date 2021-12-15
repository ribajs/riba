import { Binder } from "@ribajs/core";
import { Pjax } from "@ribajs/router";

export class RoutePreloadBinder extends Binder<string, HTMLAnchorElement> {
  static key = "route-preload";

  routine(el: HTMLElement, url?: string) {
    if (window.ssr) {
      return;
    }
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
  }
}
