import { PageComponent } from "@ribajs/ssr";

import template from "./index.page-component.html";

export interface Scope {
  foo: string;
}

export class IndexPageComponent extends PageComponent {
  public static tagName = "index-page";
  public _debug = false;
  protected autobind = true;

  scope: Scope = {
    foo: "bar",
  };

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
