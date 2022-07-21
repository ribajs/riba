import { Component, ScopeBase } from "@ribajs/core";
import {
  ShopifyCartLineItem,
  ShopifyCartObject,
  ShopifyCustomerAddress,
  ShopifyShippingRates,
  ShopifyShippingRatesNormalized,
} from "../../interfaces/index.js";
import { ShopifyCartService } from "../../services/index.js";
import { getInputValue, hasChildNodesTrim } from "@ribajs/utils/src/dom.js";

export interface Scope extends ScopeBase {
  cart: ShopifyCartObject | null;
  shippingAddress: ShopifyCustomerAddress | null;
  estimateShippingRate: boolean;
  shippingRates: ShopifyShippingRatesNormalized;
  removeItem: ShopifyCartComponent["removeItem"];
  increaseItem: ShopifyCartComponent["increaseItem"];
  decreaseItem: ShopifyCartComponent["decreaseItem"];
  getItem: ShopifyCartComponent["getItem"];
  onItemQuantityChanged: ShopifyCartComponent["onItemQuantityChanged"];
  pending: boolean;
}

export class ShopifyCartComponent extends Component {
  public static tagName = "shopify-cart";

  static get observedAttributes(): string[] {
    return ["shipping-address", "estimate-shipping-rate"];
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  public scope: Scope = this.getScopeDefaults();

  protected getScopeDefaults(): Scope {
    return {
      cart: ShopifyCartService.cart,
      shippingAddress: null,
      estimateShippingRate: false,
      shippingRates: [],
      removeItem: this.removeItem,
      increaseItem: this.increaseItem,
      decreaseItem: this.decreaseItem,
      getItem: this.getItem,
      onItemQuantityChanged: this.onItemQuantityChanged,
      pending: false,
    };
  }

  protected set cart(cart: ShopifyCartObject | null) {
    // TODO check if cart values are changed
    this.scope.cart = cart;

    if (this.scope.shippingAddress && this.scope.estimateShippingRate) {
      ShopifyCartService.getShippingRates(this.scope.shippingAddress, true, {
        triggerOnChange: false,
        triggerOnComplete: false,
        triggerOnStart: false,
      }).then(
        (
          shippingRates: ShopifyShippingRates | ShopifyShippingRatesNormalized
        ) => {
          this.scope.shippingRates =
            shippingRates as ShopifyShippingRatesNormalized;
        }
      );
    }
  }

  protected get cart(): ShopifyCartObject | null {
    return this.scope.cart || null;
  }

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ShopifyCartComponent.observedAttributes);
  }

  public removeItem(lineItem: ShopifyCartLineItem) {
    ShopifyCartService.change(lineItem.variant_id, 0)
      .then((cart: ShopifyCartObject) => {
        // this.cart = cart;
        return cart;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public increaseItem(lineItem: ShopifyCartLineItem) {
    lineItem.quantity++;
    ShopifyCartService.change(lineItem.variant_id, lineItem.quantity)
      .then((cart: ShopifyCartObject) => {
        // this.cart = cart;
        return cart;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public decreaseItem(lineItem: ShopifyCartLineItem) {
    lineItem.quantity--;
    if (lineItem.quantity < 0) {
      lineItem.quantity = 0;
    }
    ShopifyCartService.change(lineItem.variant_id, lineItem.quantity)
      .then((cart: ShopifyCartObject) => {
        return cart;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /**
   * Can be used for a changeable quantity input field
   * @example
   * ```html
   *  <input type="number" rv-on-change="onItemQuantityChanged" rv-value="quantity" />
   * ```
   */
  public onItemQuantityChanged(
    lineItem: ShopifyCartLineItem,
    event: Event,
    scope: Scope,
    htmlEl: HTMLInputElement
  ) {
    if (!htmlEl) {
      console.warn("Input element not found");
      return;
    }
    const newValue = Number(getInputValue(htmlEl));
    if (newValue === lineItem.quantity) {
      return;
    }
    lineItem.quantity = newValue;
    ShopifyCartService.change(lineItem.variant_id, lineItem.quantity)
      .then((cart: ShopifyCartObject) => {
        this.debug("ShopifyCartService changed", cart);
        return cart;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /**
   * Get line item by id
   * @param id
   */
  public getItem(id: number | string): ShopifyCartLineItem | null {
    id = Number(id);
    const item =
      this.scope.cart?.items.find((item) => Number(item.id) === id) || null;
    this.debug("getItem", id, item, this.scope.cart?.items);
    return item;
  }

  protected onCartRequestStart() {
    this.scope.pending = true;
  }

  protected onCartRequestComplete(cart: ShopifyCartObject) {
    if (cart) {
      this.cart = cart;
    }
    this.scope.pending = false;
  }

  protected async beforeBind() {
    await super.beforeBind();
    ShopifyCartService.shopifyCartEventDispatcher.on(
      "ShopifyCart:request:start",
      this.onCartRequestStart,
      this
    );

    ShopifyCartService.shopifyCartEventDispatcher.on(
      "ShopifyCart:request:complete",
      this.onCartRequestComplete,
      this
    );
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
    ShopifyCartService.shopifyCartEventDispatcher.off(
      "ShopifyCart:request:start",
      this.onCartRequestStart,
      this
    );

    ShopifyCartService.shopifyCartEventDispatcher.off(
      "ShopifyCart:request:complete",
      this.onCartRequestComplete,
      this
    );
  }

  protected async afterBind() {
    this.debug("afterBind", this.scope);
    if (!this.cart) {
      this.cart = await ShopifyCartService.get();
    }
    await super.afterBind();
  }

  protected async template() {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      const { default: template } = await import("./cart.component.html");
      return template;
    }
  }
}
