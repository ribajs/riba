import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import template from "./tw-card.component.html?raw";

interface Scope extends ScopeBase {
  imageSrc: string;
  imageAlt: string;
  title: string;
  compact: boolean;
  paddingClass: string;
  titleSizeClass: string;
}

export class TwCardComponent extends Component {
  public static tagName = "tw-card";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return ["image-src", "image-alt", "title", "compact"];
  }

  public scope: Scope = {
    imageSrc: "",
    imageAlt: "",
    title: "",
    compact: false,
    paddingClass: "p-5",
    titleSizeClass: "text-xl",
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TwCardComponent.observedAttributes);
  }

  protected updateComputedClasses() {
    this.scope.paddingClass = this.scope.compact ? "p-3" : "p-5";
    this.scope.titleSizeClass = this.scope.compact ? "text-lg" : "text-xl";
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.updateComputedClasses();
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
    if (attributeName === "compact") {
      this.updateComputedClasses();
    }
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected template(): ReturnType<TemplateFunction> {
    if (hasChildNodesTrim(this)) {
      return null;
    }
    return template;
  }
}
