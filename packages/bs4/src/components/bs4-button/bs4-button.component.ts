import {
  Component,
} from '@ribajs/core';

interface Scope {
  onClick: Bs4ButtonComponent['onClick'];
}

export class Bs4ButtonComponent extends Component {

  public static tagName: string = 'bs4-button';

  protected autobind = true;

  static get observedAttributes() {
    return [];
  }

  protected scope: Scope = {
    onClick: this.onClick,
  };

  constructor(element?: HTMLElement) {
    super(element);
    console.debug('constructor', this);
  }

  public onClick(event: Event) {
    console.debug('onClick');
    this.startAnimation();
  }

  protected startAnimation() {
    this.el.classList.add('btn-animation-start');
  }

  protected onStartAnimation(event: AnimationEvent) {
    console.debug('onStartAnimation');
  }

  protected onEndAnimation(event: AnimationEvent) {
    // window.getComputedStyle(this.el)
    console.debug('onEndAnimation', event, window.getComputedStyle(this.el));

    setTimeout(() => {
      this.el.classList.remove('btn-animation-start');
    });
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs4ButtonComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes)
    .then((view) => {
      this.el.addEventListener('webkitAnimationStart' as 'animationstart', this.onStartAnimation.bind(this));
      this.el.addEventListener('animationstart', this.onStartAnimation.bind(this));
      this.el.addEventListener('webkitAnimationEnd' as 'animationend', this.onEndAnimation.bind(this));
      this.el.addEventListener('animationend', this.onEndAnimation.bind(this));
      this.el.addEventListener('click', this.onClick.bind(this));
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
    this.el.removeEventListener('webkitAnimationStart' as 'animationstart', this.onStartAnimation.bind(this));
    this.el.removeEventListener('animationstart', this.onStartAnimation.bind(this));
    this.el.removeEventListener('webkitAnimationEnd' as 'animationend', this.onEndAnimation.bind(this));
    this.el.removeEventListener('animationend', this.onEndAnimation.bind(this));
    this.el.removeEventListener('click', this.onClick.bind(this));
  }

  protected template() {
    return null
  }
}
