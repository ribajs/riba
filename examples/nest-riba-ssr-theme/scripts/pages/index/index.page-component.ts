import { PageComponent } from "@ribajs/ssr";

import template from "./index.page-component.html";

export interface Scope {
  title: string;
  content: string;
  obj: any;
}

export class IndexPageComponent extends PageComponent {
  public static tagName = "index-page";
  public _debug = true;
  protected autobind = true;

  scope: Scope = {
    title: "Hello from ssr",
    content: "When you can see this, ssr works :)",
    obj: {
      foo: "bar",
      note: "This is an example to test the json formatter",
    },
  };

  routes = [];

  static get observedAttributes() {
    return [];
  }

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(IndexPageComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected async beforeBind() {
    super.beforeBind();
  }

  protected async afterBind() {
    super.afterBind();
  }

  protected template() {
    return template;
  }
}
