import {
  handleizeFormatter,
} from '@ribajs/core';
import { CollapseService } from '../../services/collapse.service';

import { TemplatesComponent } from '../templates/templates.component';

import template from './bs4-accordion.component.html';

interface AccordionItem {
  title: string;
  content: string;
  show: boolean;
  iconDirection: 'left' | 'left-up' | 'up' | 'up-right' | 'right' | 'right-down' | 'down' | 'down-left';
}

interface Scope {
  items: AccordionItem[];
  toggle: Bs4AccordionComponent['toggle'];
  show: Bs4AccordionComponent['show'];
  hide: Bs4AccordionComponent['hide'];
  collapseIconSrc?: string;
  collapseIconSize: number;
}

export class Bs4AccordionComponent extends TemplatesComponent {

  public static tagName: string = 'bs4-accordion';

  protected autobind = true;

  protected templateAttributes = [
    {
      name: 'title',
      required: true,
    },
    {
      name: 'show',
      required: false,
    },
    {
      name: 'icon-direction',
      required: false,
    },
  ];

  // protected collapseService?: CollapseService;

  static get observedAttributes() {
    return ['collapse-icon-src', 'collapse-icon-size'];
  }

  protected scope: Scope = {
    items: [],
    toggle: this.toggle,
    show: this.show,
    hide: this.hide,
    collapseIconSize: 16,
  };

  constructor(element?: HTMLElement) {
    super(element);
    // console.debug('constructor', this);
  }

  public hide(item: AccordionItem, index: number) {
    const target = this.el.querySelector<HTMLElement>(`[data-index="${index}"]`);
    if (target) {
      this.initItemEventListeners(item, target);
      CollapseService.hide(target);
    }
  }

  public show(item: AccordionItem, index: number) {
    const target = this.el.querySelector<HTMLElement>(`[data-index="${index}"]`);
    const others = this.el.querySelectorAll<HTMLElement>(`[data-index]:not([data-index="${index}"])`);
    if (others) {
      CollapseService.hideAll(others);
    }
    if (target) {
      this.initItemEventListeners(item, target);
      CollapseService.show(target);
    }
  }

  public toggle(item: AccordionItem, index: number) {
    const target = this.el.querySelector<HTMLElement>(`[data-index="${index}"]`);
    const others = this.el.querySelectorAll<HTMLElement>(`[data-index]:not([data-index="${index}"])`);
    if (others) {
      CollapseService.hideAll(others);
    }
    if (target) {
      this.initItemEventListeners(item, target);
      CollapseService.toggle(target);
    }
  }

  protected initItemEventListeners(item: AccordionItem, element: HTMLElement) {
    element.removeEventListener(CollapseService.EVENT.HIDE, this.onHide.bind(this, element, item));
    element.removeEventListener(CollapseService.EVENT.SHOW, this.onShow.bind(this, element, item));
    element.addEventListener(CollapseService.EVENT.HIDE, this.onHide.bind(this, element, item), { once: true });
    element.addEventListener(CollapseService.EVENT.SHOW, this.onShow.bind(this, element, item), { once: true });
  }

  protected onShow(element: HTMLElement, item: AccordionItem) {
    console.debug('onShow', element, item);
    item.show = true;
    item.iconDirection = 'down';
  }

  protected onHide(element: HTMLElement, item: AccordionItem) {
    console.debug('onHide', element, item);
    item.show = false;
    item.iconDirection = 'up';
  }

  protected transformTemplateAttributes(attributes: any) {
    attributes.handle = attributes.handle || handleizeFormatter.read(attributes.title);
    attributes.show = attributes.show || false;
    return attributes;
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs4AccordionComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes)
    .then((view) => {
      return view;
    });
  }

  protected async beforeBind() {
    return super.beforeBind();
    // console.debug('beforeBind');
  }

  protected async afterBind() {
    return super.beforeBind();
    // console.debug('afterBind', this.scope);
  }

  protected requiredAttributes() {
    return [];
  }

  protected parsedAttributeChangedCallback(attributeName: string, oldValue: any, newValue: any, namespace: string | null) {
    super.parsedAttributeChangedCallback(attributeName, oldValue, newValue, namespace);
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    // Only set the component template if there no childs or the childs are templates
    if (!this.el.hasChildNodes() || this.hasOnlyTemplateChilds()) {
      return template;
    } else {
      return null;
    }
  }
}
