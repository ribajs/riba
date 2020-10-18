import { Pjax, Prefetch } from "../services";
import { Binding, Binder, EventDispatcher } from "@ribajs/core";
import { isObject, isString } from "@ribajs/utils/src/type";
import { onRoute, normalizeUrl, isExternalUrl } from "@ribajs/utils/src/url";

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
  name: "route",

  bind(this: Binding, el: HTMLElement) {
    el.classList.add("route");
    this.customData = {
      dispatcher: undefined,
      options: {
        removeAfterActivation: false,
        newTab: false,
      } as RouteOptions,
      onClick(this: Binding, event: Event) {
        // console.log(this.customData.options.url);
        const pjax = Pjax.getInstance(this.customData.options.viewId);
        if (onRoute(this.customData.options.url)) {
          console.debug("already on this site");
        } else if (isExternalUrl(this.customData.options.url)) {
          // console.debug('check');
          if (!pjax) {
            return;
          }
          pjax.goTo(this.customData.options.url);
        } else {
          if (this.customData.options.url) {
            if (!pjax) {
              return;
            }
            pjax.onLinkClick(
              event,
              this.el as HTMLAnchorElement,
              this.customData.options.url
            );
          }
        }
        if (
          this.customData.options.removeAfterActivation &&
          this.el &&
          this.el.parentNode
        ) {
          // this.unbind(); TODO?
          this.el.parentNode.removeChild(this.el);
        }
      },
    } as CustomData;
    this.customData.onClick = this.customData.onClick.bind(this);
    el.addEventListener("click", this.customData.onClick);
  },

  routine(
    this: Binding,
    el: HTMLElement,
    optionsOrUrl?: string | RouteOptions
  ) {
    if (isString(optionsOrUrl)) {
      this.customData.options.url = optionsOrUrl as string;
    } else if (isObject(optionsOrUrl as RouteOptions)) {
      this.customData.options = optionsOrUrl as RouteOptions;
    }
    this.customData.options.viewId = this.customData.options.viewId || "main";
    this.customData.prefetch = new Prefetch(this.customData.options.viewId);
    this.customData.dispatcher = new EventDispatcher(
      this.customData.options.viewId
    );

    this.customData.options.newTab = false;
    const isAnkerHTMLElement = el.tagName === "A";

    if (!this.customData.options.url && isAnkerHTMLElement) {
      const url = el.getAttribute("href");
      if (url) {
        this.customData.options.url = url;
      }
    }

    if (el.getAttribute("target") === "_blank") {
      this.customData.options.newTab = true;
    }

    // normalize url
    this.customData.options.url = normalizeUrl(this.customData.options.url);

    // set href if not set
    if (
      isAnkerHTMLElement &&
      (!(el as HTMLAnchorElement).href || !el.getAttribute("href")) &&
      this.customData.options.url
    ) {
      el.setAttribute("href", this.customData.options.url);
      (el as HTMLAnchorElement).href = this.customData.options.url;
    }

    if (!this.customData.options.newTab) {
      this.customData.prefetch.initBinder(el, this.customData.options.url);
    }

    // this.customData.checkURL.call(this, this.customData.options.url);
  },
  unbind(this: Binding, el: HTMLUnknownElement) {
    this.customData.prefetch.deInitBinder(el, this.customData.options.url);
    el.removeEventListener("click", this.customData.onClick);
  },
};
