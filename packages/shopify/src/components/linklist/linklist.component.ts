import { Component, TemplateFunction } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import template from "./linklist.component.html";

import { Linklist, LinklistLink } from "../../interfaces";

export interface Scope {
  // Properties
  /** The linklist as a json string */
  linklist?: Linklist;
  /** Sets the linklist by his name */
  handle?: string;
  /** If the navigation should be displayed as pills */
  pills: boolean;
  /** If the navigation should be displayed as vertically */
  vertical: boolean;
  /** Set this option to true if toggleable links should be automatically collapse when a page changes */
  collapseOnNewPage: boolean;
  /** Set this option to true if toggleable links should be automatically open when a child link is active */
  showOnActiveChild: boolean;

  // Methods
  toggle: ShopifyLinklistComponent["toggle"];
  collapse: ShopifyLinklistComponent["collapse"];
  collapseAll: ShopifyLinklistComponent["collapseAll"];
  show: ShopifyLinklistComponent["show"];
  showAll: ShopifyLinklistComponent["showAll"];
}

export interface State {
  url: string;
  namespace?: string;
}

/**
 * shopify-filter
 */
export class ShopifyLinklistComponent extends Component {
  public static tagName = "shopify-linklist";

  protected mainDispatcher = new EventDispatcher("main");

  protected autobind = true;

  static get observedAttributes(): string[] {
    return [
      "linklist",
      "handle",
      "name",
      "pills",
      "vertical",
      "collapse-on-new-page",
      "show-on-child-url",
    ];
  }

  public scope: Scope = {
    // properties
    pills: false,
    vertical: false,
    collapseOnNewPage: true,
    showOnActiveChild: true,
    // methods
    toggle: this.toggle,
    collapse: this.collapse,
    collapseAll: this.collapseAll,
    show: this.show,
    showAll: this.showAll,
  };

  constructor() {
    super();
    this.mainDispatcher.on("newPageReady", this.onNewPageReady, this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ShopifyLinklistComponent.observedAttributes);
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
    this.mainDispatcher.off("newPageReady", this.onNewPageReady, this);
  }

  public toggle(link: LinklistLink) {
    link.collapsed = !link.collapsed;
  }

  public collapse(link: LinklistLink) {
    link.collapsed = true;
  }

  public show(link: LinklistLink) {
    link.collapsed = false;
  }

  public showAll() {
    if (this.scope.linklist) {
      this.showAllByLinks(this.scope.linklist.links);
    }
  }

  public collapseAll() {
    if (this.scope.linklist && this.scope.linklist.links) {
      this.collapseAllByLinks(this.scope.linklist.links);
    }
  }

  /**
   * Show (uncollapse) link by child url
   */
  public showByChildUrl(url: string) {
    if (this.scope.linklist && this.scope.linklist.links) {
      for (const link of this.scope.linklist.links) {
        for (const sublink of link.links) {
          if (sublink.url === url) {
            this.show(link);
            break;
          }
          for (const subsublink of sublink.links) {
            if (subsublink.url === url) {
              this.show(link);
              this.show(sublink);
              break;
            }
          }
        }
      }
    }
  }

  protected async attributeChangedCallback(
    name: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    // injects the changed attributes to scope
    super.attributeChangedCallback(name, oldValue, newValue, namespace);

    // set linklist by handle
    if (name === "handle" || name === "name") {
      if (
        (window as any).model &&
        (window as any).model.system &&
        (window as any).model.system.linklists &&
        (window as any).model.system.linklists[newValue]
      ) {
        this.scope.linklist = (window as any).model.system.linklists[newValue];
      } else {
        throw new Error(
          `Linklist not found! \nNote: The linklist must be available under "window.model.system.linklists['${newValue}']" to set it using his handle.`
        );
      }
    }

    if (name === "linklist") {
      if (typeof newValue === "object") {
        // if object is in form of "main-menu": {...}
        if (Object.keys(newValue).length === 1) {
          newValue = newValue[Object.keys(newValue)[0]];
        }
      }

      this.scope.linklist = newValue;
    }
  }

  protected collapseAllByLinks(links: LinklistLink[]) {
    if (this.scope.linklist && this.scope.linklist.links) {
      for (const link of links) {
        if (link.collapseable) {
          link.collapsed = true;
        }
        if (link.links) {
          this.collapseAllByLinks(link.links);
        }
      }
    }
  }

  protected showAllByLinks(links: LinklistLink[]) {
    if (this.scope.linklist && this.scope.linklist.links) {
      for (const link of links) {
        if (link.collapseable) {
          link.collapsed = false;
        }
        if (link.links) {
          this.collapseAllByLinks(link.links);
        }
      }
    }
  }

  protected onNewPageReady(
    viewId: string,
    currentStatus: State /*, prevStatus: State, container: HTMLElement, newPageRawHTML: string, dataset: any, isFirstPageLoad: boolean */
  ) {
    const url = currentStatus.url;
    if (this.scope.collapseOnNewPage) {
      this.collapseAll();
    }
    if (this.scope.showOnActiveChild) {
      this.showByChildUrl(url);
    }
  }

  protected async beforeBind(): Promise<any> {
    await super.beforeBind();
    if (this.scope.linklist && this.scope.linklist.links) {
      this.transformLinks(this.scope.linklist.links);
      if (this.scope.collapseOnNewPage) {
        this.collapseAll();
      }
    }
    if (this.scope.showOnActiveChild) {
      this.showByChildUrl(window.location.pathname);
    }
  }

  /**
   * Checks if link are collapseable and set initializes corresponding attributes
   */
  protected transformLinks(links: LinklistLink[]) {
    for (const link of links) {
      if (link.url === "#collapse") {
        link.collapseable = true;
        link.collapsed = true;
      } else {
        link.collapseable = false;
        link.collapsed = false;
      }
      if (link.links) {
        this.transformLinks(link.links);
      }
    }
  }

  protected requiredAttributes(): string[] {
    return ["linklist"];
  }

  /**
   * Only set the component template if there no childs already
   */
  protected template(): ReturnType<TemplateFunction> {
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      return template;
    }
  }
}
