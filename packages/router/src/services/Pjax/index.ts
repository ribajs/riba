export * from "./Dom";
export * from "./Prefetch";

import { getDataset } from "@ribajs/core";
import { EventDispatcher, HttpService, HttpServiceOptions } from "@ribajs/core";
import {
  cleanLink,
  getPort,
  normalizeUrl,
  getUrl,
} from "@ribajs/utils/src/url";
import { isBoolean } from "@ribajs/utils/src/type";
import { getElementFromEvent } from "@ribajs/utils/src/dom";

import { BaseCache } from "@ribajs/cache";
import { HideShowTransition } from "../Transition";
import { Transition, Response, PjaxOptions } from "../../interfaces";
import { Dom } from "./Dom";
import { HistoryManager } from "@ribajs/history";
import { ROUTE_ERROR_CLASS, IGNORE_CLASS_LINK } from "../../constants";

export interface PjaxInstances {
  [key: string]: Pjax;
}

/**
 * Pjax is a static object with main function
 *
 * @borrows Dom as Dom
 */
class Pjax {
  public static cache = new BaseCache<Promise<Response>>();

  public static getInstance(id = "main"): Pjax | undefined {
    const result = Pjax.instances[id];
    if (!result) {
      console.warn(`No pjax instance for viewId "${id}" found!`);
    }
    return result;
  }

  /**
   * Determine if the link should be followed
   */
  protected static preventCheckUrl(href: string): boolean {
    /**
     * Create fake html element
     */
    const element = document.createElement("a");
    element.setAttribute("href", href);

    if (!element) {
      return false;
    }

    if (!href) {
      return false;
    }

    // Ignore case when a hash is being tacked on the current URL
    if (href.indexOf("#") > -1) {
      return false;
    }

    // In case you're trying to load the same page
    if (cleanLink(href) === cleanLink(location.href)) {
      return false;
    }

    // Check if it's the same domain
    if (
      window.location.protocol !== (element as HTMLAnchorElement).protocol ||
      window.location.hostname !== (element as HTMLAnchorElement).hostname
    ) {
      return false;
    }

    // Check if the port is the same
    if (getPort() !== getPort((element as HTMLAnchorElement).port)) {
      return false;
    }

    return true;
  }

  /**
   * Determine if the link should be followed
   */
  public static preventCheck(
    evt: Event,
    element: HTMLAnchorElement | HTMLLinkElement,
    href: string
  ): boolean {
    if (!window.history.pushState) {
      return false;
    }

    if (!this.preventCheckUrl(href)) {
      return false;
    }

    // Middle click, cmd click, ctrl click or prefetch load event
    if (
      (evt && (evt as any).which && (evt as any).which > 1) ||
      (evt as any).metaKey ||
      (evt as any).ctrlKey ||
      (evt as any).shiftKey ||
      (evt as any).altKey
    ) {
      return false;
    }

    // Ignore target with _blank target
    if (element.target && element.target === "_blank") {
      return false;
    }

    // Ignore case where there is download attribute
    if (
      element.getAttribute &&
      typeof element.getAttribute("download") === "string"
    ) {
      return false;
    }

    if (element.classList.contains(IGNORE_CLASS_LINK)) {
      return false;
    }

    return true;
  }

  /**
   * Get the .href parameter out of an element
   * and handle special cases (like xlink:href)
   */
  public static getHref(
    el: HTMLAnchorElement | SVGAElement | HTMLLinkElement | HTMLUnknownElement
  ): string | undefined {
    if (!el) {
      return undefined;
    }

    if (el.getAttribute && typeof el.getAttribute("xlink:href") === "string") {
      return el.getAttribute("xlink:href") || undefined;
    }

    if (
      typeof (el as HTMLAnchorElement).href === "string" ||
      (el.hasAttribute && el.hasAttribute("href"))
    ) {
      const href = (el as HTMLAnchorElement).href || el.getAttribute("href");
      if (!href) {
        console.error("href attribute not found for element: ", el);
        throw new Error("href attribute not found!");
      }
      return href;
    }

    return undefined;
  }

  private static instances: PjaxInstances = {};

  public history = new HistoryManager();

  /**
   * Indicate wether or not use the cache
   */
  public cacheEnabled = true;

  /**
   * Indicate if there is an animation in progress
   */
  public transitionProgress = false;

  protected listenAllLinks: boolean;

  protected listenPopstate: boolean;

  protected parseTitle: boolean;

  protected changeBrowserUrl: boolean;

