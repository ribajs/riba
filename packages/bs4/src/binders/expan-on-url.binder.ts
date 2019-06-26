import { IBinder, BinderWrapper, EventDispatcher, JQuery as $ } from '@ribajs/core';
import { CollapseService } from '../services/collapse.service';
import { Utils } from '../services/utils.service';

/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/collapse/
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/collapse.js
 */
export const expanOnUrlBinderWrapper: BinderWrapper = () => {
  const name = 'bs4-expan-on-url';
  const binder: IBinder<string> = {
    routine(el: HTMLElement, url: string) {
      const $el = $(el);
      const collapseService = new CollapseService($el);
      const dispatcher = new EventDispatcher('main');
  
      const checkURL = (urlToCheck?: string) => {
        if (urlToCheck && Utils.onRoute(urlToCheck)) {
          collapseService.show();
          return true;
        }
        collapseService.hide();
        return false;
      };
  
      dispatcher.on('newPageReady', () => checkURL(url));
  
      checkURL(url);
    },
  };
  return {
    binder,
    name,
  };
};
