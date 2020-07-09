import { Binder } from "@ribajs/core";
import { ShopifyCartService } from "../services";
import { ShopifyCartObject } from "../interfaces";

/**
 * Sets the shopify items count
 */
export const shopifyCartCountBinder: Binder<void> = {
  name: "shopify-cart-count",

  bind(el: HTMLElement) {
    ShopifyCartService.shopifyCartEventDispatcher.on(
      "ShopifyCart:request:complete",
      (cart: ShopifyCartObject) => {
        el.textContent = String(cart.item_count);
      }
    );
    ShopifyCartService.shopifyCartEventDispatcher.on(
      "ShopifyCart:request:changed",
      (cart: ShopifyCartObject) => {
        el.textContent = String(cart.item_count);
      }
    );
  },

  routine() {
    /**/
  },
};
