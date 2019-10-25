import { Component, Debug, EventDispatcher } from '@ribajs/core';
import template from './shopify-linklist.component.html';

export interface LinklistLink {
  active: boolean;
  child_active: boolean;
  handle: string;
  level: number;
  levels: number;
  links: LinklistLink[];
  title: string;
  type: string;
  url: string;

  // custom
  collapseable?: boolean;
  collapsed?: boolean;
}

export interface Linklist {
  handle: string;
  id: string | null;
  levels: number;
  links: LinklistLink[];
  title: string;
}

export interface Scope {
  // Properties
  /** The linklist as a json string */
  linklist?: Linklist;
  /** Sets the linklist by his name */
  handle?: string;
  /** @deprecated Use `handle` instead */
  name?: string;
  /** If the navigation should be displayed as pills */
  pills: boolean;
  /** If the navigation should be displayed as vertically */
  vertical: boolean;
  /** Set this option to true if toggleable links should be automatically collapse when a page changes */
  collapseOnNewPage: boolean;
  /** Set this option to true if toggleable links should be automatically open when a child link is active */
  showOnActiveChild: boolean;

  // Methods
  toggle: ShopifyLinklistComponent['toggle'];
  collapse: ShopifyLinklistComponent['collapse'];
  collapseAll: ShopifyLinklistComponent['collapseAll'];
  show: ShopifyLinklistComponent['show'];
  showAll: ShopifyLinklistComponent['showAll'];
}

export interface IState {
  url: string;
  namespace?: string;
}

/**
 * shopify-filter
 */
export class ShopifyLinklistComponent extends Component {

  public static tagName: string = 'shopify-linklist';

  protected debug = Debug('component:' + ShopifyLinklistComponent.tagName);

  protected mainDispatcher = new EventDispatcher('main');

  protected autobind = true;

  static get observedAttributes() {
    return ['linklist', 'handle', 'name', 'pills', 'vertical', 'collapse-on-new-page', 'show-on-child-url'];
  }

  protected scope: Scope = {
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

  constructor(element?: HTMLElement, observedAttributes?: string[]) {
    super(element);
    this.mainDispatcher.on('newPageReady', this.onNewPageReady.bind(this));
    this.init(observedAttributes || ShopifyLinklistComponent.observedAttributes);
  }

  public toggle(link: LinklistLink) {
    this.debug('toggle', link);
    link.collapsed = !link.collapsed;
  }

  public collapse(link: LinklistLink) {
    this.debug('collapse', link);
    link.collapsed = true;
  }

  public show(link: LinklistLink) {
    this.debug('show', link);
    link.collapsed = false;
  }

  public showAll() {
    this.debug('showAll');
    if (this.scope.linklist) {
      for (const link of this.scope.linklist.links) {
        if (link.collapseable) {
          link.collapsed = true;
        }
      }
    }
  }

  public collapseAll() {
    this.debug('collapseAll');
    if (this.scope.linklist) {
      for (const link of this.scope.linklist.links) {
        if (link.collapseable) {
          link.collapsed = true;
        }
      }
    }
  }

  /**
   * Show (uncollapse) link by child url
   */
  public showByChildUrl(url: string) {
    if (this.scope.linklist) {
      for (const link of this.scope.linklist.links) {
        for (const sublink of link.links) {
          if (sublink.url === url) {
            this.show(link);
            break;
          }
        }
      }
    }
  }

  public attributeChangedCallback(name: string, oldValue: any, newValue: any, namespace: string | null) {
    // injects the changed attributes to scope
    super.attributeChangedCallback(name, oldValue, newValue, namespace);

    // set linklist by handle
    if (name === 'handle' || name === 'name') {
      if ((window as any).model && (window as any).model.system && (window as any).model.system.linklists && (window as any).model.system.linklists[newValue]) {
        this.scope.linklist = (window as any).model.system.linklists[newValue];
      } else {
        throw new Error(`Linklist not found! \nNote: The linklist must be available under "window.model.system.linklists['${newValue}']" to set it using his handle.`);
      }
    }

    if (name === 'linklist') {
      console.error('linklist newValue', newValue);
      if (typeof(newValue) === 'object') {
        // if object is in form of "main-menu": {...}
        if (Object.keys(newValue).length === 1) {
          newValue = newValue[Object.keys(newValue)[0]];
          console.error('newValue', newValue);
        }
      }

      this.scope.linklist = newValue;
    }
  }

  protected onNewPageReady(viewId: string, currentStatus: IState, prevStatus: IState, $container: JQuery<HTMLElement>, newPageRawHTML: string, dataset: any, isFirstPageLoad: boolean) {
    const url = new URL(currentStatus.url);
    this.debug('onNewPageReady', url.pathname);
    if (this.scope.collapseOnNewPage) {
      this.collapseAll();
    }
    if (this.scope.showOnActiveChild) {
      this.showByChildUrl(url.pathname);
    }
  }

  protected async beforeBind(): Promise<any> {
    super.beforeBind();
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
      if (link.url === '#collapse') {
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

  protected requiredAttributes() {
    return ['linklist'];
  }

  /**
   * Only set the component template if there no childs already
   */
  protected template() {
    if (this.el.hasChildNodes()) {
      return null;
    } else {
      return template;
    }
  }
}
