import {
  RibaComponent,
  Debug,
} from '@ribajs/core';

import template from './each-item-example.component.html';

interface IScope {
  hello?: string;
}

export class EachItemExampleComponent extends RibaComponent {

  public static tagName: string = 'rv-each-item-example';

  protected autobind = true;

  static get observedAttributes() {
    return ['hello'];
  }

  protected debug = Debug('component:' +EachItemExampleComponent.tagName);

  protected scope: IScope = {
    hello: undefined,
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.debug('constructor', this);
    this.init(EachItemExampleComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes)
    .then((view) => {
      return view;
    });
  }

  protected async beforeBind() {
    this.debug('beforeBind');
  }

  protected async afterBind() {
    this.debug('afterBind', this.scope);
  }

  protected requiredAttributes() {
    return [];
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
