import { Binder } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { CollapseService } from "../services/collapse.service.js";
import { onRoute } from "@ribajs/utils/src/url.js";

/**
 * Collapses an element when the current URL matches the bound value.
 */
export class CollapseOnUrlBinder extends Binder<string, HTMLElement> {
  static key = "tw-collapse-on-url";

  private dispatcher = EventDispatcher.getInstance("main");
  private collapseService?: CollapseService;
  private url?: string;

  private _checkURL() {
    if (this.url && onRoute(this.url)) {
      this.collapseService?.hide();
      return true;
    }
    return false;
  }

  private checkURL = this._checkURL.bind(this);

  bind(el: HTMLElement) {
    this.collapseService = new CollapseService(el, { show: true });
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
