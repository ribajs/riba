export * from "./Dom";
export * from "./Prefetch";

import { EventDispatcher } from "@ribajs/events";
import { HttpService, HttpServiceOptions } from "@ribajs/core";
import {
  cleanLink,
  getPort,
  normalizeUrl,
  getUrl,
  isBoolean,
  getElementFromEvent,
  getDataset,
  scrollTo,
} from "@ribajs/utils";

import { BaseCache } from "@ribajs/cache";
import { HideShowTransition } from "../Transition";
import { Transition, Response, PjaxOptions } from "../../types";
import { Dom } from "./Dom";
import { HistoryManager } from "@ribajs/history";
import { ROUTE_ERROR_CLASS, IGNORE_CLASS_LINK } from "../../constants";
import { RouterService } from "../../services";

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
      console.warn(
        `[Pjax.getInstance] No pjax instance for viewId "${id}" found!`
      );
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
    url: string,
    element?: HTMLAnchorElement | HTMLLinkElement | HTMLUnknownElement,
    evt?: Event
  ): boolean {
    if (!window.history.pushState) {
      return false;
    }

    if (!this.preventCheckUrl(url)) {
      return false;
    }

    if (evt) {
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
    }

    if (element) {
      // Ignore target with _blank target
      if (
        (element as HTMLAnchorElement).target &&
        (element as HTMLAnchorElement).target === "_blank"
      ) {
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

  protected scrollToAnchorOffset: number;

  /**
   * Creates an singleton instance of Pjax.
   */
  constructor({
    id,
    action = "replace",
    wrapper,
    containerSelector = "[data-namespace]",
    listenAllLinks = false,
    listenPopstate = true,
    parseTitle = true,
    changeBrowserUrl = true,
    prefetchLinks = true,
    scrollToTop = true,
    scrollToAnchorOffset = RouterService.options.scrollToAnchorOffset,
  }: PjaxOptions) {
    if (id) {
      this.viewId = id;
    }

    let instance = this as Pjax;

    this.scrollToAnchorOffset = scrollToAnchorOffset || 0;

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

    instance.transition =
      instance.transition || new HideShowTransition(action, scrollToTop);
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
   * USe this if you have a view component
   */
  public setActiveWrapper(wrapper: HTMLElement) {
    this.wrapper = wrapper;
  }

  /**
   * Function to be called to start Pjax
   */
  public start() {
    if (this.wrapper) {
      try {
        this.init(this.wrapper, this.listenAllLinks, this.listenPopstate);
      } catch (error) {
        console.error(error);
      }
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
   * Change the URL with push state and trigger the state change
   */
  public goTo(url: string, newTab = false) {
    if (newTab) {
      const win = window.open(url, "_blank");
      if (win) {
        return win.focus();
      }
      return false;
    }

    if (!url.startsWith("http")) {
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

  public prefetchLink(href: string) {
    href = normalizeUrl(href).url;
    const follow = Pjax.preventCheckUrl(href);
    if (follow) {
      return this.loadResponseCached(href, true, false);
    }
  }

  /**
   * Appends a prefetch link to the head and caches the result
   */
  protected prefetchLinkElement(
    linkElement: HTMLLinkElement,
    head: HTMLHeadElement
  ) {
    const rel = linkElement.getAttribute("rel");
    const href = Pjax.getHref(linkElement);
    if (
      rel === "router-preload" &&
      href &&
      this.cacheEnabled &&
      !linkElement.classList.contains(ROUTE_ERROR_CLASS)
    ) {
      try {
        this.prefetchLink(href);
      } catch (error) {
        linkElement.classList.add(ROUTE_ERROR_CLASS);
        console.error(error);
      }
    }
    // Append The link elements to the head for native prefetch by the browser
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
   * The custom link[href][rel="router-preload"] elements will be not readd to the head
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
    try {
      const { responsePromise } = await this.loadResponseCached(
        url,
        false,
        true
      );
      if (!this.wrapper) {
        throw new Error("[Pjax] you need a wrapper!");
      }
      const response = await responsePromise;
      Dom.putContainer(response.container, this.wrapper);
      if (this.parseTitle === true && response.title) {
        document.title = response.title;
      }
      if (this.prefetchLinks === true && response.prefetchLinks) {
        this.replacePrefetchLinkElements(response.prefetchLinks);
      }

      return response.container;
    } catch (error) {
      console.error(error);
      // Something went wrong (timeout, 404, 505...)
      this.forceGoTo(url);
      throw error;
    }
  }

  /**
   * Load an url, will start an fetch request or load from the cache (and set it to the cache) and will return a `Response` object
   * @param url Url to get from cache or to make the request for
   * @param forceCache Force to use the browser build in cache, for more information see `force-cache` on https://developer.mozilla.org/en-US/docs/Web/API/Request/cache
   * @param fallback If there is an error, make a normal browser request and reload the page you should not use this on prefetch urls
   */
  public async loadResponseCached(
    url: string,
    forceCache = false,
    fallback = true
  ) {
    let responsePromise: Promise<Response> | undefined;
    try {
      if (this.cacheEnabled) {
        responsePromise = Pjax.cache.get(url);
        if (responsePromise) {
          return {
            fromCache: true,
            responsePromise,
          };
        }
      }
      responsePromise = this.loadResponse(url, forceCache);
      if (this.cacheEnabled && responsePromise) {
        Pjax.cache.set(url, responsePromise);
      } else {
        // Pjax.cache.reset();
      }
    } catch (error) {
      console.error(error);
      if (fallback) {
        this.forceGoTo(url);
      }
      throw error;
    }

    return {
      fromCache: false,
      responsePromise,
    };
  }

  /**
   * Load an url, will start an fetch request and will return a `Response` object
   * @param url Url to get from cache or to make the request for
   * @param forceCache Force to use the browser build in cache, for more information see `force-cache` on https://developer.mozilla.org/en-US/docs/Web/API/Request/cache
   */
  public async loadResponse(url: string, forceCache = false) {
    const options: HttpServiceOptions = forceCache
      ? { cache: "force-cache" }
      : {};
    const data = await HttpService.get<string>(
      url,
      undefined,
      "html",
      {},
      options
    );
    if (!data || !data.body) {
      throw new Error("No body!");
    }
    const response = Dom.parseResponse(
      data.body,
      this.parseTitle,
      this.containerSelector,
      this.prefetchLinks
    );
    return response;
  }

  /**
   * Attach the event listeners
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
      el = el.parentNode as HTMLAnchorElement; // TODO test me
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
        `Url is not defined, you can't cache the link without the url. Please make sure your element has the href attribute or pass the url directly to this function.`
      );
    }

    // Already managed by the rv-route binder
    if (el.classList.contains("route") || el.hasAttribute("rv-route")) {
      return false;
    }

    return this.onLinkClick(evt, el as HTMLAnchorElement, href);
  }

  /**
   * Callback called from click event
   */
  public onLinkClick(
    evt: Event,
    el: HTMLAnchorElement,
    href: string,
    newTab = false
  ) {
    // normalize url, returns the relative url for internal urls and the full url for external urls
    const { url, location } = normalizeUrl(href);

    const { location: currLocation } = normalizeUrl();

    // Is this a local scroll link to an title anchor?
    if (location.hash && currLocation.pathname === location.pathname) {
      let id = location.hash.slice(1);
      id = decodeURI(id); // Workaround for markdown generated ids with umlauts
      const scrollToElement = document.getElementById(id);
      if (scrollToElement) {
        evt.stopPropagation();
        evt.preventDefault();
        if (this.changeBrowserUrl) {
          window.history.pushState(null, "", url);
        }
        return scrollTo(scrollToElement, this.scrollToAnchorOffset);
      }
    }

    if (!url) {
      throw new Error("url is falsy");
    }
    const follow = Pjax.preventCheck(url, el, evt);

    if (follow) {
      evt.stopPropagation();
      evt.preventDefault();

      this.dispatcher.trigger("linkClicked", el, evt);

      this.goTo(url, newTab);
    }
  }

  /**
   * Method called after a 'popstate' or from .goTo()
   */
  protected async onStateChange(
    event?: Event,
    newUrl: string = this.getCurrentUrl()
  ) {
    // normalize url, returns the relative url for internal urls and the full url for external urls
    newUrl = normalizeUrl(newUrl).url;
    const oldUrl = normalizeUrl(this.history.currentStatus().url).url;

    if (this.changeBrowserUrl && oldUrl === newUrl) {
      return false;
    }

    this.history.add(newUrl);

    this.dispatcher.trigger(
      "initStateChange",
      this.viewId,
      this.history.currentStatus(),
      this.history.prevStatus()
    );

    const oldContainer = Dom.getContainer(document, this.containerSelector);
    const newContainerPromise = this.loadCached(newUrl);

    const transition = this.getTransition();

    this.transitionProgress = true;

    const transitionResult = transition.init(oldContainer, newContainerPromise);

    this.onNewContainerLoaded(await newContainerPromise);

    await transitionResult;
    this.onTransitionEnd();
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
      false // true if this is the first time newPageReady is triggered / true on initialization
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
    const initialResponse = Dom.parseInitial(
      this.parseTitle,
      this.containerSelector,
      this.prefetchLinks
    );
    const url = window.location.pathname;
    // Reload the current site with pjax to cache the initial page
    if (this.cacheEnabled) {
      const currentUrl = normalizeUrl(window.location.href).url;
      if (!Pjax.cache.get(url)) {
        this.loadResponseCached(currentUrl, false, false);
      }
    }

    this.replacePrefetchLinkElements(initialResponse.prefetchLinks);

    this.wrapper = wrapper;

    this.history.add(
      this.getCurrentUrl(),
      Dom.getNamespace(initialResponse.container)
    );

    // Fire for the current view.
    this.dispatcher.trigger(
      "initStateChange",
      this.viewId,
      this.history.currentStatus()
    );

    const dataset = getDataset(initialResponse.container);

    this.dispatcher.trigger(
      "newPageReady",
      this.viewId,
      this.history.currentStatus(),
      {},
      initialResponse.container,
      initialResponse.container.innerHTML,
      dataset,
      true // true if this is the first time newPageReady is triggered / true on initialization
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
