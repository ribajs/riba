import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import template from "./tw-card.component.html?raw";

interface Scope extends ScopeBase {
  imageSrc: string;
  imageAlt: string;
  title: string;
  compact: boolean;
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
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TwCardComponent.observedAttributes);
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
