// import Debug from 'debug';
import JQuery from 'jquery';
import { BinderWrapper, ITwoWayBinder } from '../../binder.service';
import { eventHandlerFunction } from '../../binding';

export const goBack = () => {
  window.history.back();
};

/**
 * Calls `window.history.back()` an event.
 */
const routeBackOnStarBinderWrapper: BinderWrapper = () => {

  const name = 'route-back-on-*';

  const binder: ITwoWayBinder<eventHandlerFunction> = {
    priority: 1000,

    bind(el) {
      // noting
    },

    unbind(el: HTMLElement) {
      JQuery(el).off(this.args[0] as string, goBack);
    },

    routine(el: HTMLElement, options: any) {

      if (this.args === null) {
        throw new Error('args is null');
      }
      const eventName = this.args[0] as string;
      JQuery(el).off(eventName, goBack);

      JQuery(el).on(eventName, goBack);
    },
  };
  return { binder, name };
};

export { routeBackOnStarBinderWrapper };
