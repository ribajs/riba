import { Component } from "@ribajs/core";

import template from "./bs4-tabs-attr-example.component.html";

export class Bs4TabsAttrExampleComponent extends Component {
  public static tagName = "rv-bs4-tabs-attr-example";

  protected scope = {};

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init([]);
  }

  protected template() {
    return template;
  }
}
