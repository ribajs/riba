import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";
import template from "./tw-skeleton.component.html?raw";

type SkeletonType = "text" | "circle" | "rect" | "card";

interface Scope extends ScopeBase {
  type: SkeletonType;
  width: string;
  height: string;
  lines: number;
  lineArray: number[];
}

export class TwSkeletonComponent extends Component {
  public static tagName = "tw-skeleton";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return ["type", "width", "height", "lines"];
  }

  public scope: Scope = {
    type: "text",
    width: "",
    height: "",
    lines: 3,
    lineArray: [0, 1, 2],
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TwSkeletonComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
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
    if (attributeName === "lines") {
      this.updateLineArray();
    }
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.updateLineArray();
  }

  protected updateLineArray() {
    const count = Math.max(1, Number(this.scope.lines) || 3);
    this.scope.lineArray = Array.from({ length: count }, (_, i) => i);
  }

  protected template(): ReturnType<TemplateFunction> {
    return template;
  }
}
