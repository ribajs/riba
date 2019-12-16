import {
  Component,
} from '@ribajs/core';

import template from './touch-events-example.component.html';

interface Scope {
  log: TouchEventsExampleComponent['log'];
  log2: TouchEventsExampleComponent['log2'];
}

export class TouchEventsExampleComponent extends Component {

  public static tagName: string = 'rv-touch-events-example';

  protected autobind = true;

  protected consoleElement?: HTMLDivElement;
  // TODO REMOVE
  protected consoleElement2?: HTMLDivElement;
  protected touchZoneElement?: HTMLDivElement;

  static get observedAttributes() {
    return [];
  }

  protected scope: Scope = {
    log: this.log,
    log2: this.log2,
  };

  constructor(element?: HTMLElement) {
    super(element);
    console.debug('constructor', this);
  }

  public log(eventName: string, binder: any, event: JQuery.Event) {
    console.info(eventName + ' called', event.type, (event as any));
    if (this.consoleElement) {
      let html = `<p class="log"><span class="name">${eventName} called</span>`;
      // For vanilla Version
      if ((event as any).detail && (event as any).detail.offset) {
        html += `<span class="time">(X: ${(event as any).detail.offset.x} Y: ${(event as any).detail.offset.y})</span>`;
      }
      html += '<span class="time">' + new Date().toLocaleTimeString() + '</span></p>';
      this.consoleElement.insertAdjacentHTML('afterbegin', html);
    }
  }

  // TODO REMOVE
  public log2(eventName: string, binder: any, event: JQuery.Event) {
    console.info(eventName + ' called', event.type, (event as any));
    if (this.consoleElement2) {
      let html = `<p class="log"><span class="name">${eventName} called</span>`;
      // For JQuery Version
      if ((event as any).data && (event as any).data.offset) {
        html += `<span class="time">(X: ${(event as any).data.offset.x} Y: ${(event as any).data.offset.y})</span>`;
      }
      html += '<span class="time">' + new Date().toLocaleTimeString() + '</span></p>';
      this.consoleElement2.insertAdjacentHTML('afterbegin', html);
    }
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TouchEventsExampleComponent.observedAttributes);
  }

  protected async beforeBind() {
    super.beforeBind()
    .then(() => {
      console.debug('beforeBind', this.scope);
      this.consoleElement = this.el.querySelector('#console');
      this.consoleElement2 = this.el.querySelector('#console2');
      this.touchZoneElement = this.el.querySelector('#touch-zone');
    });
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
