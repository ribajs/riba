import { Component } from "@ribajs/core";
import template from "./vue-example-wrapper.component.html";

export class VueExampleWrapperComponent extends Component {
  public static tagName = "vue-example-wrapper";

  protected autobind = true;

  static get observedAttributes() {
    return [];
  }

  protected scope = {
    message: "Message from Riba.js to Vue.js and back",
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(VueExampleWrapperComponent.observedAttributes);
  }

  protected requiredAttributes() {
    return [];
  }

  protected template() {
    return template;
  }
}
