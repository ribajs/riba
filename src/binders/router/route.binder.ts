import Debug from 'debug';
import JQuery from 'jquery';
import { IOneWayBinder, BinderWrapper } from '../../binder.service';
import { Pjax, Prefetch, GlobalEvent } from './barba/barba';
import { Utils } from '../../utils';

export type IRouteOptions = any;

/**
 * Open link with pajax if the route is not the active route
 * Sets also the element active if his url is the current url
 */
export const routeBinderWrapper: BinderWrapper = (dispatcher: GlobalEvent, prefetch: Prefetch) => {

  const debug = Debug('binders:route');

  const binder: IOneWayBinder<string> = (el: HTMLElement, optionsOrurl?: string | IRouteOptions) => {
    let options: IRouteOptions;

    if (Utils.isString(optionsOrurl)) {
      options = {};
      options.url = optionsOrurl;
    } else if (Utils.isObject(optionsOrurl)) {
      options = optionsOrurl;
    } else {
      options = {};
    }

    options.viewId = options.viewId || 'main';
    options.removeAfterActivation = Utils.isBoolean(options.removeAfterActivation) ? options.removeAfterActivation : false;

    const $el = JQuery(el);
    let newTab = false;
    const isAnkerHTMLElement = $el.prop('tagName') === 'A';

    debug('getBinder', el, options.url);

    if (!options.url && isAnkerHTMLElement) {
      options.url = $el.attr('href');
    }

    if ($el.attr('target') === '_blank') {
      newTab = true;
    }

    const location = Utils.getLocation();
    const host = location.protocol + '//' + location.hostname;

    // normalize url
    if (options.url && Utils.isAbsoluteUrl(options.url)) {

      // if is not an external link
      if (options.url.indexOf(host) === 0) {
        // get relative url
        options.url = options.url.replace(host, '');
      } else {
        newTab = true;
      }
    }

    // set href if not set
    if (isAnkerHTMLElement && !$el.attr('href') && options.url) {
      $el.attr('href', options.url);
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
      checkURL(options.url);
    });

    $el.off('click').on('click', (event: JQuery.Event<HTMLElement, null>) => {
      debug('go to', options.url);

      // Do not go to ref without pajax
      event.preventDefault();
      if (Utils.onRoute(options.url)) {
        debug('already on this site');
      } else {
        if (options.url) {
          const pjax = Pjax.getInstance(options.viewId);
          pjax.goTo(options.url, newTab);
        }
      }

      if (options.removeAfterActivation) {
        // this.unbind(); TODO?
        $el.remove();
      }

    });

    if (!newTab && !Utils.onRoute(options.url)) {
      $el.off('mouseenter touchstart').on('mouseenter touchstart', (event: JQuery.Event<HTMLElement, null>) => {
        prefetch.onLinkEnter(event, options.url);
      });
    }

    checkURL(options.url);
  };

  return {
    binder,
    name: 'route',
  };
};
