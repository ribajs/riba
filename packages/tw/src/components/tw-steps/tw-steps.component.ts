import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";
import template from "./tw-steps.component.html?raw";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";

export interface StepItem {
  label: string;
  description?: string;
  state: "completed" | "current" | "upcoming";
  index: number;
}

export interface Scope extends ScopeBase {
  items: StepItem[];
  currentStep: number;
  orientation: "horizontal" | "vertical";
  goToStep: TwStepsComponent["goToStep"];
}

export class TwStepsComponent extends Component {
  public static tagName = "tw-steps";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return ["items", "current-step", "orientation"];
  }

  public scope: Scope = {
    items: [],
    currentStep: 0,
    orientation: "horizontal",
    goToStep: this.goToStep.bind(this),
  };

  constructor() {
    super();
  }

  public goToStep(_event: Event, _el: HTMLElement, step: StepItem) {
    this.scope.currentStep = step.index;
    this.updateStepStates();
    this.dispatchEvent(
      new CustomEvent("step-changed", {
        detail: { step: this.scope.currentStep },
        bubbles: true,
      }),
    );
  }

  protected updateStepStates() {
    for (const item of this.scope.items) {
      if (item.index < this.scope.currentStep) {
        item.state = "completed";
      } else if (item.index === this.scope.currentStep) {
        item.state = "current";
      } else {
        item.state = "upcoming";
      }
    }
  }

  protected initItemsFromAttribute() {
    if (this.scope.items && this.scope.items.length > 0) {
      // Items may have been passed as a JSON attribute; normalize them
      this.scope.items = this.scope.items.map((item, index) => ({
        label: item.label,
        description: item.description || undefined,
        state: "upcoming" as const,
        index,
      }));
      this.updateStepStates();
    }
  }

  protected initItemsFromTemplates() {
    const templates = Array.from(this.querySelectorAll("template"));
    if (templates.length > 0) {
      this.scope.items = templates.map((tpl, index) => ({
        label: tpl.getAttribute("title") || tpl.getAttribute("label") || `Step ${index + 1}`,
        description: tpl.getAttribute("description") || undefined,
        state: "upcoming" as const,
        index,
      }));
      this.updateStepStates();
    }
  }

  protected connectedCallback() {
    super.connectedCallback();
    if (!this.scope.items.length) {
      this.initItemsFromTemplates();
    }
    this.init(TwStepsComponent.observedAttributes);
  }

  protected async afterBind() {
    this.initItemsFromAttribute();
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
    if (attributeName === "currentStep" || attributeName === "items") {
      this.initItemsFromAttribute();
    }
  }

  protected template(): ReturnType<TemplateFunction> {
    if (!hasChildNodesTrim(this)) {
      return template;
    }
    // If the element only contains <template> children, use our template
    const children = Array.from(this.childNodes);
    const hasOnlyTemplates = children.every(
      (child) =>
        child.nodeType === Node.COMMENT_NODE ||
        (child.nodeType === Node.TEXT_NODE && !child.textContent?.trim()) ||
        (child instanceof HTMLTemplateElement),
    );
    if (hasOnlyTemplates) {
      return template;
    }
    return null;
  }
}
