import { Pjax } from "./index.js";
import { getElementFromEvent } from "@ribajs/utils/src/dom.js";
import { normalizeUrl } from "@ribajs/utils/src/url";
import { IGNORE_CLASS_PREFETCH, ROUTE_ERROR_CLASS } from "../../constants.js";

export interface PrefetchInstances {
  [key: string]: Prefetch;
}

/**
 * Prefetch
 */
class Prefetch {
  public static getInstance(id = "main"): Prefetch {
    const result = Prefetch.instances[id];
    if (!result) {
      return new this(id);
    }
    return result;
  }

  /** singleton instance */
  protected static instances: PrefetchInstances = {};

  /**
   * Creates an singleton instance of Prefetch.
   */
  constructor(readonly viewId: string) {
    this.viewId = viewId;
    if (Prefetch.instances[this.viewId]) {
      return Prefetch.instances[this.viewId];
    }
    Prefetch.instances[this.viewId] = this;
    this.onLinkEnterIntern = this.onLinkEnterIntern.bind(this);
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
      document.body.addEventListener("mouseover", this.onLinkEnterIntern, {
        passive: true,
      });
      document.body.addEventListener("touchstart", this.onLinkEnterIntern, {
        passive: true,
      });
    }
  }

  public deInit() {
    document.body.removeEventListener("mouseover", this.onLinkEnterIntern);
    document.body.removeEventListener("touchstart", this.onLinkEnterIntern);
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
    el.addEventListener("mouseover", this.onLinkEnter.bind(this, url, el), {
      passive: true,
    });
    el.addEventListener("touchstart", this.onLinkEnter.bind(this, url, el), {
      passive: true,
    });
  }

  public deInitBinder(el: HTMLAnchorElement, url: string) {
    el.removeEventListener("mouseover", this.onLinkEnter.bind(this, url, el));
    el.removeEventListener("touchstart", this.onLinkEnter.bind(this, url, el));
  }

  public onLinkEnter(
    url: string,
    el: HTMLAnchorElement | HTMLUnknownElement,
    evt: Event,
  ) {
    if (
      el.classList &&
      (el.classList.contains(IGNORE_CLASS_PREFETCH) ||
        el.classList.contains(ROUTE_ERROR_CLASS))
    ) {
      return;
    }

    url = normalizeUrl(url).url;

    const preventCheck = Pjax.preventCheck(url, el, evt);

    // Check if the link is eligible for Pjax
    if (url && preventCheck) {
      const pjax = Pjax.getInstance(this.viewId);
      if (pjax) {
        pjax.loadResponseCached(url, false, false).catch((error) => {
          el.classList.add(ROUTE_ERROR_CLASS);
          console.error(url);
          console.error(error);
        });
      } else {
        console.warn(
          `[Prefetch.onLinkEnter] No pjax instance for viewId "${this.viewId}" found!`,
        );
        el.classList.add(ROUTE_ERROR_CLASS);
      }
    }
  }

  public url(url: string) {
    url = normalizeUrl(url).url;

    const preventCheck = Pjax.preventCheck(url);

    // Check if the link is eligible for Pjax
    if (url && preventCheck) {
      const pjax = Pjax.getInstance(this.viewId);
      if (pjax) {
        pjax.loadResponseCached(url, false, false).catch((error) => {
          console.error(error);
        });
      } else {
        console.warn(
          `[Prefetch.url] No pjax instance for viewId "${this.viewId}" found!`,
        );
      }
    }
  }

  /**
   * Callback for the mouseover/touchstart, please use the rv-route binder instead
   *
   */
  protected onLinkEnterIntern(evt: Event) {
    let el = getElementFromEvent(evt);

    if (!el) {
      throw new Error("HTML Element not set");
    }

    while (el && !Pjax.getHref(el)) {
      el = el.parentNode as HTMLAnchorElement;
    }

    if (!el) {
      return;
    }

    if (el.nodeName !== "A") {
      return;
    }

    const href = Pjax.getHref(el);

    // Already managed by the rv-route binder
    if (el.classList.contains("route") || el.hasAttribute("rv-route")) {
      return;
    }

    if (!href) {
      console.warn(
        `Url is not defined, you can't cache the link without the url. Please make sure your element has the href attribute or pass the url directly to this function.`,
        el,
      );
      return;
    }

    return this.onLinkEnter(href, el, evt);
  }
}

export { Prefetch };
