import {
  Component,
  EventDispatcher,
} from '@ribajs/core';

import template from './bs4-toggle-button.component.html';

type State = 'undefined' | 'overlay-left' | 'overlay-right' | 'side-left' | 'side-right' | 'hidden';

interface Scope {
  targetId?: string;
  toggle: Bs4ToggleButtonComponent['toggle'];
  state: State;
  isClosed: boolean;
}

export class Bs4ToggleButtonComponent extends Component {

  public static tagName: string = 'bs4-toggle-button';

  protected autobind = true;

  static get observedAttributes() {
    return ['target-id'];
  }

  protected eventDispatcher?: EventDispatcher;

  protected scope: Scope = {
    targetId: undefined,
    toggle: this.toggle,
    state: 'undefined',
    isClosed: false,
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.init(Bs4ToggleButtonComponent.observedAttributes);
  }

  public toggle() {
    if (this.eventDispatcher) {
      this.eventDispatcher.trigger('toggle', this.scope.targetId);
    }
  }

  protected onToggledEvent(state: State) {
    this.scope.state = state;
    this.scope.isClosed = state === 'hidden';
  }

  protected initEventDispatcher(id: string) {
    if (this.eventDispatcher) {
      this.eventDispatcher.off('toggled', this.onToggledEvent);
    }
    this.eventDispatcher = new EventDispatcher('bs4-toggle-button:' + id);
    this.eventDispatcher.on('toggled', this.onToggledEvent.bind(this));
  }

  protected requiredAttributes() {
    return ['targetId'];
  }

  protected attributeChangedCallback(attributeName: string, oldValue: any, newValue: any, namespace: string | null) {
    super.attributeChangedCallback(attributeName, oldValue, newValue, namespace);
  }

  protected parsedAttributeChangedCallback(attributeName: string, oldValue: any, newValue: any, namespace: string | null) {
    super.parsedAttributeChangedCallback(attributeName, oldValue, newValue, namespace);
    if (attributeName === 'targetId' && newValue) {
      this.initEventDispatcher(newValue);
    }
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
    if (this.eventDispatcher) {
      this.eventDispatcher.off('toggled', this.onToggledEvent);
    }
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
