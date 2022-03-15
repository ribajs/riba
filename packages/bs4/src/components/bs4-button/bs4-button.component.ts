import { Component, TemplateFunction } from "@ribajs/core/src/index.js";

interface Scope {
  animationClass: string;
  onClick: Bs4ButtonComponent["onClick"];
}

export class Bs4ButtonComponent extends Component {
  public static tagName = "bs4-button";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return ["animation-class"];
  }

  public scope: Scope = {
    animationClass: "btn-animation-start",
    onClick: this.onClick.bind(this)
  };

  constructor() {
    super();
  }

  public onClick() {
    this.startAnimation();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs4ButtonComponent.observedAttributes);
  }

  protected startAnimation() {
    this.classList.add(this.scope.animationClass);
  }

  protected onStartAnimation() {
    //
  }

  protected onEndAnimation() {
    setTimeout(() => {
      this.classList.remove(this.scope.animationClass);
    });
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes).then((view) => {
      this.onStartAnimation = this.onStartAnimation.bind(this);
      this.addEventListener(
        "webkitAnimationStart" as "animationstart",
        this.onStartAnimation
      );
      this.addEventListener("animationstart", this.onStartAnimation);
      this.onEndAnimation = this.onEndAnimation.bind(this);
      this.addEventListener(
        "webkitAnimationEnd" as "animationend",
        this.onEndAnimation
      );
      this.addEventListener("animationend", this.onEndAnimation);
      this.addEventListener("click", this.scope.onClick);
      return view;
    });
  }

  protected requiredAttributes(): string[] {
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

  // deconstruction
  protected disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener(
      "webkitAnimationStart" as "animationstart",
      this.onStartAnimation
    );
    this.removeEventListener("animationstart", this.onStartAnimation);
    this.removeEventListener(
      "webkitAnimationEnd" as "animationend",
      this.onEndAnimation
    );
    this.removeEventListener("animationend", this.onEndAnimation);
    this.removeEventListener("click", this.scope.onClick);
  }

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }
}
