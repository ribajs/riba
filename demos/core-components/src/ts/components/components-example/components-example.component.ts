import { Component, TemplateFunction } from "@ribajs/core";
import template from "./components-example.component.html";

export class ComponentsExampleComponent extends Component {
  public static tagName = "rv-components-example";

  public scope = {
    defaultInputVal: "Hello",
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init([]);
  }

  protected template(): ReturnType<TemplateFunction> {
    return template;
  }
}
