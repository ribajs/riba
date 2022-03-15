import { Component, TemplateFunction } from "@ribajs/core/src/index.js";
import template from "./components-example.component.html";

export interface ComponentsExampleScope {
  defaultInputVal: string;
  anotherVal: string;
}

export class ComponentsExampleComponent extends Component {
  public static tagName = "rv-components-example";

  public scope: ComponentsExampleScope = {
    defaultInputVal: "Hello as attribute",
    anotherVal: "Hello as parent"
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
