import Debug from 'debug';
import $ from 'jquery';
import { IOneWayBinder, BinderWrapper } from '../../binder.service';
import { Pjax, Prefetch, Dispatcher } from './barba';
import { Utils } from '../../utils';

/**
 * Open link with pajax if the route is not the active route
 * Sets also the element active if his url is the current url
 */
export const routeBinder: BinderWrapper = (dispatcher: Dispatcher, pjax: Pjax, prefetch: Prefetch) => {

  const name = 'route';
  const debug = Debug('binders:route');

  const binder: IOneWayBinder<string> = function(el: HTMLElement, url: string | undefined) {
    const $el = $(el);
    let newTab = false;
    const usePajax = true;
    const self = this;

    debug('getBinder', el, url);

    if (!url) {
      url = $el.attr('href');
    }

    if ($el.attr('target') === '_blank') {
      newTab = true;
    }

    const location = Utils.getLocation();
    const host = location.protocol + '//' + location.hostname;

    // nromalize url
    if (url && Utils.isAbsoluteUrl(url)) {

      // if is not an external link
      if (url.indexOf(host) === 0) {
        // get relative url
        url = url.replace(host, '');
      } else {
        newTab = true;
      }
    }

    const alreadyOnURL = (checkUrl?: string) => {
      if(checkUrl) {
        const pathname = Utils.getLocation().pathname;
        debug('checkURL', pathname, checkUrl);
        if (checkUrl === pathname) {
          return true;
        }
      }
      return false;
    };

    const checkURL = (urlToCheck?: string) => {
      if(urlToCheck) {
        if (alreadyOnURL(urlToCheck)) {
          $el.addClass('active');
          return true;
        }
        $el.removeClass('active');
      }
      return false;
    };

    if (usePajax) {
      dispatcher.on('newPageReady', () => checkURL(url));
    } else {
      $(window).on('hashchange', () => checkURL(url));
    }

    $el.off('click').on('click', (event) => {
      debug('go to ', url);
      event.preventDefault();
      if (alreadyOnURL(url)) {
        debug('already on this site');
      } else {
        if(url) {
          pjax.goTo(url, newTab);
        }
      }
    });

    if (usePajax && !newTab && !alreadyOnURL(url)) {
      $el.off('mouseenter touchstart').on('mouseenter touchstart', (event) => {
        prefetch.onLinkEnter(event, url);
      });
    }

    checkURL(url);
  };

  return {
    binder,
    name,
  };
};
