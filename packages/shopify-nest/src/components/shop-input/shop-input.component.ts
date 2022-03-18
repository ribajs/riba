import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import Debug from "debug";
import pugTemplate from "./shop-input.component.pug";

interface Scope extends ScopeBase {
  shop: string;
  submitted: boolean;
}

export class ShopifyNestShopInputComponent extends Component {
  public static tagName = "shopify-nest-shop-input";

  static get observedAttributes(): string[] {
    return [];
  }

  protected debug = Debug("component:" + ShopifyNestShopInputComponent.tagName);

  public scope: Scope = {
    shop: "",
    submitted: false
  };

  constructor() {
    super();
    this.debug("constructor", this);
  }
  protected connectedCallback() {
    super.connectedCallback();
    let form = this.parentElement;
    while (form && form.tagName !== "FORM") {
      form = form.parentElement as HTMLElement;
    }
    if (!form) {
      throw new Error("Parent form element not found!");
    }
    form.addEventListener("submit", () => {
      this.scope.submitted = true;
      if (!this.scope.shop.endsWith(".myshopify.com")) {
        this.scope.shop += ".myshopify.com";
      }
      this.scope.submitted = true;
      return true;
    });
    return this.init(ShopifyNestShopInputComponent.observedAttributes);
  }

  protected template(): ReturnType<TemplateFunction> {
    let template: string | null = null;
    // Only set the component template if there no child's already
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
