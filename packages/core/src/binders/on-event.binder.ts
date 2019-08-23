import { IBinder, eventHandlerFunction } from '../interfaces';
import { JQuery } from '../modules';

/**
 * Binds an event handler on the element.
 */
export const onStarBinder: IBinder<eventHandlerFunction> = {
  name: 'on-*',
  function: true,
  priority: 1000,

  bind(el) {
    if (!this.customData) {
      this.customData = {
        handler: null,
      };
    }
  },

  unbind(el: HTMLElement) {
    if (this.customData.handler) {
      if (this.args === null) {
        throw new Error('args is null');
      }
      JQuery(el).off(this.args[0] as string, this.customData.handler);
    }
  },

  routine(el: HTMLElement, value: eventHandlerFunction) {

    if (this.args === null) {
      throw new Error('args is null');
    }
    const eventName = this.args[0] as string;

    if (this.customData.handler) {
      JQuery(el).off(eventName, this.customData);
    }

    this.customData.handler = this.eventHandler(value, el);

    try {
      JQuery(el).on(eventName, (this.customData.handler));
    } catch (error) {
      console.warn(error);
      JQuery(el).on(eventName, (event: JQuery.Event) => {
        this.customData.handler(event);
      });
    }
  },
};
