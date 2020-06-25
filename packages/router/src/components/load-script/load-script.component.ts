import { Component } from "@ribajs/core";
import { loadScript, getUID } from "@ribajs/utils/src/dom";

interface Scope {
  src: string;
  id: string;
  async: boolean;
}

export class LoadScriptComponent extends Component {
  public static tagName = "load-script";

  protected autobind = false;

  static get observedAttributes() {
    return ["src", "id", "async", "defer"];
  }

  protected scope: Scope = {
    src: "",
    id: "",
    async: true,
    defer: true,
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    super.init(LoadScriptComponent.observedAttributes);
  }

  protected async onReady() {
    await super.onReady();
    if (!this.scope.id) {
      this.scope.id = getUID("script-");
    }
    loadScript(this.scope.src, this.scope.id, this.scope.async);
  }

  protected requiredAttributes() {
    return ["src"];
  }

  protected template() {
    return null;
  }
}
