import { Pjax, Prefetch } from '../services';
import { Binding, IBinder, BinderWrapper, EventDispatcher, JQuery, Debug, Utils, IBindable } from '@ribajs/core';

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
  checkURL(this: Binding, urlToCheck?: string): boolean;
  onClick(this: Binding, event: JQuery.Event): void;
  onNewPageReady(this: Binding): void;
  onLinkEnter(this: Binding, event: Event): void;
}

/**
 * Open link with pajax if the route is not the active route
 * Sets also the element active if his url is the current url
 */
export const routeBinderWrapper: BinderWrapper = () => {

  const debug = Debug('binders:route');

  const binder: IBinder<string> = {

    bind(this: Binding, el: HTMLUnknownElement) {
      this.customData = <ICustomData> {
        prefetch: new Prefetch(),
        dispatcher: undefined,
        options: {
          removeAfterActivation: false,
          newTab: false,
        } as IRouteOptions,
        $el: JQuery(el),
        checkURL(this: Binding, urlToCheck?: string) {
          if (urlToCheck && Utils.onRoute(urlToCheck)) {
            return true;
          }
          return false;
        },
        onClick(this: Binding, event: JQuery.Event) {
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
        onNewPageReady(this: Binding) {
          if (this.customData.$el) {
            this.customData.$el.trigger('new-page-ready');
          }
          this.customData.checkURL.call(this, this.customData.options.url);
        },
        onLinkEnter(this: Binding, event: Event) {
          (this.customData as ICustomData).prefetch.onLinkEnter(event, this.customData.options.url);
        },
      };
    },

    routine(this: Binding, el: HTMLElement, optionsOrUrl?: string | IRouteOptions) {
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

        debug('is absolut url', this.customData.options.url);

        // if is an internal link
        if (Utils.isInternalUrl(this.customData.options.url)) {
          debug('interal url', this.customData.options.url);
          // get relative url
          this.customData.options.url = this.customData.options.url.replace(host, '');
        } else {
          debug('external url', this.customData.options.url);
          this.customData.options.newTab = true;
        }
      } else {
        debug('is relative url', this.customData.options.url);
      }

      // set href if not set
      if (isAnkerHTMLElement && !this.customData.$el.attr('href') && this.customData.options.url) {
        this.customData.$el.attr('href', this.customData.options.url);
      }

      this.customData.dispatcher.on('newPageReady', this.customData.onNewPageReady.bind(this));

      this.customData.$el.off('click').on('click', this.customData.onClick.bind(this));

      if (!this.customData.options.newTab && !Utils.onRoute(this.customData.options.url)) {
        el.addEventListener('mouseover', this.customData.onLinkEnter.bind(this));
        el.addEventListener('touchstart', this.customData.onLinkEnter.bind(this));
      }

      this.customData.checkURL.call(this, this.customData.options.url);
    },
    unbind(this: Binding, el: HTMLUnknownElement) {
      el.removeEventListener('mouseover', this.customData.onLinkEnter);
      el.removeEventListener('touchstart', this.customData.onLinkEnter);
      this.customData.$el.off('click', this.customData.onClick);
      this.customData.dispatcher.off('newPageReady', this.customData.onNewPageReady);
      // console.warn('routeClassStarBinder routine', el);
    },
  };

  return {
    binder,
    name: 'route',
  };
};
