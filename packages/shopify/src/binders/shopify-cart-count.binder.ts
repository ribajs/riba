import { Binder } from "@ribajs/core";
import { ShopifyCartService } from "../services";
import { ShopifyCartObject } from "../interfaces";

/**
 * Sets the shopify items count
 */
export const shopifyCartCountBinder: Binder<void> = {
  name: "shopify-cart-count",

  bind(el: HTMLElement) {
    this.customData = {
      onCartRequestComplete: (cart: ShopifyCartObject) => {
        el.textContent = String(cart.item_count);
      },
      onCartRequestChanged: (cart: ShopifyCartObject) => {
        el.textContent = String(cart.item_count);
      },
    };
    ShopifyCartService.shopifyCartEventDispatcher.on(
      "ShopifyCart:request:complete",
      this.customData.onCartRequestComplete
    );
    ShopifyCartService.shopifyCartEventDispatcher.on(
      "ShopifyCart:request:changed",
      this.customData.onCartRequestChanged
    );
  },

  unbind(/*el: HTMLElement*/) {
    ShopifyCartService.shopifyCartEventDispatcher.off(
      "ShopifyCart:request:complete",
      this.customData.onCartRequestComplete
    );
    ShopifyCartService.shopifyCartEventDispatcher.off(
      "ShopifyCart:request:changed",
      this.customData.onCartRequestChanged
    );
  },

  routine() {
    /**/
  },
};