  protected dispatcher: EventDispatcher;

  protected transition?: Transition;

  protected wrapper?: HTMLElement;

  protected viewId = "main";

  protected containerSelector: string;

  /**
   * Finds elements in the head like <link rel="preload" href="..." as="fetch"> add them to the new head (and removes the old)
   */
  protected prefetchLinks: boolean;

  /**
   * Creates an singleton instance of Pjax.
   */
  constructor({
    id,
    wrapper,
    containerSelector = "[data-namespace]",
    listenAllLinks = false,
    listenPopstate = true,
    transition = new HideShowTransition(),
    parseTitle = true,
    changeBrowserUrl = true,
    prefetchLinks = true,
  }: PjaxOptions) {
    if (id) {
      this.viewId = id;
    }

    let instance = this as Pjax;

    this.dispatcher = new EventDispatcher(this.viewId);

    this.listenAllLinks = listenAllLinks;
    this.listenPopstate = listenPopstate;
    this.parseTitle = parseTitle;
    this.changeBrowserUrl = changeBrowserUrl;
    this.containerSelector = containerSelector;
    this.prefetchLinks = prefetchLinks;

    if (Pjax.instances[this.viewId]) {
      instance = Pjax.instances[this.viewId];
    }

    instance.transition = instance.transition || transition;
    instance.wrapper = instance.wrapper || wrapper;
    instance.containerSelector =
      instance.containerSelector || containerSelector;

    instance.listenAllLinks = isBoolean(instance.listenAllLinks)
      ? instance.listenAllLinks
      : listenAllLinks;
    instance.listenPopstate = isBoolean(instance.listenPopstate)
      ? instance.listenPopstate
      : listenPopstate;
    instance.parseTitle = isBoolean(instance.parseTitle)
      ? instance.parseTitle
      : parseTitle;
    instance.changeBrowserUrl = isBoolean(instance.changeBrowserUrl)
      ? instance.changeBrowserUrl
      : changeBrowserUrl;
    instance.prefetchLinks = isBoolean(instance.prefetchLinks)
      ? instance.prefetchLinks
      : prefetchLinks;

    if (instance.wrapper) {
      instance.wrapper.setAttribute("aria-live", "polite");
    }

    Pjax.instances[this.viewId] = instance;
    return Pjax.instances[this.viewId];
  }

  /**
   * Function to be called to start Pjax
   */
  public start() {
    if (this.wrapper) {
      this.init(this.wrapper, this.listenAllLinks, this.listenPopstate);
    } else {
      console.error(`Can't init pjax without wrapper`);
    }
  }

  /**
   * Return the currentURL cleaned
   */
  public getCurrentUrl() {
    return cleanLink(getUrl());
  }

  /**
   * Change the URL with pushstate and trigger the state change
   */
  public goTo(url: string, newTab = false) {
    if (newTab) {
      const win = window.open(url, "_blank");
      if (win) {
        return win.focus();
      }
      return false;
    }

    if (url.indexOf("http") !== 0) {
      if (this.changeBrowserUrl) {
        window.history.pushState(null, "", url);
      }
      return this.onStateChange(undefined, url);
    }

    // fallback
    this.forceGoTo(url);
  }

  /**
   * Return a transition object
   */
  public getTransition(): Transition {
    // User customizable
    return this.transition || new HideShowTransition();
  }

  /**
   * Appends a prefetch link to the head and caches the result
   */
  protected prefetchLinkElement(
    linkElement: HTMLLinkElement,
    head: HTMLHeadElement
  ) {
    const rel = linkElement.getAttribute("rel");
    let href = Pjax.getHref(linkElement);
    if (
      rel === "router-preload" &&
      href &&
      this.cacheEnabled &&
      !linkElement.classList.contains(ROUTE_ERROR_CLASS)
    ) {
      // normalize url, returns the relative url for internal urls and the full url for external urls
      href = normalizeUrl(href);
      const follow = Pjax.preventCheckUrl(href);
      if (follow) {
        // TODO wait for idle because we do not want to block the user
        return this.loadResponseCached(href, true, false).catch((error) => {
          linkElement.classList.add(ROUTE_ERROR_CLASS);
          console.error(error);
        });
      }
    }
    // Append The link elements to the head for native prefetching by the browser
    head.appendChild(linkElement);
  }

