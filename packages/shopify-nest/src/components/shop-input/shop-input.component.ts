import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import Debug from "debug";
import pugTemplate from "./shop-input.component.pug";

export class ShopifyNestShopInputComponent extends Component {
  public static tagName = "shopify-nest-shop-input";

  static get observedAttributes() {
    return [];
  }

  protected debug = Debug("component:" + ShopifyNestShopInputComponent.tagName);

  protected scope = {};

  constructor(element?: HTMLElement) {
    super(element);
    this.debug("constructor", this);
  }
  protected connectedCallback() {
    super.connectedCallback();
    return this.init(ShopifyNestShopInputComponent.observedAttributes);
  }

  protected requiredAttributes() {
    return [];
  }

  protected async beforeBind() {
    this.debug("beforeBind");
    await super.beforeBind();
  }

  protected async afterBind() {
    await super.afterBind();
    this.debug("afterBind", this.scope);
    const input = this.querySelector("input") as HTMLInputElement;
    const appendix = this.querySelector(
      ".shop-input-append-placeholder"
    ) as HTMLSpanElement;
    input.addEventListener("input", () => {
      console.log("appendix:", input.value);
      appendix.innerHTML = input.value;
    });
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    let template: string | null = null;
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this.el)) {
      this.debug("Do not template, because element has child nodes");
      return template;
    } else {
      template = pugTemplate(this.scope);
      this.debug("Use template", template);
      return template;
    }
  }
}
