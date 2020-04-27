export * from './Dom';
export * from './Prefetch';

import { getDataset } from '@ribajs/core';
import { EventDispatcher, Utils, HttpService, HttpServiceOptions } from '@ribajs/core';

import { BaseCache } from '@ribajs/cache';
import { HideShowTransition } from '../Transition';
import { Transition, Response, PjaxOptions } from '../../interfaces';
import { Dom } from './Dom';
import { HistoryManager } from '@ribajs/history';

export interface PjaxInstances {
  [key: string]: Pjax;
}

/**
 * Pjax is a static object with main function
 *
 * @borrows Dom as Dom
 */
class Pjax {

  /**
   * Class name used to ignore links
   */
  public static ignoreClassLink = 'no-barba';

  public static cache = new BaseCache<Promise<Response>>();

  public static getInstance(id = 'main'): Pjax | undefined {
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
    const element = document.createElement('a');
    element.setAttribute('href', href);

    if (!element) {
      return false;
    }

    if (!href) {
      return false;
    }

    // Ignore case when a hash is being tacked on the current URL
    if (href.indexOf('#') > -1) {
      return false;
    }

    // In case you're trying to load the same page
    if (Utils.cleanLink(href) === Utils.cleanLink(location.href)) {
      return false;
    }

    // Check if it's the same domain
    if (window.location.protocol !== (element as HTMLAnchorElement).protocol || window.location.hostname !== (element as HTMLAnchorElement).hostname) {
      return false;
    }

    // Check if the port is the same
    if (Utils.getPort() !== Utils.getPort((element as HTMLAnchorElement).port)) {
      return false;
    }


    return true;
  }

  /**
   * Determine if the link should be followed
   */
  public static preventCheck(evt: Event, element: HTMLAnchorElement | HTMLLinkElement, href: string): boolean {
    if (!window.history.pushState) {
      return false;
    }

    if (!this.preventCheckUrl(href)) {
      return false
    }

    // Middle click, cmd click, ctrl click or prefetch load event
    if ((evt && ((evt as any).which && (evt as any).which > 1) || (evt as any).metaKey || (evt as any).ctrlKey || (evt as any).shiftKey || (evt as any).altKey)) {
      return false;
    }

    // Ignore target with _blank target
    if (element.target && element.target === '_blank') {
      return false;
    }

    // Ignore case where there is download attribute
    if (element.getAttribute && typeof element.getAttribute('download') === 'string') {
      return false;
    }

    if (element.classList.contains(this.ignoreClassLink)) {
      return false;
    }

    return true;
  }