  protected removePrefetchLinks(head: HTMLHeadElement) {
    const removePrefetchLinkElements = head.querySelectorAll(
      'link[href][rel="dns-prefetch"], link[href][rel="preconnect"], link[href][rel="prefetch"], link[href][rel="subresource"], link[href][rel="preload"], link[href][rel="router-preload"]'
    ) as NodeListOf<HTMLLinkElement>;
    // Remove the old prefetch link elements
    removePrefetchLinkElements.forEach((linkElement: HTMLLinkElement) => {
      if (linkElement && linkElement.parentNode) {
        linkElement.parentNode.removeChild(linkElement);
      }
    });
  }

  /**
   * Replaces the prefetch links in the head with the new one.
   * The custom link[href][rel="router-preload"] elements will be not readded to the head
   * because we preload them with javascript, the others are preloaded by the browser
   * because it has native support for them and for that they must exist in the head
   * @param prefetchLinks
   */
  protected replacePrefetchLinkElements(
    prefetchLinks: NodeListOf<HTMLLinkElement> | HTMLLinkElement[]
  ) {
    const head = document.head || document.getElementsByTagName("head")[0];
    this.removePrefetchLinks(head);

    prefetchLinks.forEach((linkElement: HTMLLinkElement) => {
      this.prefetchLinkElement(linkElement, head);
    });
  }

  /**
   * Load an url, will start an fetch request or load the response from the cache and returns the container
   * Also puts the container to the DOM and sets the title (if this option is active)
   */
  public async loadCached(url: string): Promise<HTMLElement> {
    const response = this.loadResponseCached(url, false, true);

    return response
      .then((_response) => {
        if (!this.wrapper) {
          throw new Error("[Pjax] you need a wrapper!");
        }
        Dom.putContainer(_response.container, this.wrapper);
        if (this.parseTitle === true && _response.title) {
          document.title = _response.title;
        }
        if (this.prefetchLinks === true && _response.prefetchLinks) {
          this.replacePrefetchLinkElements(_response.prefetchLinks);
        }

        return _response.container;
      })
      .catch((error: any) => {
        console.error(error);
        // Something went wrong (timeout, 404, 505...)
        this.forceGoTo(url);
        throw error;
      });
  }

  /**
   * Load an url, will start an fetch request or load from the cache (and set it to the cache) and will return a `Response` object
   * @param url Url to get from cache or to make the request for
   * @param forceCache Foce to use the browser build in cache, for more information see `force-cache` on https://developer.mozilla.org/en-US/docs/Web/API/Request/cache
   * @param fallback If there is an error, make a normal browser request and reload the page you should not use this on prefetching urls
   */
  public async loadResponseCached(
    url: string,
    forceCache = false,
    fallback = true
  ) {
    if (this.cacheEnabled) {
      const cachedResponse = Pjax.cache.get(url);
      if (cachedResponse && cachedResponse.then) {
        return cachedResponse.then((response) => {
          // console.debug('cachedResponse', response);
          return response;
        });
      }
    }
    const options: HttpServiceOptions = forceCache
      ? { cache: "force-cache" }
      : {};
    const response = HttpService.get(url, undefined, "html", {}, options)
      .then((data: string) => {
        return Dom.parseResponse(
          data,
          this.parseTitle,
          this.containerSelector,
          this.prefetchLinks
        );
      })
      .catch((error) => {
        console.error(error);
        if (fallback) {
          this.forceGoTo(url);
        }
        throw error;
      });
    if (this.cacheEnabled && response) {
      Pjax.cache.set(url, response);
    } else {
      Pjax.cache.reset();
    }
    return response;
  }

  /**
   * Attach the eventlisteners
   */
  protected bindEvents(listenAllLinks: boolean, listenPopstate: boolean) {
    // you can also use the rv-router for this
    if (listenAllLinks) {
      document.addEventListener("click", this.onLinkClickIntern.bind(this));
    }
    if (listenPopstate) {
      window.addEventListener("popstate", this.onStateChange.bind(this));
    }
  }

  /**
   * Force the browser to go to a certain url
   */
  public forceGoTo(url: Location | string) {
    console.warn("forceGoTo", url);
    if (url && (url as Location).href) {
      window.location = url as Location;
    }
    if (typeof url === "string") {
      window.location.href = url;
    }
  }

