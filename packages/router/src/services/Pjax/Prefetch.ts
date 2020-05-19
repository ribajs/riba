import { Pjax } from './index';
import { getElementFromEvent } from "@ribajs/utils/src/dom";
import { normalizeUrl } from "@ribajs/utils/src/url";

export interface PrefetchInstances {
  [key: string]: Prefetch;
}

/**
 * Prefetch
 */
class Prefetch {

  public static getInstance(id = 'main'): Prefetch | undefined {
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

  /**
   * Creates an singleton instance of Prefetch.
   */
  constructor(readonly viewId: string) {
    this.viewId = viewId;
    if (Prefetch.instances[this.viewId]) {
      return Prefetch.instances[this.viewId];
    }
    Prefetch.instances[this.viewId] = this;
  }

  /**
   * Init the event listener on mouseover and touchstart for all links on the document
   * for the prefetch
   *
   */
  public init(autobindLinks = false) {
    if (!window.history.pushState) {
      return false;
    }
    if (autobindLinks) {
      this.deInit();
      document.body.addEventListener('mouseover', this.onLinkEnterIntern.bind(this), { passive: true });
      document.body.addEventListener('touchstart', this.onLinkEnterIntern.bind(this), { passive: true });
    }
  }

  public deInit() {
    document.body.removeEventListener('mouseover', this.onLinkEnterIntern.bind(this));
    document.body.removeEventListener('touchstart', this.onLinkEnterIntern.bind(this));
  }

  /**
   * This method is used from the rv-route binder
   * @param el
   */
  public initBinder(el: HTMLAnchorElement, url: string) {
    if (!window.history.pushState) {
      return false;
    }
    this.deInitBinder(el, url);
    el.addEventListener('mouseover', this.onLinkEnter.bind(this, url, el), { passive: true });
    el.addEventListener('touchstart', this.onLinkEnter.bind(this, url, el), { passive: true });
  }

  public deInitBinder(el: HTMLAnchorElement, url: string) {
    el.removeEventListener('mouseover', this.onLinkEnter.bind(this, url, el));
    el.removeEventListener('touchstart', this.onLinkEnter.bind(this, url, el));
  }

  public onLinkEnter(url: string, el: HTMLAnchorElement, evt: Event) {

    if (el.classList && el.classList.contains(this.ignoreClassLink)) {
      return;
    }

    url = normalizeUrl(url);

    const preventCheck = Pjax.preventCheck(evt, el, url);

    // Check if the link is eligible for Pjax
    if (url && preventCheck) {
      const pjax = Pjax.getInstance(this.viewId);
      if (pjax) {
        pjax.loadResponseCached(url);
      } else {
        console.warn(`No pjax instace for viewId "${this.viewId}" found!`);
      }
    } else {
      if (!preventCheck) {
        // console.warn('preventCheck failed: ' + url, preventCheck);
      }
    }
  }

  /**
   * Callback for the mousehover/touchstart, please use the rv-route binder instead
   *
   */
  protected onLinkEnterIntern(evt: Event) {

    let el = getElementFromEvent(evt);

    if (!el) {
      throw new Error('HTML Element not set');
    }

    while (el && !Pjax.getHref(el)) {
      el = (el.parentNode as HTMLAnchorElement); // TODO testme
    }

    if (!el) {
      return;
    }

    if (el.nodeName !== "A") {
      return;
    }

    const href = Pjax.getHref(el);

    // Already managed by the rv-route binder
    if ((el.classList.contains('route') || el.hasAttribute('rv-route'))) {
      return;
    }

    if (!href) {
      console.warn(`Url is not defined, you can't cache the link without the url. Please make shure your element has the href attribute or pass the url directly to this function.`, el);
      return;
    }

    return this.onLinkEnter(href, el, evt);

  }
}

export { Prefetch };
