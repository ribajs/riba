import {
  Component,
  EventDispatcher,
} from '@ribajs/core';

type State = 'undefined' | 'overlay-left' | 'overlay-right' | 'side-left' | 'side-right' | 'hidden';

interface Scope {
  targetId?: string;
  toggle: Bs4ToggleButtonComponent['toggle'];
  state: State;
  isClosed: boolean;
}

// TODO extend from Bs4ButtonComponent
export class Bs4ToggleButtonComponent extends Component {

  static get observedAttributes() {
    return ['target-id'];
  }

  public static tagName: string = 'bs4-toggle-button';

  protected autobind = true;

  protected eventDispatcher?: EventDispatcher;

  protected scope: Scope = {
    targetId: undefined,
    toggle: this.toggle,
    state: 'undefined',
    isClosed: false,
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  public toggle() {
    if (this.eventDispatcher) {
      this.eventDispatcher.trigger('toggle', this.scope.targetId);
    }
  }

  protected async afterBind() {
    await super.afterBind();
    // Trigger init to trigger there current state of all the components that are connected to this component
    return this.eventDispatcher?.trigger('init', this.scope.targetId);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs4ToggleButtonComponent.observedAttributes);
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
    // Triggered state triggered by `..trigger('init', ...`
    this.eventDispatcher.on('state', this.onToggledEvent.bind(this));
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
    if (!this.el.hasChildNodes()) {
      console.warn('No child elements found, this component as no template so you need to define your own as child of this component.');
    }
    return null;
  }
}
