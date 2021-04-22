import { Component, TemplateFunction } from "@ribajs/core";

import template from "./bs4-tabs-attr-example.component.html";

export class Bs4TabsAttrExampleComponent extends Component {
  public static tagName = "rv-bs4-tabs-attr-example";

  public scope = {};

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init([]);
  }

  protected template(): ReturnType<TemplateFunction> {
    return template;
  }
}
