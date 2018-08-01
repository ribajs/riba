import Debug from 'debug';
import JQuery from 'jquery';
import { IOneWayBinder, BinderWrapper } from '../../binder.service';
import { Pjax, Prefetch, GlobalEvent } from './barba/barba';
import { Utils } from '../../utils';

/**
 * Open link with pajax if the route is not the active route
 * Sets also the element active if his url is the current url
 */
export const routeBinderWrapper: BinderWrapper = (dispatcher: GlobalEvent, prefetch: Prefetch) => {

  const name = 'route';
  const debug = Debug('binders:route');

  const binder: IOneWayBinder<string> = (el: HTMLElement, url: string | undefined) => {
    const $el = JQuery(el);
    let newTab = false;
    const isAnkerHTMLElement = $el.prop('tagName') === 'A';

    // TODO
    const pjax = new Pjax('global');

    debug('getBinder', el, url);

    if (!url && isAnkerHTMLElement) {
      url = $el.attr('href');
    }

    if ($el.attr('target') === '_blank') {
      newTab = true;
    }

    const location = Utils.getLocation();
    const host = location.protocol + '//' + location.hostname;

    // normalize url
    if (url && Utils.isAbsoluteUrl(url)) {

      // if is not an external link
      if (url.indexOf(host) === 0) {
        // get relative url
        url = url.replace(host, '');
      } else {
        newTab = true;
      }
    }

    // set href if not set
    if (isAnkerHTMLElement && !$el.attr('href') && url) {
      $el.attr('href', url);
    }

    const checkURL = (urlToCheck?: string) => {
      if (urlToCheck && Utils.onRoute(urlToCheck)) {
        return true;
      }
      return false;
    };

    // JQuery(window).on('hashchange', () => {
    //   $el.trigger('hashchange');
    // });

    dispatcher.on('newPageReady', () => {
      $el.trigger('new-page-ready');
      checkURL(url);
    });

    $el.off('click').on('click', (event: JQuery.Event<HTMLElement, null>) => {
      debug('go to', url);

      // Do not go to ref without pajax
      event.preventDefault();
      if (Utils.onRoute(url)) {
        debug('already on this site');
      } else {
        if (url) {
          pjax.goTo(url, newTab);
        }
      }

    });

    if (!newTab && !Utils.onRoute(url)) {
      $el.off('mouseenter touchstart').on('mouseenter touchstart', (event: JQuery.Event<HTMLElement, null>) => {
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
