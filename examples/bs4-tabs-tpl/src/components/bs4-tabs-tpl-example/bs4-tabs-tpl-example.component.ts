import { Component } from '@ribajs/core';

import template from './bs4-tabs-tpl-example.component.html';

export class Bs4TabsTplExampleComponent extends Component {
  public static tagName: string = 'rv-bs4-tabs-tpl-example';
  protected scope = {};
  constructor(element?: HTMLElement) {
    super(element);
  }
  protected connectedCallback() {
    super.connectedCallback();
    this.init([]);
  }
  protected template() {
    return template;
  }
}
