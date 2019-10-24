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
  linklist?: Linklist;
  toggle: ShopifyLinklistComponent['toggle'];
  collapse: ShopifyLinklistComponent['collapse'];
  show: ShopifyLinklistComponent['show'];
  collapseAll: ShopifyLinklistComponent['collapseAll'];
  optionCollapseOnNewPage: boolean;
  optionShowOnChildUrl: boolean;
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
    return ['linklist', 'name', 'pills', 'vertical', 'option-collapse-on-new-page', 'option-show-on-child-url'];
  }

  protected scope: Scope = {
    toggle: this.toggle,
    collapse: this.collapse,
    show: this.show,
    collapseAll: this.collapseAll,
    optionCollapseOnNewPage: true,
    optionShowOnChildUrl: true,
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

    // set linklist by name
    if (name === 'name') {
      this.scope.linklist = (window as any).model.system.linklists[newValue];
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

      this.scope.linklist = (window as any).model.system.linklists[newValue];
    }
  }

  protected onNewPageReady(viewId: string, currentStatus: IState, prevStatus: IState, $container: JQuery<HTMLElement>, newPageRawHTML: string, dataset: any, isFirstPageLoad: boolean) {
    const url = new URL(currentStatus.url);
    this.debug('onNewPageReady', url.pathname);
    if (this.scope.optionCollapseOnNewPage) {
      this.collapseAll();
    }
    if (this.scope.optionShowOnChildUrl) {
      this.showByChildUrl(url.pathname);
    }
  }

  protected async beforeBind(): Promise<any> {
    super.beforeBind();
    this.transformLinklist();
    if (this.scope.optionCollapseOnNewPage) {
      this.collapseAll();
    }
    if (this.scope.optionShowOnChildUrl) {
      this.showByChildUrl(window.location.pathname);
    }
  }

  /**
   * Checks if link are collapseable and set initializes corresponding attributes
   */
  protected transformLinklist() {
    this.debug('current linklist', this.scope.linklist);
    if (this.scope.linklist) {
      for (const link of this.scope.linklist.links) {
        if (link.url === '#collapse') {
          link.collapseable = true;
          link.collapsed = true;
        } else {
          link.collapseable = false;
          link.collapsed = false;
        }
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
