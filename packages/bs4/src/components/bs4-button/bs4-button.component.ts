import { Component, EventDispatcher } from "@ribajs/core";

interface Scope {
  target: string;
  action: string;
  namespace: string;
  animationClass: string;
  //onClick: Bs4ButtonComponent["onClick"];
}

export class Bs4ButtonComponent extends Component {
  public static tagName = "bs4-button";

  protected autobind = true;

  protected eventDispatcher?: EventDispatcher;

  static get observedAttributes() {
    return ["target", "action", "namespace", "animation-class"];
  }

  protected scope: Scope = {
    target: "undefined",
    action: "undefined",
    namespace: "undefined",
    animationClass: "btn-animation-start",
    //onClick: this.onClick.bind(this),
  };

  constructor(element?: HTMLElement) {
    super(element);
    // console.debug('constructor', this);
    this.triggerEvent = this.triggerEvent.bind(this);
    console.debug("constructor");
  }

  // public onClick() {
  //   // console.debug('onClick');
  //   this.startAnimation();
  // }

  protected connectedCallback() {
    super.connectedCallback();
    console.debug("connectedCallback");
    this.init(Bs4ButtonComponent.observedAttributes);
    this.eventDispatcher = EventDispatcher.getInstance(this.scope.namespace);
    this.el.addEventListener("click", this.triggerEvent);
  }

  triggerEvent() {
    console.debug("triggerEvent", this.scope);
    this.eventDispatcher?.trigger(this.scope.action);
  }

  protected startAnimation() {
    this.el.classList.add(this.scope.animationClass);
  }

  protected onStartAnimation() {
    // console.debug('onStartAnimation');
  }

  protected onEndAnimation() {
    // window.getComputedStyle(this.el)
    // console.debug('onEndAnimation', event, window.getComputedStyle(this.el));

    setTimeout(() => {
      this.el.classList.remove(this.scope.animationClass);
    });
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes).then((view) => {
      this.onStartAnimation = this.onStartAnimation.bind(this);
      this.el.addEventListener(
        "webkitAnimationStart" as "animationstart",
        this.onStartAnimation
      );
      this.el.addEventListener("animationstart", this.onStartAnimation);
      this.onEndAnimation = this.onEndAnimation.bind(this);
      this.el.addEventListener(
        "webkitAnimationEnd" as "animationend",
        this.onEndAnimation
      );
      this.el.addEventListener("animationend", this.onEndAnimation);
      // this.el.addEventListener("click", this.scope.onClick);
      return view;
    });
  }

  protected async beforeBind() {
    return await super.beforeBind();
    // console.debug('beforeBind', this.scope);
  }

  protected async afterBind() {
    return await super.afterBind();
    // console.debug('afterBind', this.scope);
  }

  protected requiredAttributes() {
    return [];
  }

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace
    );
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
    this.el.removeEventListener(
      "webkitAnimationStart" as "animationstart",
      this.onStartAnimation
    );
    this.el.removeEventListener("animationstart", this.onStartAnimation);
    this.el.removeEventListener(
      "webkitAnimationEnd" as "animationend",
      this.onEndAnimation
    );
    this.el.removeEventListener("animationend", this.onEndAnimation);
    //this.el.removeEventListener("click", this.scope.onClick);
    this.el.removeEventListener("click", this.triggerEvent);
  }

  protected template() {
    return null;
  }
}
