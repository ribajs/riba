import { Component, TemplateFunction } from "@ribajs/core/src/index.js";

import template from "./bs4-tabs-tpl-example.component.html";

export class Bs4TabsTplExampleComponent extends Component {
  public static tagName = "rv-bs4-tabs-tpl-example";
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
