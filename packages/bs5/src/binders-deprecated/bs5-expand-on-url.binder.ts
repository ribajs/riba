import { BinderDeprecated } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { Collapse } from "../services/collapse";
import { onRoute } from "@ribajs/utils/src/url";

/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/collapse/
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/collapse.js
 */
export const expandOnUrlBinder: BinderDeprecated<string> = {
  name: "bs5-expand-on-url",
  routine(el: HTMLElement, url: string) {
    const collapseService = new Collapse(el, { toggle: false });
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
  },
};
