import { Debug, Utils } from '@ribajs/core';
import { Pjax } from './Pjax';

/**
 * Prefetch
 *
 * @namespace Barba.Prefetch
 * @type {object}
 */
class Prefetch {

  /** singleton instance */
  private static instance: Prefetch;

  /**
   * Class name used to ignore prefetch on links
   *
   * @memberOf Barba.Prefetch
   * @type {String}
   * @default
   */
  public ignoreClassLink = 'no-barba-prefetch';

  private debug = Debug('router:Prefetch');

  /**
   * Creates an singleton instance of Prefetch.
   */
  constructor() {
    if (Prefetch.instance) {
      return Prefetch.instance;
    }

    Prefetch.instance = this;
  }

  /**
   * Init the event listener on mouseover and touchstart
   * for the prefetch
   *
   * @memberOf Barba.Prefetch
   */
  public init(autobindLinks = false) {
    if (!window.history.pushState) {
      return false;
    }

    // We do this with rv-route
    if (autobindLinks) {
      document.body.addEventListener('mouseover', this.onLinkEnter.bind(this));
      document.body.addEventListener('touchstart', this.onLinkEnter.bind(this));
    }
  }

  /**
   * Callback for the mousehover/touchstart, please use the rv-route binder instead
   *
   * @memberOf Barba.Prefetch
   * @private
   * @param  {object} evt
   */
  public onLinkEnter(evt: Event | JQuery.Event, url?: string, el?: HTMLAnchorElement) {

    if (!el && evt) {
      el = ((evt as Event).target as HTMLAnchorElement) || (evt as any).currentTarget;
    }

    if (!el) {
      throw new Error('HTML Element not set');
    }

    if (!url) {
      while (el && !Pjax.getHref(el)) {
        el = (el.parentNode as HTMLAnchorElement); // TODO testme
      }

      if (!el || el.classList.contains(this.ignoreClassLink)) {
        return;
      }

      url = Pjax.getHref(el);
    }

    this.debug('onLinkEnter', url);

    if (!url) {
      console.warn(`Url is not defined, you can't cache the link without the url. Please make shure your element has the href attribute or pass the url directly to this function.`);
    }

    // Check if the link is elegible for Pjax
    if (url && Pjax.preventCheck(evt, el) && !Pjax.cache.get(url)) {
      const xhr = Utils.xhr(url);
      Pjax.cache.set(url, xhr);
    }
  }
}

export { Prefetch };
