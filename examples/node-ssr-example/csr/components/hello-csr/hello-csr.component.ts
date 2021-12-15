import { Component } from "@ribajs/core";
import pugTemplate from "./hello-csr.component.pug";

interface Scope {
  message: string;
}

export class HelloCsrComponent extends Component {
  public static tagName = "hello-csr";

  scope: Scope = {
    message: "I am the CSR Component ;)",
  };

  static get observedAttributes(): string[] {
    return [];
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(HelloCsrComponent.observedAttributes);
  }

  protected template() {
    return pugTemplate(this.scope);
  }
}
