import { Component } from "@ribajs/core";
import Debug from "debug";
import pugTemplate from "./plans.component.pug";

interface Scope {
  hello: string;
}

export class ShopifyNestPermissionsComponent extends Component {
  public static tagName = "shopify-nest-permissions";

  static get observedAttributes() {
    return [];
  }

  protected debug = Debug(
    "component:" + ShopifyNestPermissionsComponent.tagName
  );

  protected scope: Scope = {
    hello: "world",
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.debug("constructor", this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    return this.init(ShopifyNestPermissionsComponent.observedAttributes);
  }

  protected async beforeBind() {
    this.debug("beforeBind");
    await super.beforeBind();
  }

  protected async afterBind() {
    await super.afterBind();
    this.debug("afterBind", this.scope);
  }

  protected requiredAttributes() {
    return [];
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    let template: string | null = null;
    // Only set the component template if there no childs already
    if (this.el.hasChildNodes()) {
      this.debug("Do not template, because element has child nodes");
      return template;
    } else {
      template = pugTemplate(this.scope);
      this.debug("Use template", template);
      return template;
    }
  }
}
