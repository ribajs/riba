import { Component } from "@ribajs/core";

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
  protected async template() {
    const { default: template } = await import(
      "./bs4-tabs-tpl-example.component.html"
    );
    return template;
  }
}
