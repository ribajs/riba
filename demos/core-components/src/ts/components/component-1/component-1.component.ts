import { Component } from "@ribajs/core";

export class Component1Component extends Component {
  public static tagName = "rv-component-1";

  public scope = {
    inputVal: "",
  };

  constructor() {
    super();
  }

  static get observedAttributes(): string[] {
    return ["input-val"];
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Component1Component.observedAttributes);
  }

  protected async template() {
    const { default: template } = await import("./component-1.component.html");
    return template;
  }
}
