import { Component } from "@ribajs/core";

export interface Component3Scope {
  requiredAttribute: any;
}

export class Component3Component extends Component {
  public static tagName = "rv-component-3";

  _debug = true;

  lifecycleOptions = {
    ignore: true,
  };

  public scope: Component3Scope = {
    requiredAttribute: undefined,
  };

  constructor() {
    super();
  }

  static get observedAttributes(): string[] {
    return ["required-attribute"];
  }

  protected requiredAttributes(): string[] {
    return ["required-attribute"];
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Component3Component.observedAttributes);
  }

  protected async afterBind() {
    this.debug("scope", this.scope);
  }

  protected async template() {
    return null;
  }
}
