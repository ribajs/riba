import { Binder, EventDispatcher } from '@ribajs/core';
import { JQuery as $ } from '@ribajs/jquery';
import { CollapseService } from '../services/collapse.service';
import { Utils } from '../services/utils.service';

/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/collapse/
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/collapse.js
 */
export const collapseOnUrlBinder: Binder<string> = {
  name: 'bs4-collapse-on-url',
  routine(el: HTMLElement, url: string) {
    const $el = $(el);
    const collapseService = new CollapseService($el);
    const dispatcher = new EventDispatcher('main');

    const checkURL = (urlToCheck?: string) => {
      if (urlToCheck && Utils.onRoute(urlToCheck)) {
        collapseService.hide();
        return true;
      }
      // collapseService.show();
      return false;
    };

    dispatcher.on('newPageReady', () => checkURL(url));
  },
};
