import { Component, View, TemplateFunction } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { scrollTo, scrollToPosition } from "@ribajs/utils/src/dom";
import { State } from "@ribajs/history";
import { Pjax, Prefetch, RouterService } from "../../services";
import type { RouterViewOptions, PjaxOptions } from "../../types";

export interface Scope extends RouterViewOptions {
  dataset: any;
}

export class RouterViewComponent extends Component {
  public static tagName = "router-view";
  protected events = EventDispatcher.getInstance("main");
  protected nested: View | null = null;
  protected wrapper: HTMLElement | null = null;
  protected pjax: Pjax | null = null;
  protected prefetch: Prefetch | null = null;

  static get observedAttributes(): string[] {
    return [
      "id",
      "action",
      "container-selector",
      "scroll-to-top",
      "listen-all-links",
      "listen-popstate",
      "scroll-to-anchor-hash",
      "scroll-to-anchor-offset",
      "dataset-to-model",
      "parse-title",
      "change-browser-url",
      "prefetch-links",
    ];
  }

  public scope: Scope = {
    id: "main",
    action: "replace",
    scrollToTop: true,
    listenAllLinks: true,
    listenPopstate: true,
    scrollToAnchorHash: true,
    scrollToAnchorOffset: RouterService.options.scrollToAnchorOffset,
    datasetToModel: true,
    parseTitle: true,
    changeBrowserUrl: true,
    prefetchLinks: true,
    transition: RouterService.options.defaultTransition,
    dataset: {},
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(RouterViewComponent.observedAttributes);
  }

  protected addEventListeners() {
    this.events.on("newPageReady", this.onPageReady, this);
    this.events.on("initStateChange", this.onTransitionInit, this);
    this.events.on("transitionCompleted", this.onTransitionCompleted, this);
  }

  protected removeEventListeners() {
    this.events.off("newPageReady", this.onPageReady, this);
    this.events.off("initStateChange", this.onTransitionInit, this);
    this.events.off("transitionCompleted", this.onTransitionCompleted, this);
  }

  protected getContainerSelector() {
    if (this.scope.id === "main") {
      return `${RouterViewComponent.tagName} > *:first-child`;
    } else {
      return `${RouterViewComponent.tagName}#${this.scope.id} > *:first-child`;
    }
  }

  protected initAndStartPjax() {
    if (!this.scope.id) {
      console.error("Id attribute is required!");
      return;
    }

    const pjaxOptions: PjaxOptions = {
      id: this.scope.id,
      action: this.scope.action,
      wrapper: this,
      containerSelector: this.getContainerSelector(),
      listenAllLinks: !!this.scope.listenAllLinks,
      listenPopstate: !!this.scope.listenPopstate,
      transition: this.scope.transition,
      parseTitle: !!this.scope.parseTitle,
      changeBrowserUrl: !!this.scope.changeBrowserUrl,
      prefetchLinks: !!this.scope.prefetchLinks,
      scrollToTop: !!this.scope.scrollToTop,
    };
    this.pjax = new Pjax(pjaxOptions);
    this.pjax.setActiveWrapper(this);
    this.prefetch = new Prefetch(this.scope.id);
    this.prefetch.init(pjaxOptions.prefetchLinks);
    this.pjax.start();
  }

  protected onPageReady(
    viewId: string,
    currentStatus: State,
    prevStatus: State,
    container: HTMLElement,
    newPageRawHTML: string,
    dataset: any,
    isInit: boolean
  ) {
    if (this.scope.datasetToModel) {
      this.scope.dataset = dataset;
    }

    // Ignore rest on first page requests
    if (isInit) {
      return;
    }

    // Only to anything if the viewID is equal (in this way it is possible to have multiple views)
    if (viewId !== this.scope.id) {
      console.warn("not the right view", this.scope.id, viewId, dataset);
      return;
    }

    this.debug("New page ready!", this.innerHTML);

    this.view = this.getView();

    if (!this.view) {
      console.warn("View ist not ready!");
      return;
    }

    this.view.bind();
  }

  protected async onTransitionInit(viewId: string) {
    if (viewId !== this.scope.id) {
      return;
    }
    this.setTransitionClass('init');
  }

  protected async onTransitionCompleted(viewId: string) {
    // Only to anything if the viewID is equal (in this way it is possible to have multiple views)
    if (viewId !== this.scope.id) {
      return;
    }

    this.setTransitionClass('complete');

    if (this.scope.scrollToAnchorHash) {
      let scrollToElement: HTMLElement | null = null;
      const hash = window.location.hash.substr(1);
      if (hash) {
        scrollToElement = document.getElementById(
          window.location.hash.substr(1)
        );
        // Scroll to Anchor of hash
        if (scrollToElement) {
          return await scrollTo(scrollToElement, this.scope.scrollToAnchorOffset, window);
        }
      }
    }

    if (this.scope.scrollToTop) {
      return await scrollToPosition(window, "start", "vertical", "smooth");
    }
  }

  protected setTransitionClass(state: 'init' | 'complete') {
    this.classList.remove('transition-init');
    this.classList.remove('transition-complete');
    this.classList.add(`transition-${state}`);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace
    );
    switch (attributeName) {
      case "id":
        this.events = EventDispatcher.getInstance(this.scope.id);
        break;

      default:
        break;
    }
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.addEventListeners();
    this.initAndStartPjax();
  }

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }
}
