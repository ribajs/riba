import { Binder } from "../interfaces";

/**
 * Togggles a boolean variable to true/false if the event is triggered.
 */
export const toggleOnEventBinder: Binder<string> = {
  name: "toggle-on-*",
  function: true,
  propertyKey: null as string | null,

  bind() {
    if (!this.customData) {
      this.customData = {
        handler: null,
      };
    }
  },

  unbind(el: HTMLElement) {
    if (this.customData.handler) {
      if (this.args === null) {
        throw new Error("args is null");
      }
      const eventName = this.args[0] as string;
      el.removeEventListener(eventName, this.binder.toggle);
    }
  },

  toggle() {
    if (this.binder.propertyKey) {
      this.view.models[this.binder.propertyKey] = !this.view.models[
        this.binder.propertyKey
      ];
    }
  },

  routine(el: HTMLElement, propertyKey: string) {
    if (this.args === null) {
      throw new Error("args is null");
    }
    this.binder.propertyKey = propertyKey;
    const eventName = this.args[0] as string;
    const passive = this.el.dataset.passive === "true"; // data-passive="true"
    el.addEventListener(eventName, this.binder.toggle.bind(this), { passive });
  },
};
