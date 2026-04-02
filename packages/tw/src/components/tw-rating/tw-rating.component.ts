import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";
import template from "./tw-rating.component.html?raw";

export interface Star {
  index: number;
  filled: boolean;
  half: boolean;
}

export interface Scope extends ScopeBase {
  value: number;
  max: number;
  readonly: boolean;
  size: string;
  stars: Star[];
  setRating: TwRatingComponent["setRating"];
  onHover: TwRatingComponent["onHover"];
  onLeave: TwRatingComponent["onLeave"];
  hoverValue: number;
  sizeClass: string;
}

export class TwRatingComponent extends Component {
  public static tagName = "tw-rating";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return ["value", "max", "readonly", "size"];
  }

  public scope: Scope = {
    value: 0,
    max: 5,
    readonly: false,
    size: "md",
    stars: [],
    setRating: this.setRating.bind(this),
    onHover: this.onHover.bind(this),
    onLeave: this.onLeave.bind(this),
    hoverValue: 0,
    sizeClass: "h-6 w-6",
  };

  constructor() {
    super();
  }

  public setRating(_event: Event, _el: HTMLElement, star: Star) {
    if (this.scope.readonly) return;
    this.scope.value = star.index + 1;
    this.scope.hoverValue = 0;
    this.updateStars();
    this.dispatchEvent(
      new CustomEvent("rating-changed", {
        detail: { value: this.scope.value },
        bubbles: true,
      }),
    );
  }

  public onHover(_event: Event, _el: HTMLElement, star: Star) {
    if (this.scope.readonly) return;
    this.scope.hoverValue = star.index + 1;
    this.updateStars();
  }

  public onLeave() {
    if (this.scope.readonly) return;
    this.scope.hoverValue = 0;
    this.updateStars();
  }

  protected computeStars(): Star[] {
    const displayValue = this.scope.hoverValue || this.scope.value;
    const stars: Star[] = [];

    for (let i = 0; i < this.scope.max; i++) {
      const filled = i < Math.floor(displayValue);
      const half = !filled && i < displayValue && displayValue - i >= 0.5;
      stars.push({ index: i, filled, half });
    }

    return stars;
  }

  protected getSizeClass(): string {
    switch (this.scope.size) {
      case "xs":
        return "h-3 w-3";
      case "sm":
        return "h-4 w-4";
      case "lg":
        return "h-8 w-8";
      case "xl":
        return "h-10 w-10";
      default:
        return "h-6 w-6";
    }
  }

  protected updateStars() {
    this.scope.stars = this.computeStars();
    this.scope.sizeClass = this.getSizeClass();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TwRatingComponent.observedAttributes);
  }

  protected async afterBind() {
    this.updateStars();
    await super.afterBind();
  }

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null,
  ) {
    super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace,
    );
    this.updateStars();
  }

  protected template(): ReturnType<TemplateFunction> {
    return template;
  }
}
