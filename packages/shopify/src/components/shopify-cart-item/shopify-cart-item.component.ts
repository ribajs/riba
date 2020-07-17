import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import { ShopifyCartLineItem, ShopifyCartObject } from "../../interfaces";
import { ShopifyCartService } from "../../services";
import template from "./shopify-cart-item.component.html";

export interface Scope {
  id: ShopifyCartLineItem["id"];
  title?: ShopifyCartLineItem["title"];
  price?: ShopifyCartLineItem["id"];
  linePrice?: ShopifyCartLineItem["line_price"];
  quantity: ShopifyCartLineItem["quantity"];
  sku?: ShopifyCartLineItem["sku"];
  grams?: ShopifyCartLineItem["grams"];
  vendor?: ShopifyCartLineItem["vendor"];
  properties?: ShopifyCartLineItem["properties"];
  giftCard?: ShopifyCartLineItem["gift_card"];
  url?: ShopifyCartLineItem["url"];
  image?: ShopifyCartLineItem["image"];
  handle?: ShopifyCartLineItem["handle"];
  requiresShipping?: ShopifyCartLineItem["requires_shipping"];
  productTitle?: ShopifyCartLineItem["product_title"];
  productDescription?: ShopifyCartLineItem["product_description"];
  productType?: ShopifyCartLineItem["product_type"];
  productId?: ShopifyCartLineItem["product_id"];
  variantTitle?: ShopifyCartLineItem["variant_title"];
  variantOptions?: ShopifyCartLineItem["variant_options"];
  variantId: ShopifyCartLineItem["variant_id"];

  remove: ShopifyCartItemComponent["remove"];
  increase: ShopifyCartItemComponent["increase"];
  decrease: ShopifyCartItemComponent["decrease"];
  onInputQuantityChanged: ShopifyCartItemComponent["onInputQuantityChanged"];

  pending: boolean;
}

export class ShopifyCartItemComponent extends Component {
  public static tagName = "shopify-cart";

  static get observedAttributes() {
    return [
      "id",
      "title",
      "price",
      "line-price",
      "quantity",
      "sku",
      "grams",
      "vendor",
      "properties",
      "gift-card",
      "url",
      "image",
      "handle",
      "requires-shipping",
      "product-title",
      "product-description",
      "product-type",
      "product-id",
      "variant-title",
      "variant-options",
      "variant-id",
    ];
  }

  protected requiredAttributes() {
    return ["id", "variantId", "quantity"];
  }

  protected scope: Scope = this.getScopeDefaults();

  protected getScopeDefaults(): Scope {
    return {
      id: 0,
      productId: 0,
      variantId: 0,
      properties: [],
      quantity: 0,
      remove: this.remove,
      increase: this.increase,
      decrease: this.decrease,
      onInputQuantityChanged: this.onInputQuantityChanged,
      pending: false,
    };
  }

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ShopifyCartItemComponent.observedAttributes);
  }

  public remove() {
    this.debug("decrease", this.scope.variantId);
    ShopifyCartService.change(this.scope.variantId, 0)
      .then((cart: ShopifyCartObject) => {
        return cart;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /**
   * Can be used for a quantity increase + button in the template
   */
  public increase() {
    this.debug("increase", this.scope.quantity);
    this.scope.quantity++;
    ShopifyCartService.change(this.scope.variantId, this.scope.quantity)
      .then((cart: ShopifyCartObject) => {
        return cart;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /**
   * Can be used for a quantity decrease - button in the template
   */
  public decrease() {
    this.debug("decrease", this.scope.quantity);
    this.scope.quantity--;
    if (this.scope.quantity < 0) {
      this.scope.quantity = 0;
    }
    ShopifyCartService.change(this.scope.variantId, this.scope.quantity)
      .then((cart: ShopifyCartObject) => {
        this.debug("ShopifyCartService changed", cart);
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
   *  <input type="number" rv-on-change="onInputQuantityChanged" rv-value="quantity" />
   * ```
   */
  public onInputQuantityChanged() {
    this.debug("onInputQuantityChanged");
    ShopifyCartService.change(this.scope.variantId, this.scope.quantity)
      .then((cart: ShopifyCartObject) => {
        this.debug("ShopifyCartService changed", cart);
        return cart;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  protected onCartUpdate(cart: ShopifyCartObject) {
    const item = this.getItemFromCart(cart);
    if (!item) {
      this.debug("Item not found, probably item was removed.");
      super.remove(); // Remove element
      return;
    }

    // this.scope.id = item.id;
    this.scope.title = item.title;
    this.scope.price = item.price;
    this.scope.linePrice = item.line_price;
    this.scope.quantity = item.quantity;
    this.scope.sku = item.sku;
    this.scope.grams = item.grams;
    this.scope.vendor = item.vendor;
    this.scope.properties = item.properties;
    this.scope.giftCard = item.gift_card;
    this.scope.url = item.url;
    this.scope.image = item.image;
    this.scope.handle = item.handle;
    this.scope.requiresShipping = item.requires_shipping;
    this.scope.productTitle = item.product_title;
    this.scope.productDescription = item.product_description;
    this.scope.productType = item.product_type;
    this.scope.productId = item.product_id;
    this.scope.variantTitle = item.variant_title;
    this.scope.variantOptions = item.variant_options;
    // this.scope.variantId = item.variant_id;

    if (this.scope.quantity === 0) {
      super.remove(); // Remove element
      return;
    }
  }

  protected getItemFromCart(cart: ShopifyCartObject) {
    for (const item of cart.items) {
      if (
        item.id === this.scope.id &&
        item.variant_id === this.scope.variantId
      ) {
        return item;
      }
    }
    return null;
  }

  protected async beforeBind() {
    // const cart = await ShopifyCartService.get();
  }

  protected async afterBind() {
    this.debug("afterBind", this.scope);
    ShopifyCartService.shopifyCartEventDispatcher.on(
      "ShopifyCart:request:start",
      () => {
        this.scope.pending = true;
      }
    );

    ShopifyCartService.shopifyCartEventDispatcher.on(
      "ShopifyCart:request:complete",
      (cart: ShopifyCartObject) => {
        this.debug("ShopifyCart:request:complete", cart);
        this.onCartUpdate(cart);
        this.scope.pending = false;
        return cart;
      }
    );
  }

  protected template() {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this.el)) {
      return null;
    } else {
      return template;
    }
  }
}
