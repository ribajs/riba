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

  public setRating(star: Star) {
    console.log("[tw-rating] setRating called with:", star);
    console.log("[tw-rating] star type:", typeof star, "star.index:", star?.index);
    if (this.scope.readonly) {
      console.log("[tw-rating] readonly, skipping");
      return;
    }
    const oldValue = this.scope.value;
    this.scope.value = star.index + 1;
    console.log("[tw-rating] value changed:", oldValue, "->", this.scope.value);
    this.scope.hoverValue = 0;
    this.updateStars();
    console.log("[tw-rating] stars after update:", JSON.stringify(this.scope.stars));
    this.dispatchEvent(
      new CustomEvent("rating-changed", {
        detail: { value: this.scope.value },
        bubbles: true,
      }),
    );
  }

  public onHover(star: Star) {
    console.log("[tw-rating] onHover called with:", star);
    if (this.scope.readonly) return;
    this.scope.hoverValue = star.index + 1;
    this.updateStars();
  }

  public onLeave() {
    console.log("[tw-rating] onLeave");
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
    const displayValue = this.scope.hoverValue || this.scope.value;
    const max = this.scope.max;

    // If stars array doesn't exist yet or size changed, create it
    if (this.scope.stars.length !== max) {
      this.scope.stars = this.computeStars();
    } else {
      // Mutate existing star objects so rv-each child views
      // detect property changes via their observers
      for (let i = 0; i < max; i++) {
        const filled = i < Math.floor(displayValue);
        const half = !filled && i < displayValue && displayValue - i >= 0.5;
        this.scope.stars[i].filled = filled;
        this.scope.stars[i].half = half;
      }
    }
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
