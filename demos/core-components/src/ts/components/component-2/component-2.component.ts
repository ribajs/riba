import { Component, TemplateFunction } from "@ribajs/core";
import template from "./component-2.component.html";

export class Component2Component extends Component {
  public static tagName = "rv-component-2";

  public scope = {
    myInputVal: "",
  };

  constructor() {
    super();
  }

  static get observedAttributes(): string[] {
    return ["my-input-val"];
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Component2Component.observedAttributes);
  }

  protected async afterBind() {
    console.debug("scope", this.scope);
  }

  protected template(): ReturnType<TemplateFunction> {
    return template;
  }
}
