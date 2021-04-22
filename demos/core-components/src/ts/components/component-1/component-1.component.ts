import { Component, TemplateFunction } from "@ribajs/core";
import template from "./component-1.component.html";

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

  protected template(): ReturnType<TemplateFunction> {
    return template;
  }
}
