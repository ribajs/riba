import { Component, TemplateFunction } from "@ribajs/core";

export interface Scope {
  logMe: string;
}

export class LoggerComponent extends Component {
  public static tagName = "rv-logger";
  public _debug = false;
  protected autobind = true;

  scope: Scope = {
    logMe: "",
  };

  static get observedAttributes(): string[] {
    return ["log-me"];
  }

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(LoggerComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected async beforeBind() {
    await super.beforeBind();
  }

  protected async afterBind() {
    console.log(this.scope.logMe);
    await super.afterBind();
  }

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }
}
