import {
  Component,
  Debug,
} from '@ribajs/core';

import template from './bs4-contents.component.html';

export interface Anchor {
  element: HTMLHeadingElement;
  href: string;
  title: string;
  childs: Anchor[];
}

export interface Scope {
  /**
   * If start is `2` and depth is `2` depth starts on `h2` and ends on `h2`.
   */
  headersStart: number;
  /**
   * If start is `1` and depth is `1` only `h1` headers are detected, if depth is `2` also `h2` is detected.
   */
  headersDepth: number;
  /**
   * Depth in how many parents elements should be searched for an id for each found header element (default `1`)
   */
  findHeaderIdDepth: number;
  /**
   * Selector to search for headers insite of the element
   */
  headerParentSelector?: string;
  /**
   * Pixels to offset from top when calculating position to scroll there.
   */
  scrollOffset: number;
  /**
   * The element to scroll (default `window`)
   */
  scrollElement?: string;
  /**
   * Array of found headers / anchors
   */
  anchors: Anchor[];
}

export class Bs4ContentsComponent extends Component {

  public static tagName: string = 'bs4-contents';

  protected autobind = true;

  protected wrapperElement?: Element;

  static get observedAttributes() {
    return ['headers-start', 'headers-depth', 'find-header-id-depth', 'header-parent-selector', 'scroll-offset', 'scroll-element'];
  }

  protected debug = Debug('component:' + Bs4ContentsComponent.tagName);

  protected scope: Scope = {
    headersDepth: 1,
    headersStart: 2,
    findHeaderIdDepth: 1,
    headerParentSelector: undefined,
    scrollOffset: 0,
    anchors: [],
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.debug('constructor', this);
    this.init(Bs4ContentsComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes)
    .then((view) => {
      return view;
    });
  }

  protected getIdFromElementOrParent(element: HTMLElement, depth = 1): string | null {
    if (element.id) {
      return element.id;
    }
    if (depth <= this.scope.findHeaderIdDepth) {
      if (element.parentElement) {
        return this.getIdFromElementOrParent(element.parentElement, ++depth);
      }
    }
    return null;
  }

  protected pushHeaders(wrapperElement: Element, headersStart: number, headersDepth: number, pushTo: Anchor[]) {
    const headerElements = wrapperElement.querySelectorAll('h' + headersStart) as NodeListOf<HTMLHeadingElement>;
    this.debug(`search for h${headersStart} in`, wrapperElement);
    headerElements.forEach((headerElement) => {
      const id = this.getIdFromElementOrParent(headerElement);
      if (!id) {
        this.debug('Ignore element because it has no id', headerElement);
        return;
      }
      pushTo.push({
        element: headerElement,
        href: '#' + id,
        title: headerElement.innerHTML,
        childs: [],
      });
      this.debug('Header pushed', id);
      this.debug('headersDepth <= headersStart + 1', headersDepth <= headersStart + 1, headersDepth, headersStart + 1);
      if (headerElement.parentElement && headersDepth >= headersStart + 1) {
        this.pushHeaders(headerElement.parentElement, headersStart + 1, headersDepth, pushTo[pushTo.length - 1].childs);
      }
    });
  }

  protected async beforeBind() {
    this.debug('beforeBind');
    if (this.scope.headerParentSelector && this.scope.headersStart && this.scope.headersDepth) {
      this.wrapperElement = document.querySelector(this.scope.headerParentSelector) || undefined;
      this.scope.anchors = [];
      if (!this.wrapperElement) {
        console.error('No wrapper element found!');
        return;
      }
      this.pushHeaders(this.wrapperElement, this.scope.headersStart, this.scope.headersDepth, this.scope.anchors);
    }
  }

  protected async afterBind() {
    this.debug('afterBind', this.scope);
  }

  protected requiredAttributes() {
    return ['headersStart', 'headersDepth', 'headerParentSelector'];
  }

  protected attributeChangedCallback(attributeName: string, oldValue: any, newValue: any, namespace: string | null) {
    super.attributeChangedCallback(attributeName, oldValue, newValue, namespace);
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    // Only set the component template if there no childs already
    if (this.el.hasChildNodes()) {
      this.debug('Do not use template, because element has child nodes');
      return null;
    } else {
      this.debug('Use template', template);
      return template;
    }
  }
}
