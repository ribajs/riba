import {
  Component,
} from '@ribajs/core';

import template from './bind-content.component.html';

export class BindContentComponent extends Component {

  public static tagName = 'rv-bind-content';

  protected autobind = false;

  protected content = '';

  protected scope = {};

  constructor(element?: HTMLElement) {
    super(element);
  }

  public bindContent() {
    this.el.classList.add('bound');
    this.el.innerHTML = this.content;
    this.el.removeEventListener('click', this.bindContent);
    this.bind();
  }

  protected connectedCallback() {
    this.el.addEventListener('click', this.bindContent);
    this.init([]);
  }

  protected template() {
    const firstElementChild = this.el.firstElementChild;
    if (!firstElementChild || firstElementChild.tagName !== 'TEMPLATE') {
      console.error('The child element must be a template');
      return null;
    }
    this.content = firstElementChild.innerHTML;
    return template;
  }
}
