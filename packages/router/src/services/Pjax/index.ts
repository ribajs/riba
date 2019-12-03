export * from './HistoryManager';
export * from './Dom';
export * from './Prefetch';

import { EventDispatcher, Utils, HttpService } from '@ribajs/core';

import { BaseCache } from '../Cache';
import { HideShowTransition } from '../Transition';
import { Transition } from '../../interfaces';
import { Dom } from './Dom';
import { HistoryManager } from './HistoryManager';

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

  public static cache = new BaseCache();

  public static instances: PjaxInstances = {};

  public static getInstance(id: string) {
    const result = Pjax.instances[id];
    if (!result) {
      throw new Error(`No Pjax instance with id ${id} found!`);
    }
    return result;
  }

  /**
   * Determine if the link should be followed
   */
  public static preventCheck(evt: Event, element?: HTMLAnchorElement, href?: string): boolean {
    if (!window.history.pushState) {
      return false;
    }

    /**
     * Get href from element if href is not set
     */
    if (!href && element) {
      href = this.getHref(element);
    }

    /**
     * Create fake html element if element is not set
     */
    if (href && !element) {
      element = document.createElement('a');
      element.setAttribute('href', href);
    }

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

    // Middle click, cmd click and ctrl click
    if ((evt && ((evt as any).which && (evt as any).which > 1) || (evt as any).metaKey || (evt as any).ctrlKey || (evt as any).shiftKey || (evt as any).altKey)) {
      return false;
    }

    // Ignore target with _blank target
    if (element.target && element.target === '_blank') {
      return false;
    }

    // Check if it's the same domain
    if (window.location.protocol !== element.protocol || window.location.hostname !== element.hostname) {
      return false;
    }

    // Check if the port is the same
    if (Utils.getPort() !== Utils.getPort(element.port)) {
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
  public static getHref(el: HTMLAnchorElement | SVGAElement): string | undefined {
    if (!el) {
      return undefined;
    }

    if (el.getAttribute && typeof el.getAttribute('xlink:href') === 'string') {
      return el.getAttribute('xlink:href') || undefined;
    }

    if (typeof(el.href) === 'string') {
      let href =  el.href;

      // normalize url
      if (href && Utils.isAbsoluteUrl(href)) {
        const location = Utils.getLocation();
        const host = location.protocol + '//' + location.hostname;
        // if is not an external link
        if (href.indexOf(host) === 0) {
          // get relative href
          href = href.replace(host, '');
        }
      }
      return href;
    }

    return undefined;
  }

  public dom?: Dom;
  public history = new HistoryManager();

 /**
  * Indicate wether or not use the cache
  */
  public cacheEnabled: boolean = true;

 /**
  * Indicate if there is an animation in progress
  */
  public transitionProgress: boolean = false;

  private listenAllLinks: boolean;

  private listenPopstate: boolean;

  private parseTitle: boolean;

  private changeBrowserUrl: boolean;

  private dispatcher: EventDispatcher;

  private transition?: Transition;

  private wrapper?: HTMLElement;

  private viewId: string;

  /**
   * Creates an singleton instance of Pjax.
   */
  constructor(id: string, wrapper?: HTMLElement, containerSelector = '[data-namespace]', listenAllLinks: boolean = false, listenPopstate: boolean = true, transition: Transition = new HideShowTransition(), parseTitle: boolean = true, changeBrowserUrl: boolean = true, useTemplate: boolean = true) {
    this.viewId = id;

    let instance = this as Pjax;

    this.dispatcher = new EventDispatcher(this.viewId);

    this.listenAllLinks = listenAllLinks;
    this.listenPopstate = listenPopstate;
    this.parseTitle = parseTitle;
    this.changeBrowserUrl = changeBrowserUrl;

    if (Pjax.instances[this.viewId]) {
      instance = Pjax.instances[this.viewId];
    }

    instance.transition = instance.transition || transition;

    instance.wrapper = instance.wrapper || wrapper;

    instance.listenAllLinks = Utils.isBoolean(instance.listenAllLinks) ? instance.listenAllLinks : listenAllLinks;
    instance.listenPopstate = Utils.isBoolean(instance.listenPopstate) ? instance.listenPopstate : listenPopstate;
    instance.parseTitle = Utils.isBoolean(instance.parseTitle) ? instance.parseTitle : parseTitle;
    instance.parseTitle = Utils.isBoolean(instance.parseTitle) ? instance.parseTitle : parseTitle;
    instance.changeBrowserUrl = Utils.isBoolean(instance.changeBrowserUrl) ? instance.changeBrowserUrl : changeBrowserUrl;

    if (instance.wrapper) {
      instance.dom = instance.dom || new Dom(instance.wrapper, containerSelector, this.parseTitle, useTemplate);
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
  * Load an url, will start an fetch request or load from the cache
  */
  public async load(url: string): Promise<HTMLElement> {
    let fetch;

    fetch = Pjax.cache.get(url);

    if (!fetch || !fetch.then) {
      fetch = HttpService.get(url, undefined, 'html');
      Pjax.cache.set(url, fetch);
    }

    return fetch
    .then((data: string) => {
      if (!this.dom) {
        throw new Error('[Pjax] you need to call the start method first!');
      }

      const container = this.dom.parseResponse(data);
      this.dom.putContainer(container);

      if (!this.cacheEnabled) {
        Pjax.cache.reset();
      }

      return container;
    })
    .catch((error: any) => {
      console.error(error);
      // Something went wrong (timeout, 404, 505...)
      this.forceGoTo(url);
      throw error;
    });
  }

 /**
  * Attach the eventlisteners
  */
 protected bindEvents(listenAllLinks: boolean, listenPopstate: boolean) {
    // you can also use the rv-router for this
    if (listenAllLinks) {
      document.addEventListener('click',
        this.onLinkClick.bind(this),
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
   console.debug('forceGoTo', url);
   if (url && (url as Location).href) {
    window.location = url as Location;
   }
   if (typeof url === 'string') {
    window.location.href = url;
   }
  }

 /**
  * Callback called from click event
  */
 protected onLinkClick(evt: Event) {
    let el: HTMLAnchorElement = ((evt as Event).target as HTMLAnchorElement );

    // Go up in the nodelist until we
    // find something with an href
    while (el && !Pjax.getHref(el)) {
      el = (el.parentNode as HTMLAnchorElement);
    }

    const href = Pjax.getHref(el);

    if (Pjax.preventCheck(evt, el, href)) {
      evt.stopPropagation();
      evt.preventDefault();

      this.dispatcher.trigger('linkClicked', el, evt);

      if (!href) {
        throw new Error('href is null');
      }

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

    this.history.add(newUrl);

    const newContainer = this.load(newUrl);

    const transition = this.getTransition();

    this.transitionProgress = true;

    this.dispatcher.trigger('initStateChange',
      this.viewId,
      this.history.currentStatus(),
      this.history.prevStatus(),
    );

    if (!this.dom) {
      throw new Error('[Pjax] you need to call the start method first!');
    }

    const transitionInstance = transition.init(
      this.dom.getContainer(document.body),
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

    if (!this.dom) {
      throw new Error('[Pjax] you need to call the start method first!');
    }

    currentStatus.namespace = this.dom.getNamespace(container);

    this.dispatcher.trigger('newPageReady',
      this.viewId,
      this.history.currentStatus(),
      this.history.prevStatus(),
      container,
      this.dom.currentHTML,
      container.dataset,
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
    if (!this.dom) {
      throw new Error('[Pjax] you need to call the start method first!');
    }
    const container = this.dom.getContainer(document.body);

    this.wrapper = wrapper;

    this.history.add(
      this.getCurrentUrl(),
      this.dom.getNamespace(container),
    );

    // Fire for the current view.
    this.dispatcher.trigger('initStateChange',
      this.viewId,
      this.history.currentStatus(),
    );

    this.dispatcher.trigger('newPageReady',
      this.viewId,
      this.history.currentStatus(),
      {},
      container,
      this.dom.currentHTML,
      container.dataset,
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
