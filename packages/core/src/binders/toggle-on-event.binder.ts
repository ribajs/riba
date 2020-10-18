import { Binder } from "../interfaces";

/**
 * Togggles a boolean variable to true/false if the event is triggered.
 */
export const toggleOnEventBinder: Binder<string> = {
  name: "toggle-on-*",

  bind(el) {
    this.customData = {
      handler: null,
      propertyKey: null as string | null,
      toggle: () => {
        if (this.customData.propertyKey) {
          this.view.models[this.customData.propertyKey] = !this.view.models[
            this.customData.propertyKey
          ];
        }
      },
    };
    const eventName = this.args[0] as string;
    const passive = this.el.dataset.passive === "true"; // data-passive="true"
    el.addEventListener(eventName, this.customData.toggle, { passive });
  },

  unbind(el: HTMLElement) {
    if (this.customData.handler) {
      if (this.args === null) {
        throw new Error("args is null");
      }
      const eventName = this.args[0] as string;
      el.removeEventListener(eventName, this.customData.toggle);
    }
  },

  routine(el: HTMLElement, propertyKey: string) {
    if (this.args === null) {
      throw new Error("args is null");
    }
    this.customData.propertyKey = propertyKey;
  },
};
