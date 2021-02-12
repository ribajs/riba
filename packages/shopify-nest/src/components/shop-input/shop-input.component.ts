import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import Debug from "debug";
import pugTemplate from "./shop-input.component.pug";

interface Scope {
  shop: string;
  submitted: boolean;
}

export class ShopifyNestShopInputComponent extends Component {
  public static tagName = "shopify-nest-shop-input";

  static get observedAttributes() {
    return [];
  }

  protected debug = Debug("component:" + ShopifyNestShopInputComponent.tagName);

  protected scope: Scope = {
    shop: "",
    submitted: false,
  };

  constructor() {
    super();
    this.debug("constructor", this);
  }
  protected connectedCallback() {
    super.connectedCallback();
    let form = this;
    while (form.tagName !== "FORM") {
      form = form.parentElement as HTMLElement;
    }
    form.addEventListener("submit", () => {
      this.scope.submitted = true;
      (this as HTMLInputElement).value += ".myshopify.com";
      this.scope.submitted = true;
      return true;
    });
    return this.init(ShopifyNestShopInputComponent.observedAttributes);
  }

  protected template() {
    let template: string | null = null;
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      this.debug("Do not template, because element has child nodes");
      return template;
    } else {
      template = pugTemplate(this.scope);
      this.debug("Use template", template);
      return template;
    }
  }
}
