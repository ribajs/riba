import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";

export type SwapAnimation = "rotate" | "flip" | "fade";

export interface Scope extends ScopeBase {
  active: boolean;
  animation: SwapAnimation;
  toggle: TwSwapComponent["toggle"];
}

export class TwSwapComponent extends Component {
  public static tagName = "tw-swap";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return ["active", "animation"];
  }

  public scope: Scope = {
    active: false,
    animation: "rotate",
    toggle: this.toggle.bind(this),
  };

  protected onEl: HTMLElement | null = null;
  protected offEl: HTMLElement | null = null;

  constructor() {
    super();
  }

  public toggle() {
    this.scope.active = !this.scope.active;
    this.updateSwapState();
    this.dispatchEvent(
      new CustomEvent("swap-changed", {
        detail: { active: this.scope.active },
        bubbles: true,
      }),
    );
  }

  protected findSwapChildren() {
    this.onEl = this.querySelector("[data-swap-on]");
    this.offEl = this.querySelector("[data-swap-off]");
  }

  protected updateSwapState() {
    if (!this.onEl || !this.offEl) {
      this.findSwapChildren();
    }
    if (!this.onEl || !this.offEl) {
      return;
    }

    const animation = this.scope.animation;
    this.setAttribute("data-animation", animation);

    const showEl = this.scope.active ? this.onEl : this.offEl;
    const hideEl = this.scope.active ? this.offEl : this.onEl;

    // Position both absolutely so they overlap
    showEl.style.position = "relative";
    showEl.style.opacity = "1";
    showEl.style.pointerEvents = "";
    hideEl.style.position = "absolute";
    hideEl.style.opacity = "0";
    hideEl.style.pointerEvents = "none";

    // Apply animation transforms
    switch (animation) {
      case "rotate":
        showEl.style.transform = "rotate(0deg)";
        hideEl.style.transform = "rotate(180deg)";
        break;
      case "flip":
        showEl.style.transform = "scaleY(1)";
        hideEl.style.transform = "scaleY(0)";
        break;
      case "fade":
      default:
        showEl.style.transform = "";
        hideEl.style.transform = "";
        break;
    }
  }

  protected setupStyles() {
    this.style.display = "inline-flex";
    this.style.alignItems = "center";
    this.style.justifyContent = "center";
    this.style.position = "relative";
    this.style.cursor = "pointer";

    const transition = "transform 0.3s ease, opacity 0.3s ease";
    if (this.onEl) {
      this.onEl.style.transition = transition;
      this.onEl.style.top = "0";
      this.onEl.style.left = "0";
    }
    if (this.offEl) {
      this.offEl.style.transition = transition;
      this.offEl.style.top = "0";
      this.offEl.style.left = "0";
    }
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this.scope.toggle);
    this.init(TwSwapComponent.observedAttributes);
  }

  protected async afterBind() {
    this.findSwapChildren();
    this.setupStyles();
    this.updateSwapState();
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
    if (attributeName === "active") {
      this.updateSwapState();
    }
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this.scope.toggle);
  }

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }
}
