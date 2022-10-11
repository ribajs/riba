import { Component } from "@ribajs/core";

export interface ComponentsExampleScope {
  defaultInputVal: string;
  anotherVal: string;
  requiredAttributeCo3?: any;
}

export class ComponentsExampleComponent extends Component {
  public static tagName = "rv-components-example";

  public scope: ComponentsExampleScope = {
    defaultInputVal: "Hello as attribute",
    anotherVal: "Hello as parent",
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init([]);

    setTimeout(() => {
      this.scope.requiredAttributeCo3 = "Defined after 3000ms";
    }, 3000);
  }

  protected async template() {
    const { default: template } = await import(
      "./components-example.component.html"
    );
    return template;
  }
}
