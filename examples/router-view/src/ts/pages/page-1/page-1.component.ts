import { Component } from "@ribajs/core";

export class Page1PageComponent extends Component {
  public static tagName = "page-1-page";

  static get observedAttributes() {
    return [];
  }

  protected scope = {};

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Page1PageComponent.observedAttributes);
  }

  protected requiredAttributes() {
    return [];
  }

  protected template() {
    return null;
  }
}
