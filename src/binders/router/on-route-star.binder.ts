import $ from 'jquery';
import { IOneWayBinder, BinderWrapper } from '../../binder.service';
import { Utils } from '../../utils';
import { GlobalEvent } from './barba/barba';

export const onRouteStarBinderWrapper: BinderWrapper = (dispatcher: GlobalEvent) => {

  const binder: IOneWayBinder<string> = function(el: HTMLElement, url: string) {
    const usePajax = true;
    const $el = $(el);
    const className = this.args[0].toString() || 'active';
    const checkURL = (urlToCheck?: string) => {
      if (urlToCheck) {
        if (Utils.onRoute(urlToCheck)) {
          $el.addClass(className);
          // check if element is radio input
          if ($el.is(':radio')) {
            $el.prop('checked', true);
          }
          return true;
        }
        $el.removeClass(className);
        // uncheck if element is radio input
        if ($el.is(':radio')) {
          $el.prop('checked', false);
        }
      }
      return false;
    };
    if (usePajax) {
      dispatcher.on('newPageReady', () => checkURL(url));
    } else {
      $(window).on('hashchange', () => checkURL(url));
    }
  };

  return {
    binder,
    name: 'on-route-*',
  };
};
