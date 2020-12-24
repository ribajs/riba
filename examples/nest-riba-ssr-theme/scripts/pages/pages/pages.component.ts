import { PageComponent } from "@ribajs/ssr";

import pugTemplate from "./pages.component.pug";

export interface Scope {
  title: string;
  content: string;
}

export class PagesPageComponent extends PageComponent {
  public static tagName = "pages-page";
  public _debug = true;
  protected autobind = true;

  scope: Scope = {
    title: "About",
    content: "<p>We are cool!</a>",
  };

  static get observedAttributes() {
    return [];
  }

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(PagesPageComponent.observedAttributes);
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
    return pugTemplate(this.scope);
  }
}
