import { Component } from "@ribajs/core";
import { Pjax } from "@ribajs/router";
import { ShopifyCartService, ShopifyCartObject } from "@ribajs/shopify";
import { onRoute } from "@ribajs/utils/src/url";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
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

  static get observedAttributes() {
    return [];
  }

  protected scope: Scope = {
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
    // console.debug('toggle');
    event.preventDefault();
    event.stopPropagation();

    if (onRoute(ShopifyCartButtonComponent.cartUrl)) {
      // console.debug('already on this site');
      window.history.back();
    } else {
      if (ShopifyCartButtonComponent.cartUrl) {
        const pjax = Pjax.getInstance("main");
        if (!pjax) {
          return;
        }
        pjax.goTo(ShopifyCartButtonComponent.cartUrl, false);
      }
    }
  }

  protected async beforeBind() {
    // console.debug('beforeBind');

    ShopifyCartService.shopifyCartEventDispatcher.on(
      "ShopifyCart:request:start",
      () => {
        // console.debug('ShopifyCartButton:request:start');
        this.scope.pending = true;
      }
    );

    ShopifyCartService.shopifyCartEventDispatcher.on(
      "ShopifyCart:request:complete",
      (cart: ShopifyCartObject) => {
        // console.debug('ShopifyCartButton:request:complete', cart);
        if (cart) {
          this.cart = cart;
        }
        this.scope.pending = false;
      }
    );
  }

  protected async afterBind() {
    // console.debug('afterBind', this.scope);

    return ShopifyCartService.get().catch((error: Error) => {
      console.debug(error);
    });
  }

  protected requiredAttributes() {
    return [];
  }

  protected template() {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      return template;
    }
  }
}
