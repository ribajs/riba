import { VueComponent } from "@ribajs/vue";

import Increase from "../vue-increase/vue-increase.vue";

export class VueAppComponent extends VueComponent {
  public static tagName = "vue-app";
  protected autobind = true;
  public _debug = true;

  static observedAttributes = ["message"];

  // Methods to use in the template
  protected methods = {};

  // Values to use in the template
  public scope = {};

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(VueAppComponent.observedAttributes);
  }

  protected async beforeBind() {
    await super.beforeBind();
  }

  protected beforeMount() {
    this.debug("beforeMount", this.scope);
    // Regist Vue components here
    this.vue?.component("v-increase", Increase);
  }

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }
}
