import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";

export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface Scope extends ScopeBase {
  content: string;
  position: TooltipPosition;
}

export class TwTooltipComponentComponent extends Component {
  public static tagName = "tw-tooltip";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return ["content", "position"];
  }

  public scope: Scope = {
    content: "",
    position: "top",
  };

  constructor() {
    super();
  }

  protected getPositionClasses(): string[] {
    switch (this.scope.position) {
      case "bottom":
        return ["tw-tooltip", "tw-tooltip-bottom"];
      case "left":
        return ["tw-tooltip", "tw-tooltip-left"];
      case "right":
        return ["tw-tooltip", "tw-tooltip-right"];
      default:
        return ["tw-tooltip", "tw-tooltip-top"];
    }
  }

  protected updateTooltip() {
    // Set the tooltip content via data attribute
    this.setAttribute("data-tooltip", this.scope.content);

    // Remove old position classes
    this.classList.remove(
      "tw-tooltip",
      "tw-tooltip-top",
      "tw-tooltip-bottom",
      "tw-tooltip-left",
      "tw-tooltip-right",
    );

    // Add new position classes
    const classes = this.getPositionClasses();
    for (const cls of classes) {
      this.classList.add(cls);
    }
  }

  protected injectStyles() {
    const styleId = "tw-tooltip-component-styles";
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      .tw-tooltip {
        position: relative;
        display: inline-block;
      }

      .tw-tooltip::before {
        content: attr(data-tooltip);
        position: absolute;
        padding: 0.375rem 0.75rem;
        font-size: 0.75rem;
        line-height: 1rem;
        font-weight: 500;
        color: #fff;
        background-color: #1f2937;
        border-radius: 0.375rem;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.15s ease-in-out, visibility 0.15s ease-in-out;
        pointer-events: none;
        z-index: 50;
      }

      .tw-tooltip::after {
        content: '';
        position: absolute;
        border: 5px solid transparent;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.15s ease-in-out, visibility 0.15s ease-in-out;
        pointer-events: none;
        z-index: 50;
      }

      .tw-tooltip:hover::before,
      .tw-tooltip:hover::after {
        opacity: 1;
        visibility: visible;
      }

      /* Top (default) */
      .tw-tooltip-top::before {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 5px;
      }
      .tw-tooltip-top::after {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-top-color: #1f2937;
      }

      /* Bottom */
      .tw-tooltip-bottom::before {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 5px;
      }
      .tw-tooltip-bottom::after {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-bottom-color: #1f2937;
      }

      /* Left */
      .tw-tooltip-left::before {
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-right: 5px;
      }
      .tw-tooltip-left::after {
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-left-color: #1f2937;
      }

      /* Right */
      .tw-tooltip-right::before {
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-left: 5px;
      }
      .tw-tooltip-right::after {
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-right-color: #1f2937;
      }

      /* Dark mode (class-based via ThemeService) */
      .dark .tw-tooltip::before,
      .dark.tw-tooltip::before {
        background-color: #e5e7eb;
        color: #111827;
      }
      .dark .tw-tooltip-top::after,
      .dark.tw-tooltip-top::after {
        border-top-color: #e5e7eb;
      }
      .dark .tw-tooltip-bottom::after,
      .dark.tw-tooltip-bottom::after {
        border-bottom-color: #e5e7eb;
      }
      .dark .tw-tooltip-left::after,
      .dark.tw-tooltip-left::after {
        border-left-color: #e5e7eb;
      }
      .dark .tw-tooltip-right::after,
      .dark.tw-tooltip-right::after {
        border-right-color: #e5e7eb;
      }
    `;
    document.head.appendChild(style);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.injectStyles();
    this.init(TwTooltipComponentComponent.observedAttributes);
  }

  protected async afterBind() {
    this.updateTooltip();
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
    this.updateTooltip();
  }

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }
}
