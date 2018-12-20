import { Pjax, Prefetch } from './barba/barba';
import { ITwoWayBinder, BinderWrapper, EventDispatcher, JQuery, Debug, Utils } from '@ribajs/core';

export interface IRouteOptions {
  url: string;
  viewId: string;
  removeAfterActivation: boolean;
  newTab: boolean;
}

export interface ICustomData {
  prefetch: Prefetch;
  dispatcher?: EventDispatcher;
  options: IRouteOptions;
  $el?: JQuery<HTMLUnknownElement>;
}

export interface IRouterBinder extends ITwoWayBinder<string> {
  customData: ICustomData;
  checkURL(urlToCheck?: string): boolean;
  onClick(event: JQuery.Event): void;
  onNewPageReady(): void;
  onLinkEnter(event: Event): void;
  routine(el: HTMLElement, optionsOrUrl?: string | IRouteOptions): void;
}

/**
 * Open link with pajax if the route is not the active route
 * Sets also the element active if his url is the current url
 */
export const routeBinderWrapper: BinderWrapper = () => {

  const debug = Debug('binders:route');

  const binder: IRouterBinder =  {

    customData: {
      prefetch: new Prefetch(),
      dispatcher: undefined,
      options: {
        removeAfterActivation: false,
        newTab: false,
      } as IRouteOptions,
    },

    bind(el: HTMLUnknownElement) {
      this.customData.el = JQuery(el);
      this.customData.prefetch = new Prefetch();
    },

    checkURL(urlToCheck?: string) {
      if (urlToCheck && Utils.onRoute(urlToCheck)) {
        return true;
      }
      return false;
    },

    onClick(event: JQuery.Event) {
      debug('go to', this.customData.options.url);

      // Do not go to ref without pajax
      event.preventDefault();
      if (Utils.onRoute(this.customData.options.url)) {
        debug('already on this site');
      } else {
        if (this.customData.options.url) {
          const pjax = Pjax.getInstance(this.customData.options.viewId);
          pjax.goTo(this.customData.options.url, this.customData.options.newTab);
        }
      }

      if (this.customData.options.removeAfterActivation && this.customData.$el) {
        // this.unbind(); TODO?
        this.customData.$el.remove();
      }
    },

    onNewPageReady() {
      if (this.customData.$el) {
        this.customData.$el.trigger('new-page-ready');
      }
      this.checkURL(this.customData.options.url);
    },

    onLinkEnter(event: Event) {
      this.customData.prefetch.onLinkEnter(event, this.customData.options.url);
    },

    routine(el: HTMLElement, optionsOrUrl?: string | IRouteOptions) {
      if (Utils.isString(optionsOrUrl)) {
        this.customData.options.url = optionsOrUrl as string;
      } else if (Utils.isObject(optionsOrUrl as IRouteOptions)) {
        this.customData.options = optionsOrUrl as IRouteOptions;
      }
      this.customData.options.viewId = this.customData.options.viewId || 'main';
      this.customData.options.removeAfterActivation = Utils.isBoolean(this.customData.options.removeAfterActivation) ? this.customData.options.removeAfterActivation : false;
      this.customData.dispatcher = new EventDispatcher(this.customData.options.viewId);

      this.customData.options.newTab = false;
      if (!this.customData.$el) {
        throw new Error('$el is not set');
      }
      const isAnkerHTMLElement = this.customData.$el.prop('tagName') === 'A';

      debug('getBinder', el, this.customData.options.url);

      if (!this.customData.options.url && isAnkerHTMLElement) {
        const url = this.customData.$el.attr('href');
        if (url) {
          this.customData.options.url = url;
        }
      }

      if (this.customData.$el.attr('target') === '_blank') {
        this.customData.options.newTab = true;
      }

      const location = Utils.getLocation();
      const host = location.protocol + '//' + location.hostname;

      // normalize url
      if (this.customData.options.url && Utils.isAbsoluteUrl(this.customData.options.url)) {

        // if is not an external link
        if (this.customData.options.url.indexOf(host) === 0) {
          // get relative url
          this.customData.options.url = this.customData.options.url.replace(host, '');
        } else {
          this.customData.options.newTab = true;
        }
      }

      // set href if not set
      if (isAnkerHTMLElement && !this.customData.$el.attr('href') && this.customData.options.url) {
        this.customData.$el.attr('href', this.customData.options.url);
      }

      this.customData.dispatcher.on('newPageReady', this.onNewPageReady.bind(this));

      this.customData.$el.off('click').on('click', this.onClick.bind(this));

      if (!this.customData.options.newTab && !Utils.onRoute(this.customData.options.url)) {
        el.addEventListener('mouseover', this.onLinkEnter.bind(this));
        el.addEventListener('touchstart', this.onLinkEnter.bind(this));
      }

      this.checkURL(this.customData.options.url);
    },
    unbind(el: HTMLUnknownElement) {
      // console.warn('routeClassStarBinder routine', el);
    },
  };

  return {
    binder: binder,
    name: 'route',
  };
};
