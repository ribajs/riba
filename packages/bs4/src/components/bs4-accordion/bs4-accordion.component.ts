import {
  Binding,
  handleizeFormatter,
} from '@ribajs/core';
import { CollapseService } from '../../services/collapse.service';

import { TemplatesComponent } from '../templates/templates.component';

import template from './bs4-accordion.component.html';

interface AccordionItem {
  title: string;
  content: string;
  show: boolean;
}

interface Scope {
  items: AccordionItem[];
  toggle: Bs4AccordionComponent['toggle'];
  CLASSNAME: typeof CollapseService.CLASSNAME;
}

export class Bs4AccordionComponent extends TemplatesComponent {

  public static tagName: string = 'bs4-accordion';

  protected autobind = true;

  protected templateAttributes = [
    {
      name: 'title',
      required: true,
    },
  ];

  // protected collapseService?: CollapseService;

  static get observedAttributes() {
    return [];
  }

  protected scope: Scope = {
    items: [],
    toggle: this.toggle,
    CLASSNAME: CollapseService.CLASSNAME,
  };

  constructor(element?: HTMLElement) {
    super(element);
    console.debug('constructor', this);
  }

  public toggle(item: AccordionItem, index: number, binding: Binding, event: Event, model: any, element: HTMLElement) {
    console.debug('item', item);
    console.debug('index', index);
    const target = this.el.querySelector<HTMLElement>(`[data-index="${index}"]`);
    const others = this.el.querySelectorAll<HTMLElement>(`[data-index]:not([data-index="${index}"])`);
    console.debug('target', target);
    if (others) {
      CollapseService.hideAll(others);
    }
    if (target) {
      CollapseService.toggle(target);
    }
    item.show = true;
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
    console.debug('beforeBind');
  }

  protected async afterBind() {
    console.debug('afterBind', this.scope);
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
