import { Component, TemplateFunction } from "@ribajs/core";

export class Page1PageComponent extends Component {
  public static tagName = "page-1-page";

  static get observedAttributes(): string[] {
    return [];
  }

  protected scope = {};

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Page1PageComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }
}
