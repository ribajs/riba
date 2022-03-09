import { Pjax, Prefetch } from "../services";
import { Binder } from "@ribajs/core/src/index.js";
import { isObject, isString } from "@ribajs/utils/src/type.js";
import { onRoute, normalizeUrl, isExternalUrl } from "@ribajs/utils/src/url";
import { RouteOptions } from "../types/route-options";

/**
 * Open link with pajax if the route is not the active route
 */
export class RouteBinder extends Binder<string, HTMLAnchorElement> {
  static key = "route";

  private prefetch?: Prefetch;

  private options: RouteOptions = {
    url: "",
    viewId: "main",
    removeAfterActivation: false,
    newTab: false,
    newTabOnExtern: true,
  };

  private _onClick(event: Event) {
    // console.log(this.options.url);
    const pjax = Pjax.getInstance(this.options.viewId);
    if (onRoute(this.options.url, true)) {
      console.info("already on this site, do nothing");
      event.stopPropagation();
      event.preventDefault();
    } else if (isExternalUrl(this.options.url)) {
      if (!pjax) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      // Is extern
      const newTab = this.options.newTab || this.options.newTabOnExtern;
      pjax.goTo(this.options.url, newTab);
    } else {
      if (this.options.url) {
        if (!pjax) {
          return;
        }
        pjax.onLinkClick(event, this.el, this.options.url, this.options.newTab);
      }
    }
    if (this.options.removeAfterActivation && this.el && this.el.parentNode) {
      // this.unbind(); TODO?
      this.el.parentNode.removeChild(this.el);
    }
  }

  private onClick = this._onClick.bind(this);

  bind(el: HTMLAnchorElement) {
    el.classList.add("route");
    if (window.ssr) {
      return;
    }
    this.onClick = this.onClick.bind(this);
    el.addEventListener("click", this.onClick);
  }

  routine(el: HTMLAnchorElement, optionsOrUrl?: string | RouteOptions) {
    if (isString(optionsOrUrl)) {
      this.options.url = optionsOrUrl as string;
    } else if (isObject(optionsOrUrl as RouteOptions)) {
      this.options = optionsOrUrl as RouteOptions;
    }
    this.options.viewId = this.options.viewId || "main";
    this.prefetch = new Prefetch(this.options.viewId);

    this.options.newTab = false;
    const isAnchorHTMLElement = el.tagName === "A";

    if (!this.options.url && isAnchorHTMLElement) {
      const url = el.getAttribute("href");
      if (url) {
        this.options.url = url;
      }
    }

    if (el.getAttribute("target") === "_blank") {
      this.options.newTab = true;
    }

    // normalize url
    this.options.url = normalizeUrl(this.options.url).url;

    // set href if not set
    if (
      isAnchorHTMLElement &&
      (!(el as HTMLAnchorElement).href || !el.getAttribute("href")) &&
      this.options.url
    ) {
      el.setAttribute("href", this.options.url);
      (el as HTMLAnchorElement).href = this.options.url;
    }

    if (!this.options.newTab) {
      this.prefetch.initBinder(el, this.options.url);
    }
    // this.checkURL.call(this, this.options.url);
  }

  unbind(el: HTMLAnchorElement) {
    this.prefetch?.deInitBinder(el, this.options.url);
    el.removeEventListener("click", this.onClick);
  }
}