  protected onLinkClickIntern(evt: Event) {
    let el = getElementFromEvent(evt);

    while (el && !Pjax.getHref(el)) {
      el = el.parentNode as HTMLAnchorElement; // TODO testme
    }

    if (!el || el.nodeName !== "A") {
      return;
    }

    const href = Pjax.getHref(el);

    // Already managed by the rv-route binder
    if (el.classList.contains("route") || el.hasAttribute("rv-route")) {
      return;
    }

    if (!href) {
      throw new Error(
        `Url is not defined, you can't cache the link without the url. Please make shure your element has the href attribute or pass the url directly to this function.`
      );
    }

    // Already managed by the rv-route binder
    if (el.classList.contains("route") || el.hasAttribute("rv-route")) {
      return false;
    }

    return this.onLinkClick(evt, el, href);
  }

  /**
   * Callback called from click event
   */
  public onLinkClick(evt: Event, el: HTMLAnchorElement, href: string) {
    // normalize url, returns the relative url for internal urls and the full url for external urls
    href = normalizeUrl(href);

    if (!href) {
      throw new Error("href is falsy");
    }
    const follow = Pjax.preventCheck(evt, el, href);

    if (follow) {
      evt.stopPropagation();
      evt.preventDefault();

      this.dispatcher.trigger("linkClicked", el, evt);

      this.goTo(href);
    }
  }

  /**
   * Method called after a 'popstate' or from .goTo()
   */
  protected onStateChange(
    event?: Event,
    newUrl: string = this.getCurrentUrl()
  ) {
    // normalize url, returns the relative url for internal urls and the full url for external urls
    newUrl = normalizeUrl(newUrl);
    const oldUrl = normalizeUrl(this.history.currentStatus().url);

    if (this.changeBrowserUrl && oldUrl === newUrl) {
      // console.debug('ignore');
      return false;
    }

    this.history.add(newUrl);

    const oldContainer = Dom.getContainer(document, this.containerSelector);
    const newContainer = this.loadCached(newUrl);

    const transition = this.getTransition();

    this.transitionProgress = true;

    this.dispatcher.trigger(
      "initStateChange",
      this.viewId,
      this.history.currentStatus(),
      this.history.prevStatus()
    );

    const transitionInstance = transition.init(oldContainer, newContainer);

    newContainer.then(this.onNewContainerLoaded.bind(this));

    transitionInstance.then(this.onTransitionEnd.bind(this));
  }

  /**
   * Function called as soon the new container is ready
   */
  protected onNewContainerLoaded(container: HTMLElement) {
    const currentStatus = this.history.currentStatus();

    currentStatus.namespace = Dom.getNamespace(container);

    const dataset = getDataset(container);

    this.dispatcher.trigger(
      "newPageReady",
      this.viewId,
      this.history.currentStatus(),
      this.history.prevStatus(),
      container,
      container.innerHTML,
      dataset,
      false // true if this is the first time newPageReady is tiggered / true on initialisation
    );
  }

  /**
   * Function called as soon the transition is finished
   */
  protected onTransitionEnd() {
    this.transitionProgress = false;

    this.dispatcher.trigger(
      "transitionCompleted",
      this.viewId,
      this.history.currentStatus(),
      this.history.prevStatus()
    );
  }

  /**
   * Init the events
   */
  protected init(
    wrapper: HTMLElement,
    listenAllLinks: boolean,
    listenPopstate: boolean
  ) {
    const initalResponse = Dom.parseInitial(
      this.parseTitle,
      this.containerSelector,
      this.prefetchLinks
    );
    const url = window.location.pathname;
    // Reload the current site with pajax to cache the inital page
    if (this.cacheEnabled) {
      const currentUrl = normalizeUrl(window.location.href);
      if (!Pjax.cache.get(url)) {
        this.loadResponseCached(currentUrl, false, false);
      }
    }

    this.replacePrefetchLinkElements(initalResponse.prefetchLinks);

    this.wrapper = wrapper;

    this.history.add(
      this.getCurrentUrl(),
      Dom.getNamespace(initalResponse.container)
    );

    // Fire for the current view.
    this.dispatcher.trigger(
      "initStateChange",
      this.viewId,
      this.history.currentStatus()
    );

    const dataset = getDataset(initalResponse.container);

    this.dispatcher.trigger(
      "newPageReady",
      this.viewId,
      this.history.currentStatus(),
      {},
      initalResponse.container,
      initalResponse.container.innerHTML,
      dataset,
      true // true if this is the first time newPageReady is tiggered / true on initialisation
    );

    this.dispatcher.trigger(
      "transitionCompleted",
      this.viewId,
      this.history.currentStatus()
    );

    this.bindEvents(listenAllLinks, listenPopstate);
  }
}

export { Pjax };
