import { HttpService } from '@ribajs/core';
import { Pjax } from './index';

/**
 * Prefetch
 */
class Prefetch {

  /** singleton instance */
  private static instance: Prefetch;

  /**
   * Class name used to ignore prefetch on links
   *
   * @default
   */
  public ignoreClassLink = 'no-barba-prefetch';

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
   */
  public onLinkEnter(evt: Event, url?: string, el?: HTMLAnchorElement) {

    if (!url) {

      if (!el && evt) {
        el = ((evt as Event).target as HTMLAnchorElement) || (evt as any).currentTarget;
      }

      if (!el) {
        throw new Error('HTML Element not set');
      }

      while (el && !Pjax.getHref(el)) {
        el = (el.parentNode as HTMLAnchorElement); // TODO testme
      }

      if (!el || el.classList.contains(this.ignoreClassLink)) {
        return;
      }

      url = Pjax.getHref(el);
    }

    if (!url) {
      console.warn(`Url is not defined, you can't cache the link without the url. Please make shure your element has the href attribute or pass the url directly to this function.`);
      return;
    }

    const preventCheck = Pjax.preventCheck(evt, el, url);
    let fetch = Pjax.cache.get(url);

    // Check if the link is eligible for Pjax
    if (url && preventCheck && !fetch) {
      fetch = HttpService.get(url, undefined, 'html');
      Pjax.cache.set(url, fetch);
    } else {
      // if (!preventCheck) {
      //   console.warn('preventCheck failed: ' + url, preventCheck);
      // }
    }
  }
}

export { Prefetch };
