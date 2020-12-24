import { Component, EventDispatcher, View } from "@ribajs/core";
import { scrollTo } from "@ribajs/utils/src/dom";
import { State } from "@ribajs/history";
import { Pjax, Prefetch, HideShowTransition } from "../../services";
import type { RouterViewOptions, PjaxOptions } from "../../interfaces";

export type Scope = RouterViewOptions;

export class RouterViewComponent extends Component {
  public static tagName = "router-view";
  protected events = EventDispatcher.getInstance("main");
  protected nested: View | null = null;
  protected wrapper: HTMLElement | null = null;
  protected pjax: Pjax | null = null;
  protected prefetch: Prefetch | null = null;

  static get observedAttributes() {
    return [
      "id",
      "action",
      "container-selector",
      "scroll-to-top",
      "listen-all-links",
      "listen-popstate",
      "scroll-to-ancho-hash",
      "parse-title",
      "change-browser-url",
      "prefetch-links",
    ];
  }

  protected scope: Scope = {
    id: "main",
    action: "replace",
    scrollToTop: true,
    listenAllLinks: true,
    listenPopstate: true,
    scrollToAnchorHash: true,
    parseTitle: true,
    changeBrowserUrl: true,
    prefetchLinks: true,
    transition: new HideShowTransition("replace", true),
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(RouterViewComponent.observedAttributes);
  }

  protected addEventListeners() {
    this.events.on("newPageReady", this.onPageReady, this);
    this.events.on("transitionCompleted", this.onTransitionCompleted, this);
  }

  protected removeEventListeners() {
    this.events.off("newPageReady", this.onPageReady, this);
    this.events.off("transitionCompleted", this.onTransitionCompleted, this);
  }

  protected getContainerSelector() {
    if (this.scope.id === "main") {
      return `${RouterViewComponent.tagName} > *`;
    } else {
      return `${RouterViewComponent.tagName}#${this.scope.id} > *`;
    }
  }

  protected initAndStartPjax() {
    if (!this.scope.id) {
      console.error("Id attribute is required!");
      return;
    }

    const pjaxOptions: PjaxOptions = {
      id: this.scope.id,
      wrapper: this,
      containerSelector: this.getContainerSelector(),
      listenAllLinks: !!this.scope.listenAllLinks,
      listenPopstate: !!this.scope.listenPopstate,
      transition: this.scope.transition,
      parseTitle: !!this.scope.parseTitle,
      changeBrowserUrl: !!this.scope.changeBrowserUrl,
      prefetchLinks: !!this.scope.prefetchLinks,
    };
    this.pjax = new Pjax(pjaxOptions);
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
    // Ignore on first page request
    if (isInit) {
      return;
    }

    // Only to anything if the viewID is eqal (in this way it is possible to have multiple views)
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

  protected onTransitionCompleted(viewId: string) {
    // Only to anything if the viewID is eqal (in this way it is possible to have multiple views)
    if (viewId !== this.scope.id) {
      return;
    }

    // scroll to Anchor of hash
    if (this.scope.scrollToAnchorHash && window.location.hash) {
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
  }

  protected requiredAttributes() {
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

  protected template() {
    return null;
  }
}