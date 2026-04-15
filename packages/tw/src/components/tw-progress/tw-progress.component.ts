import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";
import template from "./tw-progress.component.html?raw";

export type ProgressType = "default" | "info" | "success" | "warning" | "error";
export type ProgressSize = "xs" | "sm" | "md" | "lg";

export interface Scope extends ScopeBase {
  value: number;
  max: number;
  type: ProgressType;
  showLabel: boolean;
  size: ProgressSize;
  percentage: number;
  striped: boolean;
  animated: boolean;
  barColorClass: string;
  barHeightClass: string;
  barClass: string;
}

export class TwProgressComponent extends Component {
  public static tagName = "tw-progress";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return [
      "value",
      "max",
      "type",
      "show-label",
      "size",
      "striped",
      "animated",
    ];
  }

  public scope: Scope = {
    value: 0,
    max: 100,
    type: "default",
    showLabel: false,
    size: "md",
    percentage: 0,
    striped: false,
    animated: false,
    barColorClass: "bg-blue-600 dark:bg-blue-500",
    barHeightClass: "h-4",
    barClass: "bg-blue-600 dark:bg-blue-500 h-4",
  };

  constructor() {
    super();
  }

  protected computePercentage(): number {
    if (this.scope.max <= 0) return 0;
    return Math.round((this.scope.value / this.scope.max) * 100);
  }

  protected getColorClass(): string {
    switch (this.scope.type) {
      case "info":
        return "bg-blue-500 dark:bg-blue-400";
      case "success":
        return "bg-green-500 dark:bg-green-400";
      case "warning":
        return "bg-yellow-500 dark:bg-yellow-400";
      case "error":
        return "bg-red-500 dark:bg-red-400";
      default:
        return "bg-blue-600 dark:bg-blue-500";
    }
  }

  protected getHeightClass(): string {
    switch (this.scope.size) {
      case "xs":
        return "h-1";
      case "sm":
        return "h-2";
      case "lg":
        return "h-6";
      default:
        return "h-4";
    }
  }

  protected updateComputed() {
    this.scope.percentage = this.computePercentage();
    this.scope.barColorClass = this.getColorClass();
    this.scope.barHeightClass = this.getHeightClass();
    this.scope.barClass = `${this.scope.barColorClass} ${this.scope.barHeightClass}`;
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TwProgressComponent.observedAttributes);
  }

  protected async afterBind() {
    this.updateComputed();
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
    this.updateComputed();
  }

  protected template(): ReturnType<TemplateFunction> {
    return template;
  }
}
