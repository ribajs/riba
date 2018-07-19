import $ from 'jquery';
import { BinderWrapper } from '../../binder.service';
import { Utils } from '../../utils';
import { GlobalEvent } from './barba/barba';

export const activeOnRouteBinderWrapper: BinderWrapper = (dispatcher: GlobalEvent) => {
  return {
    binder: (el: HTMLElement, url: string, className = 'active') => {
      const usePajax = true;
      const $el = $(el);
      const checkURL = (urlToCheck?: string) => {
        if (urlToCheck) {
          if (Utils.onRoute(urlToCheck)) {
            $el.addClass('active');
            // check if element is radio input
            if ($el.is(':radio')) {
              $el.prop('checked', true);
            }
            return true;
          }
          $el.removeClass('active');
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
    },
    name: 'active-on-route',
  };
};
