import { Pjax, Prefetch } from '../services';
import { Binding, Binder, EventDispatcher, Utils } from '@ribajs/core';

export interface RouteOptions {
  url: string;
  viewId: string;
  removeAfterActivation: boolean;
  newTab: boolean;
}

export interface CustomData {
  prefetch: Prefetch;
  dispatcher?: EventDispatcher;
  options: RouteOptions;
  checkURL(this: Binding, urlToCheck?: string): boolean;
  onClick(this: Binding, event: Event): void;
  onNewPageReady(this: Binding): void;
}

/**
 * Open link with pajax if the route is not the active route
 */
export const routeBinder: Binder<string> = {
  name: 'route',

  bind(this: Binding, el: HTMLElement) {
    el.classList.add('route');
    this.customData = {
      dispatcher: undefined,
      options: {
        removeAfterActivation: false,
        newTab: false,
      } as RouteOptions,
      checkURL(this: Binding, urlToCheck?: string) {
        if (urlToCheck && Utils.onRoute(urlToCheck)) {
          return true;
        }
        return false;
      },
      onClick(this: Binding, event: Event) {
        // Do not go to ref without pajax
        if (this.el.tagName === 'A') {
          event.preventDefault();
        }
        if (Utils.onRoute(this.customData.options.url)) {
          // console.debug('already on this site');
        } else {
          if (this.customData.options.url) {
            const pjax = Pjax.getInstance(this.customData.options.viewId);
            if (!pjax) {
              return;
            }
            pjax.goTo(this.customData.options.url, this.customData.options.newTab);
          }
        }
        if (this.customData.options.removeAfterActivation && this.el && this.el.parentNode) {
          // this.unbind(); TODO?
          this.el.parentNode.removeChild(this.el);
        }
      },
      onNewPageReady(this: Binding) {
        this.customData.checkURL.call(this, this.customData.options.url);
      }
    } as CustomData;
    el.addEventListener('click', this.customData.onClick.bind(this));
  },

  routine(this: Binding, el: HTMLElement, optionsOrUrl?: string | RouteOptions) {
    if (Utils.isString(optionsOrUrl)) {
      this.customData.options.url = optionsOrUrl as string;
    } else if (Utils.isObject(optionsOrUrl as RouteOptions)) {
      this.customData.options = optionsOrUrl as RouteOptions;
    }
    this.customData.options.viewId = this.customData.options.viewId || 'main';
    this.customData.prefetch = new Prefetch(this.customData.options.viewId),
    this.customData.options.removeAfterActivation = Utils.isBoolean(this.customData.options.removeAfterActivation) ? this.customData.options.removeAfterActivation : false;
    this.customData.dispatcher = new EventDispatcher(this.customData.options.viewId);

    this.customData.options.newTab = false;
    const isAnkerHTMLElement = el.tagName === 'A';

    if (!this.customData.options.url && isAnkerHTMLElement) {
      const url = el.getAttribute('href');
      if (url) {
        this.customData.options.url = url;
      }
    }

    if (el.getAttribute('target') === '_blank') {
      this.customData.options.newTab = true;
    }

    // normalize url
    this.customData.options.url = Utils.normalizeUrl(this.customData.options.url)


    // set href if not set
    if (isAnkerHTMLElement && !el.getAttribute('href') && this.customData.options.url) {
      el.setAttribute('href', this.customData.options.url);
    }

    this.customData.dispatcher.off('newPageReady', this.customData.onNewPageReady.bind(this));
    this.customData.dispatcher.on('newPageReady', this.customData.onNewPageReady.bind(this));

    if (!this.customData.options.newTab) {
      this.customData.prefetch.initBinder(el);
    }

    this.customData.checkURL.call(this, this.customData.options.url);
  },
  unbind(this: Binding, el: HTMLUnknownElement) {
    this.customData.prefetch.deInitBinder(el);
    el.removeEventListener('click', this.customData.onClick.bind(this));
    this.customData.dispatcher.off('newPageReady', this.customData.onNewPageReady.bind(this));
  },
};
