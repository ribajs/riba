import { Component, TemplateFunction } from "@ribajs/core/src/index.js";
import { Pjax } from "@ribajs/router";
import { ShopifyCartService, ShopifyCartObject } from "@ribajs/shopify";
import { onRoute } from "@ribajs/utils/src/url";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import template from "./cart-button.component.html";

interface Scope {
  cartItemCount: number;
  toggle: ShopifyCartButtonComponent["toggle"];
  pending: boolean;
  startAddAnimation: boolean;
}

export class ShopifyCartButtonComponent extends Component {
  public static tagName = "shopify-cart-button";

  public static cartUrl = "/cart";

  static get observedAttributes(): string[] {
    return [];
  }

  public scope: Scope = {
    cartItemCount: 0,
    toggle: this.toggle,
    pending: false,
    startAddAnimation: false,
  };

  protected set cart(cart: ShopifyCartObject) {
    this.scope.cartItemCount = cart.item_count;
    this.scope.startAddAnimation = true;
    setTimeout(() => {
      this.scope.startAddAnimation = false;
    }, 3000);
  }

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ShopifyCartButtonComponent.observedAttributes);
  }

  public toggle(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (onRoute(ShopifyCartButtonComponent.cartUrl)) {
      window.history.back();
    } else {
      if (ShopifyCartButtonComponent.cartUrl) {
        const pjax = Pjax.getInstance("main");
        if (!pjax) {
          window.location.href = ShopifyCartButtonComponent.cartUrl;
        } else {
          pjax.goTo(ShopifyCartButtonComponent.cartUrl, false);
        }
      }
    }
  }

  protected async beforeBind() {
    await super.beforeBind();
    ShopifyCartService.shopifyCartEventDispatcher.on(
      "ShopifyCart:request:start",
      () => {
        this.scope.pending = true;
      }
    );

    ShopifyCartService.shopifyCartEventDispatcher.on(
      "ShopifyCart:request:complete",
      (cart: ShopifyCartObject) => {
        if (cart) {
          this.cart = cart;
        }
        this.scope.pending = false;
      }
    );
  }

  protected async afterBind() {
    await super.afterBind();
    return ShopifyCartService.get().catch((error: Error) => {
      console.error("[ShopifyCartButtonComponent]", error);
    });
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected template(): ReturnType<TemplateFunction> {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      return template;
    }
  }
}
