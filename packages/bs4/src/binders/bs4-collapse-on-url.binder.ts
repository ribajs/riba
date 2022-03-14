import { Binder } from "@ribajs/core/src/index.js";
import { EventDispatcher } from "@ribajs/events";
import { CollapseService } from "../services/collapse.service.js";
import { onRoute } from "@ribajs/utils/src/url";

/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/collapse/
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/collapse.js
 */
export class CollapseOnUrlBinder extends Binder<string, HTMLElement> {
  static key = "bs4-collapse-on-url";

  private url?: string;

  private dispatcher = EventDispatcher.getInstance("main");
  private collapseService?: CollapseService;

  private _checkURL() {
    if (this.url && onRoute(this.url)) {
      this.collapseService?.hide();
      return true;
    }
    // collapseService.show();
    return false;
  }

  private checkURL = this._checkURL.bind(this);

  bind(el: HTMLElement) {
    this.collapseService = new CollapseService(el, [], { toggle: false });
  }

  unbind() {
    if (this.checkURL) {
      this.dispatcher.off("newPageReady", this.checkURL);
    }
  }

  routine(el: HTMLElement, url: string) {
    this.url = url;
    if (this.checkURL) {
      this.dispatcher.off("newPageReady", this.checkURL);
    }
    this.dispatcher.on("newPageReady", this.checkURL);
  }
}
