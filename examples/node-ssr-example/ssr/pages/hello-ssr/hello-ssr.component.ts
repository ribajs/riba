import { PageComponent } from "@ribajs/ssr";
import pugTemplate from "./hello-ssr.component.pug";

interface Scope {
  title: string;
  message: string;
}

export class HelloSsrPageComponent extends PageComponent {
  public static tagName = "hello-ssr-page";

  scope: Scope = {
    title: "SSR Example",
    message: "I am the SSR Page Component :)",
  };

  static get observedAttributes(): string[] {
    return [];
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(HelloSsrPageComponent.observedAttributes);
  }

  protected async beforeBind() {
    this.head.title = this.scope.title;
    await super.beforeBind();
  }

  protected template() {
    return pugTemplate(this.scope);
  }
}
