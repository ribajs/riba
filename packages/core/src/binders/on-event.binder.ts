import { Binder, eventHandlerFunction } from "../types";

/**
 * Binds an event handler on the element.
 */
export const onEventBinder: Binder<eventHandlerFunction> = {
  name: "on-*",
  function: true,
  priority: 1000,

  bind() {
    this.customData = {
      handler: null,
    };
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

    // see https://github.com/microsoft/TypeScript/issues/32912
    const options: AddEventListenerOptions & EventListenerOptions = {
      passive: this.el.dataset.passive === "true", // data-passive="true"
    };
    if (this.customData.handler) {
      el.removeEventListener(
        // must use as any here, because TypeScript is stupid as of version 4.0.3
        eventName as any,
        this.customData.handler,
        options
      );
    }
    this.customData.handler = this.eventHandler(value, el).bind(
      this.customData
    );

    el.addEventListener(eventName, this.customData.handler, options);
  },
};
