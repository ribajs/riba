import { Component } from "@ribajs/core";
import template from "./vue-example.component.html";

export class VueExampleComponent extends Component {
  public static tagName = "vue-example";

  protected autobind = true;

  static get observedAttributes() {
    return [];
  }

  protected scope = {};

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(VueExampleComponent.observedAttributes);
  }

  protected requiredAttributes() {
    return [];
  }

  protected template() {
    return template;
  }
}
