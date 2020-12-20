import { Component } from "@ribajs/core";
import template from "./nav.component.html";

export class NavComponent extends Component {
  public static tagName = "rv-nav";

  static get observedAttributes() {
    return [];
  }

  protected scope = {};

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(NavComponent.observedAttributes);
  }

  protected requiredAttributes() {
    return [];
  }

  protected template() {
    return template;
  }
}
