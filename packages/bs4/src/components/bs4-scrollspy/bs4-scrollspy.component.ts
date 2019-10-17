import {
  Debug,
} from '@ribajs/core';

import { Bs4ContentsComponent, Scope as Bs4ContentsComponentScope } from '../bs4-contents/bs4-contents.component';

import template from './bs4-scrollspy.component.html';

export interface Anchor {
  element: HTMLHeadingElement;
  href: string;
  title: string;
  childs: Anchor[];
}

export interface Scope extends Bs4ContentsComponentScope {
  /**
   * Pixels to offset from top when calculating position of scroll.
   */
  offset: number;
  /**
   * Pixels to offset from bottom when calculating position of scroll.
   */
  offsetBottom: number;
}

export class Bs4ScrollspyComponent extends Bs4ContentsComponent {

  public static tagName: string = 'bs4-scrollspy';

  protected autobind = true;

  protected wrapperElement?: Element;

  static get observedAttributes() {
    return ['headers-start', 'headers-depth', 'header-parent-selector', 'offset', 'offset-bottom', 'scroll-offset'];
  }

  protected debug = Debug('component:' + Bs4ScrollspyComponent.tagName);

  protected scope: Scope = {
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

  protected requiredAttributes() {
    return ['headersStart', 'headersDepth', 'headerParentSelector'];
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
