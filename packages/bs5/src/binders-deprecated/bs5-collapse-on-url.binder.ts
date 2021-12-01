import { BinderDeprecated } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { Collapse } from "../services/collapse";
import { onRoute } from "@ribajs/utils/src/url";

/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/collapse/
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/collapse.js
 */
export const collapseOnUrlBinder: BinderDeprecated<string> = {
  name: "bs5-collapse-on-url",
  bind(el: HTMLElement) {
    this.customData = {
      dispatcher: EventDispatcher.getInstance("main"),
      collapseService: new Collapse(el, { toggle: false }),
    };
  },
  unbind() {
    if (this.customData.checkURL) {
      this.customData.dispatcher.off("newPageReady", this.customData.checkURL);
    }
  },
  routine(el: HTMLElement, url: string) {
    if (this.customData.checkURL) {
      this.customData.dispatcher.off("newPageReady", this.customData.checkURL);
    }
    this.customData.checkURL = () => {
      if (url && onRoute(url)) {
        this.customData.collapseService.hide();
        return true;
      }
      // collapseService.show();
      return false;
    };
    this.customData.dispatcher.on("newPageReady", this.customData.checkURL);
  },
};
