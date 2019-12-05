import { HttpService } from '@ribajs/core';
import { Pjax } from './index';

export interface PrefetchInstances {
  [key: string]: Prefetch;
}

/**
 * Prefetch
 */
class Prefetch {

  public static getInstance(id: string = 'main'): Prefetch | undefined {
    const result = Prefetch.instances[id];
    if (!result) {
      console.warn(`No Pjax instance with id ${id} found!`);
    }
    return result;
  }

  /** singleton instance */
  protected static instances: PrefetchInstances = {};

  /**
   * Class name used to ignore prefetch on links
   *
   * @default
   */
  public ignoreClassLink = 'no-barba-prefetch';

  public preloadImages = false;

  /**
   * Creates an singleton instance of Prefetch.
   */
  constructor(readonly viewId: string) {
    if (Prefetch.instances[this.viewId]) {
      return Prefetch.instances[this.viewId];
    }
  }

  /**
   * Init the event listener on mouseover and touchstart
   * for the prefetch
   *
   */
  public init(autobindLinks = false, preloadImages = true) {
    if (!window.history.pushState) {
      return false;
    }
    this.preloadImages = preloadImages;

    // We do this with rv-route
    if (autobindLinks) {
      document.body.addEventListener('mouseover', this.onLinkEnter.bind(this), { passive: true });
      document.body.addEventListener('touchstart', this.onLinkEnter.bind(this), { passive: true });
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
    let response = Pjax.cache.get(this.viewId + '_' + url);

    // Check if the link is eligible for Pjax
    if (url && preventCheck && !response) {
      const pjax = Pjax.getInstance(this.viewId);
      if (pjax) {
        // This method also caches the response
        response = pjax.loadResponse(url);
      } else {
        console.warn(`No pjax instace for viewId "${this.viewId}" found!`);
      }

    } else {
      // if (!preventCheck) {
      //   console.warn('preventCheck failed: ' + url, preventCheck);
      // }
    }
  }
}

export { Prefetch };
