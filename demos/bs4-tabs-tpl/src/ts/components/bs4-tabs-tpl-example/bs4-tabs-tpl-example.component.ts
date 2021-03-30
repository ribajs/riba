import { Component, TemplateFunction } from "@ribajs/core";

import template from "./bs4-tabs-tpl-example.component.html";

export class Bs4TabsTplExampleComponent extends Component {
  public static tagName = "rv-bs4-tabs-tpl-example";
  protected scope = {};
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
