import { VueComponent } from "@ribajs/vue";
import template from "./vue-example.component.html";

interface Scope {
  message: string;
}

export class VueExampleComponent extends VueComponent {
  public static tagName = "vue-example";

  public _debug = true;

  static get observedAttributes() {
    return ["message"];
  }

  protected scope: Scope = {
    message: "",
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init([]);
  }

  protected template() {
    return template;
  }
}
