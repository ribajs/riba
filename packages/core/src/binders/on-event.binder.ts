import { Binder, eventHandlerFunction } from "../interfaces";

/**
 * Binds an event handler on the element.
 */
export const onEventBinder: Binder<eventHandlerFunction> = {
  name: "on-*",
  function: true,
  priority: 1000,

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
      el.removeEventListener(eventName, this.customData.handler);
    }
  },

  routine(el: HTMLElement, value: eventHandlerFunction) {
    if (this.args === null) {
      throw new Error("args is null");
    }
    const eventName = this.args[0] as string;

    this.customData.handler = this.eventHandler(value, el);

    const passive = this.el.dataset.passive === "true"; // data-passive="true"

    try {
      el.addEventListener(eventName, this.customData.handler, { passive });
    } catch (error) {
      console.warn(error);
      el.addEventListener(eventName, (event: Event) => {
        this.customData.handler(event);
      });
    }
  },
};
