import { IBinder, eventHandlerFunction } from '../interfaces';
// import Debug from 'debug';
import { BinderWrapper } from '../interfaces/binder';

/**
 * Binds an event handler on the element.
 */
const onStarBinderWrapper: BinderWrapper<eventHandlerFunction> = (jQuery: JQueryStatic) => {

  const binder: IBinder<eventHandlerFunction> = {
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
        jQuery(el).off(this.args[0] as string, this.customData.handler);
      }
    },

    routine(el: HTMLElement, value: eventHandlerFunction) {

      if (this.args === null) {
        throw new Error('args is null');
      }
      const eventName = this.args[0] as string;

      if (this.customData.handler) {
        jQuery(el).off(eventName, this.customData);
      }

      this.customData.handler = this.eventHandler(value, el);

      try {
        jQuery(el).on(eventName, (this.customData.handler));
      } catch (error) {
        console.warn(error);
        jQuery(el).on(eventName, (event: JQuery.Event) => {
          this.customData.handler(event);
        });
      }
    },
  };
  return binder;
};

export { onStarBinderWrapper };
