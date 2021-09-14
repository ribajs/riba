import { Binder, View } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { isBoolean, isObject } from "@ribajs/utils/src/type";
import { scrollTo } from "@ribajs/utils/src/dom";
import { State } from "@ribajs/history";
import { RouterBinderViewOptions, PjaxOptions } from "../types";
import { Pjax, Prefetch, HideShowTransition } from "../services";

export interface ViewBinder extends Binder<string> {
  dispatcher?: EventDispatcher;
  options: Partial<RouterBinderViewOptions>;
  wrapper?: HTMLElement;
  nested: View | null;
  prefetch?: Prefetch;
  onPageReady(
    viewId: string,
    currentStatus: State,
    prevStatus: State,
    container: HTMLElement,
    newPageRawHTML: string,
    dataset: any,
    isInit: boolean
  ): void;
  onTransitionCompleted(viewId: string): void;
}

/**
 * The main wrapper for the riba router
 * TODO convert this to a component
 *
 * ```
 *   <div rv-view='{"listenAllLinks": true}'>
 *     <div class="rv-view-container" {% include 'jumplink-utils-barba-container-attributes', parseCollection: true %}>
 *       {{ content_for_layout }}
 *     </div>
 *   </div>
 * ```
 * @deprecated Use router-view component instead
 */
