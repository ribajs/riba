import { eventHandlerFunction } from "../types";
import { Binder } from "../binder";

/**
 * Binds an event handler on the element.
 */
export class onEventBinder extends Binder<eventHandlerFunction, HTMLElement> {
  static key = "on-*";
  function =  true;
  priority = 1000;

  handler: any = null;

  bind() {

  }

  unbind(el: HTMLElement) {
    if (this.handler) {
      if (this.args === null) {
        throw new Error("args is null");
      }
      const eventName = this.args[0] as string;
      el.removeEventListener(eventName, this.handler);
    }
  }

  routine(el: HTMLElement, value: eventHandlerFunction) {
    if (this.args === null) {
      throw new Error("args is null");
    }
    const eventName = this.args[0] as string;

    // see https://github.com/microsoft/TypeScript/issues/32912
    const options: AddEventListenerOptions & EventListenerOptions = {
      passive: this.el.dataset.passive === "true", // data-passive="true"
    };
    if (this.handler) {
      el.removeEventListener(
        // must use as any here, because TypeScript is stupid as of version 4.0.3
        eventName as any,
        this.handler,
        options
      );
    }
    this.handler = this.eventHandler(value, el).bind(
      this
    );

    el.addEventListener(eventName, this.handler, options);
  }
};
