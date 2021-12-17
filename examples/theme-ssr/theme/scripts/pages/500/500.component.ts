import { PageComponent, ErrorObj } from "@ribajs/ssr";
import pugTemplate from "./500.component.pug";

export interface Scope {
  title: string;
  content: string;
  params: InternalErrorPageComponent["ctx"]["params"];
  error?: ErrorObj;
}

export class InternalErrorPageComponent extends PageComponent {
  public static tagName = "error-page";
  public _debug = false;
  protected autobind = true;

  scope: Scope = {
    title: "",
    content: "",
    params: {},
    error: undefined,
  };

  static get observedAttributes(): string[] {
    return [];
  }

  constructor() {
    super();
    this.head.title = "500 Internal server error";
    this.scope.params = this.ctx.params;
    this.scope.title = this.ctx.status?.toString() || "500";
    this.scope.content =
      `${this.ctx.errorObj?.message}` || "Internal server error";
    if (typeof this.scope.content === "string") {
      this.scope.content = this.scope.content.replace(/\n/g, "<br >");
    }

    this.scope.error = this.ctx.errorObj;
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(InternalErrorPageComponent.observedAttributes);
  }

  protected template() {
    return pugTemplate(this.scope);
  }
}