  /**
   * Get the .href parameter out of an element
   * and handle special cases (like xlink:href)
   */
  public static getHref(el: HTMLAnchorElement | SVGAElement | HTMLLinkElement | HTMLUnknownElement): string | undefined {
    if (!el) {
      return undefined;
    }

    if (el.getAttribute && typeof el.getAttribute('xlink:href') === 'string') {
      return el.getAttribute('xlink:href') || undefined;
    }

    if (typeof((el as HTMLAnchorElement).href) === 'string' || (el.hasAttribute && el.hasAttribute('href'))) {
      const href = (el as HTMLAnchorElement).href || el.getAttribute('href');
      if (!href) {
        throw new Error('href attribute not found!');
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

  protected viewId = 'main';

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
    containerSelector = '[data-namespace]',
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
    instance.containerSelector = instance.containerSelector || containerSelector;

    instance.listenAllLinks = Utils.isBoolean(instance.listenAllLinks) ? instance.listenAllLinks : listenAllLinks;
    instance.listenPopstate = Utils.isBoolean(instance.listenPopstate) ? instance.listenPopstate : listenPopstate;
    instance.parseTitle = Utils.isBoolean(instance.parseTitle) ? instance.parseTitle : parseTitle;
    instance.changeBrowserUrl = Utils.isBoolean(instance.changeBrowserUrl) ? instance.changeBrowserUrl : changeBrowserUrl;
    instance.prefetchLinks = Utils.isBoolean(instance.prefetchLinks) ? instance.prefetchLinks : prefetchLinks;

    if (instance.wrapper) {
      instance.wrapper.setAttribute('aria-live', 'polite');
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
    return Utils.cleanLink(
      Utils.getUrl(),
    );
  }

  /**
   * Change the URL with pushstate and trigger the state change
   */
  public goTo(url: string, newTab = false) {
    if (newTab) {
      const win = window.open(url, '_blank');
      if (win) {
        return win.focus();
      }
      return false;
    }

    if (url.indexOf('http') !== 0) {
      if (this.changeBrowserUrl) {
        window.history.pushState(null, '', url);
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
  protected prefetchLink(linkElement: HTMLLinkElement, head: HTMLHeadElement) {
    const rel = linkElement.getAttribute('rel');
    let href = Pjax.getHref(linkElement);
    if (rel === 'router-preload' && href && this.cacheEnabled) {
      // normalize url, returns the relative url for internal urls and the full url for external urls
      href = Utils.normalizeUrl(href)
      const follow = Pjax.preventCheckUrl(href);
      const cachedResponse = Pjax.cache.get(href);
      if (follow) {
        // Only append if not already cached
        if (cachedResponse) {
          return cachedResponse;
        }
        // TODO wait for idle because we do not want to block the user
        return this.loadResponse(href, true);
      }
    }
    // Append other types linke images
    head.appendChild(linkElement);
  }

 /**
  * Load an url, will start an fetch request or load from the cache will return the Container
  * Also puts the container to the DOM and sets the title (if this option is active)
  */
  public async load(url: string): Promise<HTMLElement> {
    const response = this.loadResponse(url);

    return response
    .then((_response) => {
      // console.debug('_response', _response);
      if (!this.wrapper) {
        throw new Error('[Pjax] you need a wrapper!');
      }
      Dom.putContainer(_response.container, this.wrapper);
      if (this.parseTitle === true && _response.title) {
        document.title = _response.title;
      }
      if (this.prefetchLinks === true && _response.prefetchLinks) {
        document.title = _response.title;
        const head = document.getElementsByTagName('head')[0];
        const oldPrefetchLinkElements = head.querySelectorAll('link[href][rel="dns-prefetch"], link[href][rel="preconnect"], link[href][rel="prefetch"], link[href][rel="subresource"], link[href][rel="preload"], link[href][rel="router-preload"]') as NodeListOf<HTMLLinkElement>;
        // Remove the old prefetch link elements
        oldPrefetchLinkElements.forEach((linkElement: HTMLLinkElement) => {
          if (linkElement && linkElement.parentNode) {
            linkElement.parentNode.removeChild(linkElement);
          }
        });
        // Append the new prefetch link elements
        _response.prefetchLinks.forEach((linkElement: HTMLLinkElement) => {
          this.prefetchLink(linkElement, head);
        });
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
  * Load an url, will start an fetch request or load from the cache (and set it to the cache) and will return a `Response` pbject
  */
  public async loadResponse(url: string, forceCache = false ) {
    let response = Pjax.cache.get(url);

    if (!response || !response.then) {
      const options: HttpServiceOptions = forceCache ? { cache: 'force-cache'} : {};
      response = HttpService.get(url, undefined, 'html', {}, options)
      .then((data: string) => {
        return Dom.parseResponse(data, this.parseTitle, this.containerSelector, this.prefetchLinks);
      });
      if (this.cacheEnabled && response) {
        Pjax.cache.set(url, response);
      } else {
        Pjax.cache.reset();
      }
    }
    return response;
  }

 /**
  * Attach the eventlisteners
  */
 protected bindEvents(listenAllLinks: boolean, listenPopstate: boolean) {
    // you can also use the rv-router for this
    if (listenAllLinks) {
      document.addEventListener('click',
        this.onLinkClickIntern.bind(this),
      );
    }

    if (listenPopstate) {
      window.addEventListener('popstate',
        this.onStateChange.bind(this),
      );
    }
  }

 /**
  * Force the browser to go to a certain url
  */
  protected forceGoTo(url: Location | string) {
    console.warn('forceGoTo', url);
    if (url && (url as Location).href) {
      window.location = url as Location;
    }
    if (typeof url === 'string') {
      window.location.href = url;
    }
  }

  protected onLinkClickIntern(evt: Event) {

    let el = Utils.getElementFromEvent(evt);
 
    while (el && !Pjax.getHref(el)) {
      el = (el.parentNode as HTMLAnchorElement); // TODO testme
    }

    const href = Pjax.getHref(el);

    if (!href) {
      throw new Error(`Url is not defined, you can't cache the link without the url. Please make shure your element has the href attribute or pass the url directly to this function.`);
    }
    
    // Already managed by the rv-route binder
    if (el.classList.contains('route') || el.hasAttribute('rv-route')) {
      return false;
    }

    return this.onLinkClick(evt, el, href);

  }

 /**
  * Callback called from click event
  */
  public onLinkClick(evt: Event, el: HTMLAnchorElement, href: string) {

    // normalize url, returns the relative url for internal urls and the full url for external urls
    href = Utils.normalizeUrl(href)

    if (!href) {
      throw new Error('href is falsy');
    }
    const follow = Pjax.preventCheck(evt, el, href);

    if (follow) {
      evt.stopPropagation();
      evt.preventDefault();

      this.dispatcher.trigger('linkClicked', el, evt);

      this.goTo(href);
    }
  }

 /**
  * Method called after a 'popstate' or from .goTo()
  */
 protected onStateChange(event?: Event, newUrl: string = this.getCurrentUrl()) {

    if (this.changeBrowserUrl && this.history.currentStatus().url === newUrl) {
      return false;
    }

    // normalize url, returns the relative url for internal urls and the full url for external urls
    newUrl = Utils.normalizeUrl(newUrl);

    this.history.add(newUrl);

    const oldContainer = Dom.getContainer(document, this.containerSelector);
    const newContainer = this.load(newUrl);

    const transition = this.getTransition();

    this.transitionProgress = true;

    this.dispatcher.trigger('initStateChange',
      this.viewId,
      this.history.currentStatus(),
      this.history.prevStatus(),
    );

    const transitionInstance = transition.init(
      oldContainer,
      newContainer,
    );

    newContainer.then(
      this.onNewContainerLoaded.bind(this),
    );

    transitionInstance.then(
      this.onTransitionEnd.bind(this),
    );
  }

 /**
  * Function called as soon the new container is ready
  */
 protected onNewContainerLoaded(container: HTMLElement) {
    const currentStatus = this.history.currentStatus();

    currentStatus.namespace = Dom.getNamespace(container);

    const dataset = getDataset(container);

    this.dispatcher.trigger('newPageReady',
      this.viewId,
      this.history.currentStatus(),
      this.history.prevStatus(),
      container,
      container.innerHTML,
      dataset,
      false, // true if this is the first time newPageReady is tiggered / true on initialisation
    );
  }

 /**
  * Function called as soon the transition is finished
  */
  protected onTransitionEnd() {
    this.transitionProgress = false;

    this.dispatcher.trigger('transitionCompleted',
      this.viewId,
      this.history.currentStatus(),
      this.history.prevStatus(),
    );
  }

  /**
   * Init the events
   */
  protected init(wrapper: HTMLElement, listenAllLinks: boolean, listenPopstate: boolean) {

    const initalResponse = Dom.parseInitial(this.parseTitle, this.containerSelector, this.prefetchLinks);
    const url = window.location.pathname;
    if (this.cacheEnabled) {
      Pjax.cache.set(url, Promise.resolve(initalResponse));
    }

    // const container = Dom.getContainer(document.body, this.containerSelector);
    const head = document.getElementsByTagName('head')[0];

    initalResponse.prefetchLinks.forEach((linkElement: HTMLLinkElement) => {
      this.prefetchLink(linkElement, head);
    });

    this.wrapper = wrapper;

    this.history.add(
      this.getCurrentUrl(),
      Dom.getNamespace(initalResponse.container),
    );

    // Fire for the current view.
    this.dispatcher.trigger('initStateChange',
      this.viewId,
      this.history.currentStatus(),
    );

    const dataset = getDataset(initalResponse.container);

    this.dispatcher.trigger('newPageReady',
      this.viewId,
      this.history.currentStatus(),
      {},
      initalResponse.container,
      initalResponse.container.innerHTML,
      dataset,
      true, // true if this is the first time newPageReady is tiggered / true on initialisation
    );

    this.dispatcher.trigger('transitionCompleted',
      this.viewId,
      this.history.currentStatus(),
    );

    this.bindEvents(listenAllLinks, listenPopstate);
  }
}

export { Pjax };
