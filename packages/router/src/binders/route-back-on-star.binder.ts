import { Binder, eventHandlerFunction } from "@ribajs/core";

export const goBack = () => {
  window.history.back();
};

/**
 * Calls `window.history.back()` an event.
 */
export const routeBackOnStarBinder: Binder<eventHandlerFunction> = {
  name: "route-back-on-*",
  priority: 3000,

  bind(/*el: HTMLElement*/) {
    // noting
  },

  unbind(el: HTMLElement) {
    el.removeEventListener(this.args[0] as string, goBack);
  },

  routine(el: HTMLElement /*, options: any*/) {
    if (this.args === null) {
      throw new Error("args is null");
    }
    // const eventName = this.args[0] as string;
    el.removeEventListener(this.args[0] as string, goBack);
    el.addEventListener(this.args[0] as string, goBack);
  },
};
