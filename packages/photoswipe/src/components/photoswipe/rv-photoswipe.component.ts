import {
  Component,
} from '@ribajs/core';

import * as Photoswipe from 'photoswipe';

interface Scope {

}

export class PhotoswipeComponent extends Component {

  public static tagName = 'rv-photoswipe';

  protected autobind = true;

  static get observedAttributes() {
    return [];
  }

  protected scope: Scope = {

  };

  constructor(element?: HTMLElement) {
    super(element);
    // console.debug('constructor', this);
  }


  protected connectedCallback() {
    super.connectedCallback();
    this.init(PhotoswipeComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes);
  }

  protected async beforeBind() {

    this.el.querySelectorAll('img')

    return await super.beforeBind();

    // console.debug('beforeBind', this.scope);
  }

  protected async afterBind() {
    console.debug('afterBind', this.scope);
    return await super.afterBind();
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
    return null;
  }
}
