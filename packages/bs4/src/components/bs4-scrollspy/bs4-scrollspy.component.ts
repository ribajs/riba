import {
  Component,
  Debug,
} from '@ribajs/core';

import template from './bs4-scrollspy.component.html';

interface Anchor {
  element: HTMLHeadingElement;
  href: string;
  title: string;
  childs: Anchor[];
}

interface IScope {
  /**
   * If start is `2` and depth is `2` depth starts on `h2` and ends on `h3`.
   */
  headersStart: number;
  /**
   * If start is `1` and depth is `1` only `h1` headers are detected, if depth is `2` also `h2` is detected.
   */
  headersDepth: number;
  /**
   * Selector to search for headers insite of the element
   */
  headerParentSelector?: string;
  /**
   * Pixels to offset from top when calculating position of scroll.
   */
  offset: number;
  /**
   * Pixels to offset from bottom when calculating position of scroll.
   */
  offsetBottom: number;
  /**
   * Pixels to offset from top when calculating position to scroll there.
   */
  scrollOffset: number;
  anchors: Anchor[];
}

export class Bs4ScrollspyComponent extends Component {

  public static tagName: string = 'bs4-scrollspy';

  protected autobind = true;

  protected wrapperElement?: Element;

  static get observedAttributes() {
    return ['headers-start', 'headers-depth', 'header-parent-selector', 'offset', 'offset-bottom', 'scroll-offset'];
  }

  protected debug = Debug('component:' + Bs4ScrollspyComponent.tagName);

  protected scope: IScope = {
    headersDepth: 1,
    headersStart: 2,
    headerParentSelector: undefined,
    offset: 0,
    offsetBottom: 0,
    scrollOffset: 0,
    anchors: [],
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.debug('constructor', this);
    this.init(Bs4ScrollspyComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes)
    .then((view) => {
      return view;
    });
  }

  protected getIdFromElementOrParent(element: HTMLElement, depth = 0): string | null {
    if (element.id) {
      return element.id;
    }
    if (depth <= 1) {
      if (element.parentElement) {
        return this.getIdFromElementOrParent(element.parentElement, ++depth);
      }
    }
    return null;
  }

  protected async beforeBind() {
    this.debug('beforeBind');
    if (this.scope.headerParentSelector && this.scope.headersStart && this.scope.headersDepth) {
      this.wrapperElement = document.querySelector(this.scope.headerParentSelector) || undefined;
      if (this.wrapperElement) {
        this.scope.anchors = [];
        const level1Headers = this.wrapperElement.querySelectorAll('h' + this.scope.headersStart) as NodeListOf<HTMLHeadingElement>;
        level1Headers.forEach((level1Header) => {
          const idLevel1 = this.getIdFromElementOrParent(level1Header);
          if (!idLevel1) {
            this.debug('Ignore element because it has no id', level1Header);
            return;
          }
          this.scope.anchors.push({
            element: level1Header,
            href: '#' + idLevel1,
            title: level1Header.innerHTML,
            childs: [],
          });
          if (!level1Header.parentNode) {
            return;
          }
          const level2Headers = level1Header.parentNode.querySelectorAll('h' + (this.scope.headersStart + 1)) as NodeListOf<HTMLHeadingElement>;
          level2Headers.forEach((level2Header) => {
            this.debug('level 2 header', level2Header);
            const idLevel2 = this.getIdFromElementOrParent(level2Header);
            if (!idLevel2) {
              this.debug('Ignore element because it has no id', level2Header);
              return;
            }
            this.scope.anchors[this.scope.anchors.length - 1].childs.push({
              element: level2Header,
              href: '#' + idLevel2,
              title: level2Header.innerHTML,
              childs: [],
            });
          });
        });
      }
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
