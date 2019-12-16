import { Binder, eventHandlerFunction } from '../interfaces';
import { TouchEventService } from '../services/touch-events.service';

/**
 * Binds an event handler on the element.
 */
export const onEventBinder: Binder<eventHandlerFunction> = {
  name: 'on-*',
  function: true,
  priority: 1000,

  bind(el) {
    if (!this.customData) {
      this.customData = {
        handler: null,
      };
    }
    if (this.el.dataset.touchEvents) {
      this.customData.touchEventService = TouchEventService.getInstance(Number(this.el.dataset.touchEvents));
    } else {
      this.customData.touchEventService = new TouchEventService(el);
    }
  },

  unbind(el: HTMLElement) {
    if (this.customData.handler) {
      if (this.args === null) {
        throw new Error('args is null');
      }
      const eventName = this.args[0] as string;
      el.removeEventListener(eventName, this.customData.handler);
    }
    if (this.customData.touchEventService) {
      (this.customData.touchEventService as TouchEventService).removeEventListeners();
    }
  },

  routine(el: HTMLElement, value: eventHandlerFunction) {

    if (this.args === null) {
      throw new Error('args is null');
    }
    const eventName = this.args[0] as string;

    if (this.customData.handler) {
      el.removeEventListener(eventName, this.customData.handler);
    }

    this.customData.handler = this.eventHandler(value, el);

    const passive = this.el.dataset.passive === 'true'; // data-passive="true"

    try {
      el.addEventListener(eventName, this.customData.handler,  { passive });
    } catch (error) {
      console.warn(error);
      el.addEventListener(eventName, (event: Event) => {
        this.customData.handler(event);
      });
    }
  },
};
