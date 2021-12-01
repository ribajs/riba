import { BinderDeprecated, eventHandlerFunction } from "@ribajs/core";
import { extend } from "@ribajs/utils/src/type";
import { JQuery } from "../vendors/jquery.module";

/**
 * Binds an event handler on the element.
 */
export const onEventBinder: BinderDeprecated<eventHandlerFunction> = {
  name: "on-*",
  function: true,
  priority: 1000,

  bind(/*el*/) {
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
      JQuery(el).off(eventName, this.customData.handler);
    }
  },

  routine(el: HTMLElement, value: eventHandlerFunction) {
    if (this.args === null) {
      throw new Error("args is null");
    }
    const eventName = this.args[0] as string;

    if (this.customData.handler) {
      JQuery(el).off(eventName, this.customData.handler);
    }

    this.customData.handler = this.eventHandler(value, el);

    try {
      JQuery(el).on(eventName, (event, extraParameters = {}) => {
        (event as any).data = extend(
          { deep: false },
          (event as any).data || {},
          extraParameters
        );
        return this.customData.handler(event);
      });
    } catch (error) {
      console.warn(error);
      JQuery(el).on(eventName, (event: JQuery.Event, extraParameters: any) => {
        (event as any).data = extend(
          { deep: false },
          (event as any).data || {},
          extraParameters
        );
        return this.customData.handler(event);
      });
    }
  },
};
