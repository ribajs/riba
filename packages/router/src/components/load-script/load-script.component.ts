import { Component } from "@ribajs/core";
import { loadScript } from "@ribajs/utils/src/dom";
import { getUID } from "@ribajs/utils/src/id";

interface Scope {
  src: string;
  id: string;
  async: boolean;
}

export class LoadScriptComponent extends Component {
  public static tagName = "load-script";

  protected autobind = false;

  static get observedAttributes() {
    return ["src", "id", "async"];
  }

  protected scope: Scope = {
    src: "",
    id: "",
    async: true,
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
