import { Binder } from "@ribajs/core";
import { ShopifyCartService } from "../services/index.js";
import { ShopifyCartObject } from "../interfaces/index.js";

/**
 * Sets the shopify items count
 */
export class ShopifyCartCountBinder extends Binder<void, HTMLElement> {
  static key = "shopify-cart-count";

  private _onCartRequestComplete(cart: ShopifyCartObject) {
    this.el.textContent = String(cart.item_count);
  }

  private onCartRequestComplete = this._onCartRequestComplete.bind(this);

  private _onCartRequestChanged(cart: ShopifyCartObject) {
    this.el.textContent = String(cart.item_count);
  }

  private onCartRequestChanged = this._onCartRequestChanged.bind(this);

  routine() {
    //
  }

  bind() {
    ShopifyCartService.shopifyCartEventDispatcher.on(
      "ShopifyCart:request:complete",
      this.onCartRequestComplete
    );
    ShopifyCartService.shopifyCartEventDispatcher.on(
      "ShopifyCart:request:changed",
      this.onCartRequestChanged
    );
  }

  unbind() {
    ShopifyCartService.shopifyCartEventDispatcher.off(
      "ShopifyCart:request:complete",
      this.onCartRequestComplete
    );
    ShopifyCartService.shopifyCartEventDispatcher.off(
      "ShopifyCart:request:changed",
      this.onCartRequestChanged
    );
  }
}
