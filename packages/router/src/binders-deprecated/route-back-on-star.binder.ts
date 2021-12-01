import { BinderDeprecated, eventHandlerFunction } from "@ribajs/core";

export const goBack = () => {
  window.history.back();
};

/**
 * Calls `window.history.back()` an event.
 */
export const routeBackOnStarBinder: BinderDeprecated<eventHandlerFunction> = {
  name: "route-back-on-*",
  priority: 3000,

  bind() {
    this.customData = {};
  },

  unbind(el: HTMLElement) {
    el.removeEventListener(this.args[0] as string, goBack);
  },

  routine(el: HTMLElement /*, options: any*/) {
    if (this.args === null) {
      throw new Error("args is null");
    }
    if (this.customData.eventName) {
      el.removeEventListener(this.customData.eventName, goBack);
    }
    this.customData.eventName = this.args[0] as string;
    el.addEventListener(this.args[0] as string, goBack);
  },
};
