import { Component, TemplateFunction } from "@ribajs/core/src/index.js";
import template from "./vue-example-wrapper.component.html";

export class VueExampleWrapperComponent extends Component {
  public static tagName = "vue-example-wrapper";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return [];
  }

  public scope = {
    message: "Message from Riba.js to Vue.js and back",
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(VueExampleWrapperComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected template(): ReturnType<TemplateFunction> {
    return template;
  }
}
