import { Binder } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { CollapseService } from "../services/collapse.service.js";
import { onRoute } from "@ribajs/utils/src/url.js";

/**
 * Expands (shows) an element when the current URL matches the bound value.
 */
export class ExpandOnUrlBinder extends Binder<string, HTMLElement> {
  static key = "tw-expand-on-url";

  routine(el: HTMLElement, url: string) {
    const collapseService = new CollapseService(el, { show: false });
    const dispatcher = new EventDispatcher("main");

    const checkURL = (urlToCheck?: string) => {
      if (urlToCheck && onRoute(urlToCheck)) {
        collapseService.show();
        return true;
      }
      collapseService.hide();
      return false;
    };

    dispatcher.on("newPageReady", () => checkURL(url));

    checkURL(url);
  }
}
