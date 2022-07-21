import { Component } from "@ribajs/core";
import { ComponentsExampleScope } from "../components-example/components-example.component.js";

export interface Component2Scope {
  myInputVal: string;
  $parent: ComponentsExampleScope | null;
}

export class Component2Component extends Component {
  public static tagName = "rv-component-2";

  public scope: Component2Scope = {
    myInputVal: "",
    $parent: null,
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
    this.debug("scope", this.scope);
  }

  protected async template() {
    const { default: template } = await import("./component-2.component.html");
    return template;
  }
}
