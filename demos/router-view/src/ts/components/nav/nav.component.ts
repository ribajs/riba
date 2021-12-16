import { Component, TemplateFunction } from "@ribajs/core";
import template from "./nav.component.html";

export class NavComponent extends Component {
  public static tagName = "rv-nav";

  static get observedAttributes(): string[] {
    return [];
  }

  public scope = {};

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(NavComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected template(): ReturnType<TemplateFunction> {
    return template;
  }
}
