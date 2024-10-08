import { Binder } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { CollapseService } from "../services/collapse.service.js";
import { onRoute } from "@ribajs/utils/src/url";

/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/collapse/
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/collapse.js
 */
export class ExpanOnUrlBinder extends Binder<string, HTMLElement> {
  static key = "bs4-expan-on-url";
  routine(el: HTMLElement, url: string) {
    const collapseService = new CollapseService(el, [], { toggle: false });
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
