import { Component } from "@ribajs/core";

export class IndexPageComponent extends Component {
  public static tagName = "index-page";

  static get observedAttributes() {
    return [];
  }

  protected scope = {};

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(IndexPageComponent.observedAttributes);
  }

  protected requiredAttributes() {
    return [];
  }

  protected template() {
    return null;
  }
}
