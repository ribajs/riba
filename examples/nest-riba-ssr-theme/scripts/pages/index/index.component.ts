import { PageComponent } from "@ribajs/ssr";

import pugTemplate from "./index.component.pug";

export interface Scope {
  title: string;
  content: string;
  obj: any;
}

export class IndexPageComponent extends PageComponent {
  public static tagName = "index-page";
  public _debug = true;
  protected autobind = true;

  protected head = {
    title: "You are on home",
  };

  scope: Scope = {
    title: "Hello from ssr",
    content: "When you can see this, ssr works :)",
    obj: {
      foo: "bar",
      note: "This is an example to test the json formatter",
    },
  };

  static get observedAttributes(): string[] {
    return [];
  }

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(IndexPageComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected async beforeBind() {
    await super.beforeBind();
  }

  protected async afterBind() {
    await super.afterBind();
  }

  protected template(): ReturnType<TemplateFunction> {
    return pugTemplate(this.scope);
  }
}