export const viewBinder: ViewBinder = {
  name: "view",
  block: true,
  options: {},
  nested: null,
  bind(el: HTMLElement) {
    const self = (this.binder || this) as ViewBinder;

    self.nested = self.nested || null;
    self.wrapper = self.wrapper || el;

    /*
     * Make the dispatcher available in the model to register event handlers.
     *
     * I.e., if we have initialized rivets/riba with:
     *
     *  `rivets.bind(document.body, model)`,
     *
     * then we can register event handlers for the Barba router dispatcher like this:
     *
     *  `model.routerDispatcher.on('newPageReady', ...);`
     *  `model.routerDispatcher.on('transitionCompleted', ...);`
     * ...etc.
     *
     */
    // this.view.models.routerDispatcher = dispatcher;

    console.warn(
      "The viewBinder is depricated, use the router-view component instead!"
    );
  },

  routine(el: HTMLUnknownElement, options: any) {
    const self = (this.binder || this) as ViewBinder;
    // Set default options
    self.options = options || {};

    self.options.viewId =
      self.options.viewId || el.getAttribute("id") || "main";
    self.options.action = self.options.action || "replace"; // replace / append

    if (self.options.viewId === "main") {
      self.options.containerSelector =
        self.options.containerSelector || "[data-namespace]";
      self.options.scrollToTop = isBoolean(self.options.scrollToTop)
        ? self.options.scrollToTop
        : true;
      self.options.listenAllLinks = isBoolean(self.options.listenAllLinks)
        ? self.options.listenAllLinks
        : true;
      self.options.listenPopstate = isBoolean(self.options.listenPopstate)
        ? self.options.listenPopstate
        : true;
      self.options.scrollToAnchorHash = isBoolean(
        self.options.scrollToAnchorHash
      )
        ? self.options.scrollToAnchorHash
        : true;
      self.options.datasetToModel = isBoolean(self.options.datasetToModel)
        ? self.options.datasetToModel
        : true;
      self.options.parseTitle = isBoolean(self.options.parseTitle)
        ? self.options.parseTitle
        : true;
      self.options.changeBrowserUrl = isBoolean(self.options.changeBrowserUrl)
        ? self.options.changeBrowserUrl
        : true;
      self.options.prefetchLinks = isBoolean(self.options.prefetchLinks)
        ? self.options.prefetchLinks
        : true;
    } else {
      self.options.containerSelector =
        self.options.containerSelector ||
        `#${self.options.viewId} > *:first-child`;
      self.options.scrollToTop = isBoolean(self.options.scrollToTop)
        ? self.options.scrollToTop
        : false;
      self.options.listenAllLinks = isBoolean(self.options.listenAllLinks)
        ? self.options.listenAllLinks
        : false;
      self.options.listenPopstate = isBoolean(self.options.listenPopstate)
        ? self.options.listenPopstate
        : false;
      self.options.scrollToAnchorHash = isBoolean(
        self.options.scrollToAnchorHash
      )
        ? self.options.scrollToAnchorHash
        : false;
      self.options.datasetToModel = isBoolean(self.options.datasetToModel)
        ? self.options.datasetToModel
        : false;
      self.options.parseTitle = isBoolean(self.options.parseTitle)
        ? self.options.parseTitle
        : false;
      self.options.changeBrowserUrl = isBoolean(self.options.changeBrowserUrl)
        ? self.options.changeBrowserUrl
        : false;
      self.options.prefetchLinks = isBoolean(self.options.prefetchLinks)
        ? self.options.prefetchLinks
        : false;
    }

    self.options.prefetchLinks = isBoolean(self.options.prefetchLinks)
      ? self.options.prefetchLinks
      : true;
    self.options.transition =
      self.options.transition ||
      new HideShowTransition(self.options.action, self.options.scrollToTop);

    self.dispatcher = new EventDispatcher(self.options.viewId);
    self.wrapper?.setAttribute("id", self.options.viewId);

    self.dispatcher.on("newPageReady", self.onPageReady, this);
    self.dispatcher.on("transitionCompleted", self.onTransitionCompleted, this);

    const pjaxOptions: PjaxOptions = {
      id: self.options.viewId,
      wrapper: self.wrapper,
      containerSelector: self.options.containerSelector,
      listenAllLinks: !!self.options.listenAllLinks,
      listenPopstate: !!self.options.listenPopstate,
      transition: self.options.transition,
      parseTitle: !!self.options.parseTitle,
      changeBrowserUrl: !!self.options.changeBrowserUrl,
      prefetchLinks: !!self.options.prefetchLinks,
    };

    const pjax = new Pjax(pjaxOptions);
    self.prefetch = new Prefetch(self.options.viewId);
    self.prefetch.init(pjaxOptions.prefetchLinks);
    pjax.start();
  },

  unbind(/*el: HTMLUnknownElement*/) {
    const self = (this.binder || this) as ViewBinder;
    if (self.dispatcher) {
      self.dispatcher.off("newPageReady", self.onPageReady, this);
      self.dispatcher.off(
        "transitionCompleted",
        self.onTransitionCompleted,
        this
      );
    }

    if (self.nested !== null) {
      self.nested.unbind();
      self.nested = null;
    }
  },

  onPageReady(
    viewId: string,
    currentStatus: State,
    prevStatus: State,
    container: HTMLElement,
    newPageRawHTML: string,
    dataset: any /*, isInit: boolean*/
  ) {
    const self = (this.binder || this) as ViewBinder;
    // Only to anything if the viewID is eqal (in this way it is possible to have multiple views)
    if (viewId !== self.options.viewId) {
      console.warn("not the right view", self.options.viewId, viewId, dataset);
      return;
    }

    // unbind the old riba view
    if (self.nested) {
      if (self.options.action === "replace") {
        // IMPORTANT ROUTE FIXME only unbind if cache is not enabled?
        // self.nested.unbind();
      }
    }

    // add the dataset to the model
    if (!isObject(this.view.models)) {
      this.view.models = {};
    }

    if (self.options.datasetToModel === true && isObject(dataset)) {
      this.view.models.dataset = dataset; // = container.data();
    }

    self.nested = new View(container, this.view.models, this.view.options);
    self.nested.bind();
  },
  onTransitionCompleted(viewId: string) {
    const self = (this.binder || this) as ViewBinder;
    // Only to anything if the viewID is eqal (in this way it is possible to have multiple views)
    if (viewId !== self.options.viewId) {
      return;
    }

    // scroll to Anchor of hash
    if (self.options.scrollToAnchorHash && window.location.hash) {
      const scrollToMe = document.getElementById(
        window.location.hash.substr(1)
      );
      if (scrollToMe) {
        return new Promise((resolve) => {
          resolve(scrollTo(scrollToMe, 0, window));
        });
      }
    }
    return Promise.resolve();
  },
};
