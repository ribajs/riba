import {
  Component,
} from '@ribajs/core';

import template from './touch-events-example.component.html';

interface Scope {
  onEvent: TouchEventsExampleComponent['onEvent'];
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
    onEvent: this.onEvent,
  };

  constructor(element?: HTMLElement) {
    super(element);
    console.debug('constructor', this);
  }

  public onEvent() {
    console.debug(event);
    // this.log();
  }

  public log(eventName: string, event: JQuery.Event, offset: {x: number, y: number}) {
    console.info(eventName + ' called', event.type);
    if (this.consoleElement) {
      this.consoleElement.insertAdjacentHTML('afterbegin', '<p class="log"><span class="name">' + eventName + ' called</span><span class="time">' + new Date().toLocaleTimeString() + '</span></p>');
    }
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TouchEventsExampleComponent.observedAttributes);
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
      this.consoleElement = this.el.querySelector('#console');
      console.debug('this.consoleElement', this.consoleElement);
      this.touchZoneElement = this.el.querySelector('#touch-zone');
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
