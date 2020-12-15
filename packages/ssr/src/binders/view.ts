import { Binder } from "@ribajs/core";

/**
 * WORKAROUND for the view binder from the router module
 */
export const textBinder: Binder<string> = {
  name: "view",
  routine(el: HTMLElement, value: string) {
    el.setAttribute("rv-view", JSON.stringify(value));
  },
};
