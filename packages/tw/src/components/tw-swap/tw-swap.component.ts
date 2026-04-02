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

    if (this.scope.active) {
      // Show ON element, hide OFF element
      this.onEl.style.display = "";
      this.offEl.style.display = "none";

      // Apply animation classes
      this.onEl.classList.remove("tw-swap-out");
      this.onEl.classList.add("tw-swap-in");
      this.offEl.classList.remove("tw-swap-in");
      this.offEl.classList.add("tw-swap-out");
    } else {
      // Show OFF element, hide ON element
      this.offEl.style.display = "";
      this.onEl.style.display = "none";

      this.offEl.classList.remove("tw-swap-out");
      this.offEl.classList.add("tw-swap-in");
      this.onEl.classList.remove("tw-swap-in");
      this.onEl.classList.add("tw-swap-out");
    }

    // Set animation type attribute for CSS
    this.setAttribute("data-animation", animation);
  }

  protected setupStyles() {
    this.style.display = "inline-flex";
    this.style.position = "relative";
    this.style.cursor = "pointer";

    // Set up transition styles on children
    if (this.onEl) {
      this.onEl.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    }
    if (this.offEl) {
      this.offEl.style.transition = "transform 0.3s ease, opacity 0.3s ease";
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
