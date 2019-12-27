import {
  Component,
} from '@ribajs/core';

import template from './slideshow-example.component.html';

export class SlideshowExampleComponent extends Component {

  public static tagName: string = 'rv-slideshow-example';

  protected autobind = true;

  static get observedAttributes() {
    return [];
  }

  protected scope = {};

  constructor(element?: HTMLElement) {
    super(element);
    console.debug('constructor', this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(SlideshowExampleComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes)
    .then((view) => {
      return view;
    });
  }

  protected async beforeBind() {
    super.beforeBind()
    .then(() => {
      console.debug('beforeBind', this.scope);
    });
  }

  protected async afterBind() {
    super.afterBind()
    .then(() => {
      console.debug('afterBind', this.scope);
    });
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
    // Only set the component template if there no childs already
    if (this.el.hasChildNodes()) {
      console.debug('Do not use template, because element has child nodes');
      return null;
    } else {
      console.debug('Use template', template);
      return template;
    }
  }
}
