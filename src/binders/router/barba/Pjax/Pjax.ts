export * from './HistoryManager';
export * from './Dom';
export * from './Prefetch';

import Debug from 'debug';

import { GlobalEvent } from '../../../../global-event';
import { Utils } from '../../../../utils';
import { BaseCache } from '../Cache';
import { HideShowTransition, ITransition } from '../Transition/Transition';
import { Dom } from './Dom';
import { HistoryManager } from './HistoryManager';

export interface IPjaxInstances {
  [key: string]: Pjax;
}

/**
 * Pjax is a static object with main function
 *
 * @namespace Barba.Pjax
 * @borrows Dom as Dom
 * @type {object}
 */
class Pjax {

  /**
   * Class name used to ignore links
   *
   * @memberOf Barba.Pjax
   * @type {string}
   * @default
   */
  public static ignoreClassLink = 'no-barba';

  public static cache = new BaseCache();

  public static instances: IPjaxInstances = {};

  /**
   * Determine if the link should be followed
   *
   * @memberOf Barba.Pjax
   * @param  {MouseEvent} evt
   * @param  {HTMLAnchorElement} element
   * @return {boolean}
   */
  public static preventCheck(evt: JQuery.Event<HTMLElement, null>, element: HTMLAnchorElement): boolean {
    if (!window.history.pushState) {
      return false;
    }

    const href = this.getHref(element);

    // User
    if (!element || !href) {
      return false;
    }

    // Middle click, cmd click, and ctrl click
    if (evt.which > 1 || evt.metaKey || evt.ctrlKey || evt.shiftKey || evt.altKey) {
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

    // Ignore case when a hash is being tacked on the current URL
    if (href.indexOf('#') > -1) {
      return false;
    }

    // Ignore case where there is download attribute
    if (element.getAttribute && typeof element.getAttribute('download') === 'string') {
      return false;
    }

    // Ignore case if router binder manages the link TODO use tinybind prefix
    if (element.getAttribute && typeof element.hasAttribute('rv-route')) {
      return false;
    }

    if (element.classList.contains(this.ignoreClassLink)) {
      return false;
    }

    if (element.classList.contains(this.ignoreClassLink)) {
      return false;
    }

    // In case you're trying to load the same page
    if (Utils.cleanLink(href) === Utils.cleanLink(location.href)) {
      return false;
    }

    return true;
  }

  /**
   * Get the .href parameter out of an element
   * and handle special cases (like xlink:href)
   *
   * @memberOf Barba.Pjax
   * @param  {HTMLAnchorElement} el
   * @return {string} href
   */
  public static getHref(el: HTMLAnchorElement | SVGAElement): string | undefined {
    if (!el) {
      // console.warn('No element to get href from');
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
  *
  * @memberOf Barba.Pjax
  * @type {boolean}
  * @default
  */
  public cacheEnabled: boolean = true;

 /**
  * Indicate if there is an animation in progress
  *
  * @memberOf Barba.Pjax
  * @readOnly
  * @type {boolean}
  */
  public transitionProgress: boolean = false;

  private listenAllLinks: boolean;

  private parseTitle: boolean ;

  private dispatcher = new GlobalEvent();

  private transition: ITransition = new HideShowTransition();

  private debug = Debug('router:Pjax');

  /**
   * Creates an singleton instance of Pjax.
   */
  constructor(id: string, $wrapper?: JQuery<HTMLElement>, listenAllLinks: boolean = false, transition?: ITransition, parseTitle = false) {
    this.debug('constructor');

    this.listenAllLinks = listenAllLinks;
    this.parseTitle = parseTitle;

    if ($wrapper) {
      this.dom = new Dom($wrapper, this.parseTitle);
    }

    if (transition) {
      this.transition = transition;
    }

    if (Pjax.instances[id]) {
      return Pjax.instances[id];
    }

    Pjax.instances[id] = this;
  }

 /**
  * Function to be called to start Pjax
  *
  * @memberOf Barba.Pjax
  */
  public start($wrapper: JQuery<HTMLElement>, listenAllLinks: boolean, transition?: ITransition) {

    this.dom = new Dom($wrapper, this.parseTitle);
    if (transition) {
      this.transition = transition;
    }
    this.init($wrapper, listenAllLinks);
  }

 /**
  * Return the currentURL cleaned
  *
  * @memberOf Barba.Pjax
  * @return {string} currentUrl
  */
  public getCurrentUrl() {
    return Utils.cleanLink(
      Utils.getUrl(),
    );
  }

  /**
   * Change the URL with pushstate and trigger the state change
   *
   * @memberOf Barba.Pjax
   * @param {string} newUrl
   */
  public goTo(url: string, newTab = false) {
    this.debug('goTo', url, newTab);
    if (newTab) {
      const win = window.open(url, '_blank');
      if (win) {
        return win.focus();
      }
      return false;
    }

    if (url.indexOf('http') !== 0) {
      window.history.pushState(null, undefined, url);
      return this.onStateChange();
    }

    // fallback
    this.forceGoTo(url);
  }

 /**
  * Return a transition object
  *
  * @memberOf Barba.Pjax
  * @return {Barba.Transition} Transition object
  */
  public getTransition(): ITransition {
    // User customizable
    return this.transition;
  }

 /**
  * Load an url, will start an xhr request or load from the cache
  *
  * @memberOf Barba.Pjax
  * @protected
  * @param  {string} url
  * @return {Promise<JQuery<HTMLElement>>}
  */
  public load(url: string): Promise<JQuery<HTMLElement>> {
    const deferred = Utils.deferred();
    const self = this;
    let xhr;

    xhr = Pjax.cache.get(url);

    if (!xhr) {
      xhr = Utils.xhr(url);
      Pjax.cache.set(url, xhr);
    }

    xhr.then((data: string) => {

        if (!self.dom) {
          throw new Error('[Pjax] you need to call the start method first!');
        }

        const $container = self.dom.parseResponse(data);

        self.dom.putContainer($container);

        if (!self.cacheEnabled) {
          Pjax.cache.reset();
        }

        deferred.resolve($container);
      }, () => {
        // Something went wrong (timeout, 404, 505...)
        self.forceGoTo(url);

        deferred.reject();
      },
    );

    return deferred.promise;
  }

 /**
  * Attach the eventlisteners
  *
  * @memberOf Barba.Pjax
  * @protected
  */
 protected bindEvents(listenAllLinks: boolean) {
    // you can also use the rv-router for this
    if (listenAllLinks) {
      document.addEventListener('click',
        this.onLinkClick.bind(this),
      );
    }

    window.addEventListener('popstate',
      this.onStateChange.bind(this),
    );
  }

 /**
  * Force the browser to go to a certain url
  *
  * @memberOf Barba.Pjax
  * @param {Location} url
  * @private
  */
 protected forceGoTo(url: Location | string) {
   if (url instanceof Location) {
    window.location = url;
   }
   if (typeof url === 'string') {
    window.location.href = url;
   }
  }

 /**
  * Callback called from click event
  *
  * @memberOf Barba.Pjax
  * @protected
  * @param {MouseEvent} evt
  */
 protected onLinkClick(evt: JQuery.Event<HTMLElement, null>) {
    let el: HTMLAnchorElement = (evt.target as HTMLAnchorElement );

    // Go up in the nodelist until we
    // find something with an href
    while (el && !Pjax.getHref(el)) {
      el = (el.parentNode as HTMLAnchorElement);
    }

    if (Pjax.preventCheck(evt, el)) {
      evt.stopPropagation();
      evt.preventDefault();

      this.dispatcher.trigger('linkClicked', el, evt);

      const href = Pjax.getHref(el);
      if (!href) {
        throw new Error('href is null');
      }

      this.goTo(href);
    }
  }

 /**
  * Method called after a 'popstate' or from .goTo()
  *
  * @memberOf Barba.Pjax
  * @protected
  */
 protected onStateChange() {
    const newUrl = this.getCurrentUrl();

    if (this.transitionProgress) {
      this.forceGoTo(newUrl);
    }

    if (this.history.currentStatus().url === newUrl) {
      return false;
    }

    this.history.add(newUrl);

    const $newContainer = this.load(newUrl);

    const transition = this.getTransition();

    this.transitionProgress = true;

    this.dispatcher.trigger('initStateChange',
      this.history.currentStatus(),
      this.history.prevStatus(),
    );

    if (!this.dom) {
      throw new Error('[Pjax] you need to call the start method first!');
    }

    const transitionInstance = transition.init(
      this.dom.getContainer(),
      $newContainer,
    );

    $newContainer.then(
      this.onNewContainerLoaded.bind(this),
    );

    transitionInstance.then(
      this.onTransitionEnd.bind(this),
    );
  }

 /**
  * Function called as soon the new container is ready
  *
  * @memberOf Barba.Pjax
  * @protected
  * @param {JQuery<HTMLElement>} $container
  */
 protected onNewContainerLoaded($container: JQuery<HTMLElement>) {
    const currentStatus = this.history.currentStatus();

    if (!this.dom) {
      throw new Error('[Pjax] you need to call the start method first!');
    }

    currentStatus.namespace = this.dom.getNamespace($container);

    this.dispatcher.trigger('newPageReady',
      this.history.currentStatus(),
      this.history.prevStatus(),
      $container,
      this.dom.currentHTML,
      $container.data(),
      false, // true if this is the first time newPageReady is tiggered / true on initialisation
    );
  }

 /**
  * Function called as soon the transition is finished
  *
  * @memberOf Barba.Pjax
  * @protected
  */
  protected onTransitionEnd() {
    this.transitionProgress = false;

    this.dispatcher.trigger('transitionCompleted',
      this.history.currentStatus(),
      this.history.prevStatus(),
    );
  }

  /**
   * Init the events
   *
   * @memberOf Barba.Pjax
   * @protected
   */
  protected init($wrapper: JQuery<HTMLElement>, listenAllLinks: boolean) {
    if (!this.dom) {
      throw new Error('[Pjax] you need to call the start method first!');
    }
    const $container = this.dom.getContainer();
    // const $wrapper = this.dom.getWrapper();

    $wrapper.attr('aria-live', 'polite');

    this.history.add(
      this.getCurrentUrl(),
      this.dom.getNamespace($container),
    );

    // Fire for the current view.
    this.dispatcher.trigger('initStateChange', this.history.currentStatus());
    this.dispatcher.trigger('newPageReady',
      this.history.currentStatus(),
      {},
      $container,
      this.dom.currentHTML,
      $container.data(),
      true, // true if this is the first time newPageReady is tiggered / true on initialisation
    );
    this.dispatcher.trigger('transitionCompleted', this.history.currentStatus());
    this.bindEvents(listenAllLinks);
  }
}

export { Pjax };
