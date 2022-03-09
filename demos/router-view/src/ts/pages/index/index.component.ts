import { Component, TemplateFunction } from "@ribajs/core/src/index.js";

export class IndexPageComponent extends Component {
  public static tagName = "index-page";

  static get observedAttributes(): string[] {
    return [];
  }

  public scope = {};

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(IndexPageComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }
}
