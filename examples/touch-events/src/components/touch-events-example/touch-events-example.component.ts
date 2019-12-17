import {
  Component,
} from '@ribajs/core';

import template from './touch-events-example.component.html';

interface Scope {
  log: TouchEventsExampleComponent['log'];
}

export class TouchEventsExampleComponent extends Component {

  public static tagName: string = 'rv-touch-events-example';

  protected autobind = true;

  protected consoleElement?: HTMLDivElement;
  protected touchZoneElement?: HTMLDivElement;

  static get observedAttributes() {
    return [];
  }

  protected scope: Scope = {
    log: this.log,
  };

  constructor(element?: HTMLElement) {
    super(element);
    // console.debug('constructor', this);
  }

  public log(eventName: string, binder: any, event: Event) {
    // console.debug(eventName + ' called', event.type, (event as any), (event as any).detail);
    if (this.consoleElement) {
      let html = `<p class="log"><span class="name">${eventName}</span>`;
      if ((event as any).detail && (event as any).detail.offset) {
        html += `<span class="detail">(X: ${(event as any).detail.offset.x} Y: ${(event as any).detail.offset.y})</span>`;
      }
      html += '<span class="time">' + new Date().toLocaleTimeString() + '</span></p>';
      this.consoleElement.insertAdjacentHTML('afterbegin', html);
    }
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TouchEventsExampleComponent.observedAttributes);
  }

  protected async beforeBind() {
    super.beforeBind()
    .then(() => {
      // console.debug('beforeBind', this.scope);
      this.consoleElement = this.el.querySelector('.console');
      this.touchZoneElement = this.el.querySelector('.touch-zone');
    });
  }

  protected template() {
    // Only set the component template if there no childs already
    if (this.el.hasChildNodes()) {
      return null;
    } else {
      return template;
    }
  }
}
