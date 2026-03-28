import { Component } from "@ribajs/core";

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

  protected async template() {
    const { default: template } = await import("./nav.component.html?raw");
    return template;
  }
}
