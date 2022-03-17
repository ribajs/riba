import { Binder } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { Collapse } from "../services/collapse.js";
import { onRoute } from "@ribajs/utils/src/url";

/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/collapse/
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/collapse.js
 */
export class CollapseOnUrlBinder extends Binder<string, HTMLInputElement> {
  static key = "bs5-collapse-on-url";

  private dispatcher = EventDispatcher.getInstance("main");
  private collapseService?: Collapse;
  private url?: string;

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
    this.collapseService = new Collapse(el, { toggle: false });
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
