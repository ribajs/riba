import { Binder, eventHandlerFunction } from "@ribajs/core/src/index.js";

const goBack = () => {
  window.history.back();
};

/**
 * Calls `window.history.back()` on event.
 */
export class RouteBackOnStarBinder extends Binder<eventHandlerFunction> {
  static key = "route-back-on-*";
  priority = 3000;

  private eventName?: string;

  unbind(el: HTMLElement) {
    if (this.eventName) {
      el.removeEventListener(this.eventName, goBack);
    }
  }

  routine(el: HTMLElement /*, options: any*/) {
    if (this.args === null) {
      throw new Error("args is null");
    }
    if (this.eventName) {
      el.removeEventListener(this.eventName, goBack);
    }
    this.eventName = this.args[0] as string;
    el.addEventListener(this.args[0] as string, goBack);
  }
}
