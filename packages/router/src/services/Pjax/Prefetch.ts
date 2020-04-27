import { Pjax } from './index';

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
    if (Prefetch.instances[this.viewId]) {
      return Prefetch.instances[this.viewId];
    }
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
      document.body.addEventListener('mouseover', this.onLinkEnter.bind(this), { passive: true });
      document.body.addEventListener('touchstart', this.onLinkEnter.bind(this), { passive: true });
    }
  }

  public deInit() {
    document.body.removeEventListener('mouseover', this.onLinkEnter.bind(this));
    document.body.removeEventListener('touchstart', this.onLinkEnter.bind(this));
  }

  public initAnchor(el: HTMLAnchorElement) {
    if (!window.history.pushState) {
      return false;
    }
    this.deInitAnchor(el);
    el.addEventListener('mouseover', this.onLinkEnter.bind(this), { passive: true });
    el.addEventListener('touchstart', this.onLinkEnter.bind(this), { passive: true });
  }

  public deInitAnchor(el: HTMLAnchorElement) {
    el.removeEventListener('mouseover', this.onLinkEnter.bind(this));
    el.removeEventListener('touchstart', this.onLinkEnter.bind(this));
  }

  protected async loadResponse(url: string) {
    let response = Pjax.cache.get(url);
    if (!response) {
      const pjax = Pjax.getInstance(this.viewId);
      if (pjax) {
        // This method also caches the response
        response = pjax.loadResponse(url);
      } else {
        console.warn(`No pjax instace for viewId "${this.viewId}" found!`);
      }
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

    if (!el) {
      throw new Error('HTML Element not set');
    }

    const preventCheck = Pjax.preventCheck(evt, el, url);

    // Check if the link is eligible for Pjax
    if (url && preventCheck) {
      this.loadResponse(url);
    } else {
      // if (!preventCheck) {
      //   console.warn('preventCheck failed: ' + url, preventCheck);
      // }
    }
  }
}

export { Prefetch };
