import { Utils } from '../../../utils';
import jQuery from 'jquery';
import PQueue from 'p-queue'; // https://github.com/sindresorhus/p-queue
import { GlobalEvent } from '../../../global-event';

export interface ICartUpdateProperty {
  [variantId: number]: number;
}

export interface IShopifyCartAddError {
  status: number;
  message: string;
  description: string;
}

export interface IShopifyCartLineItem {
  id: number;
  title: string;
  price: number;
  line_price: number;
  quantity: number;
  sku: string | null;
  grams: number;
  vendor: string;
  properties: null | any;
  variant_id: number;
  gift_card: boolean;
  url: string;
  image: string;
  handle: string;
  requires_shipping: boolean;
  product_title: string;
  product_description: string;
  product_type: string;
  variant_title: string;
  variant_options: Array<string>;
}

export class ShopifyCartService {

  public static queue = new PQueue({concurrency: 1});

  public static cart = {};

  public static dispatcher = new GlobalEvent();

  /**
   * Use this to add a variant to the cart.
   * @param id Variant id
   * @param quantity Quantity
   * @param properties Additional properties
   * @return Response if successful, the JSON of the line item associated with the added variant.
   * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#add-to-cart
   */
  public static add(id: number | number, quantity = 1, properties = {}): Promise<IShopifyCartLineItem> {
    this.triggerDispatcher();
    return this.queue.add(() => {
      return Utils.post(this.CART_POST_ADD_URL, {
        id,
        quantity,
        properties,
      }, 'json')
      .then((lineItem: IShopifyCartLineItem) => {
        // Force update cart object
        return Utils.get(this.CART_GET_URL, {}, 'json')
        .then((cart: any) => {
          ShopifyCartService.cart = cart;
          return lineItem; // return original response
        }) as any;
      })
      .catch((jqxhr) => {
        return jqxhr.responseJSON as IShopifyCartAddError;
      });
    });
  }

  /**
   * Use this to get the cart as JSON.
   * @param data
   * @return The JSON of the cart.
   * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-cart
   */
  public static get() {
    this.triggerDispatcher();
    return this.queue.add(() => {
      ShopifyCartService.dispatcher.trigger('ShopifyCart:request:start');
      return Utils.get(this.CART_GET_URL, {}, 'json')
      .then((cart: any) => {
        ShopifyCartService.cart = cart;
        return ShopifyCartService.cart;
      });
    });
  }

  /**
   * Use this to change cart attributes, the cart note, and quantities of line items in the cart.
   * @param id Variant ID
   * @param quantity Quantity
   * @param properties Additional properties
   * @return Response The JSON of the cart.
   * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#update-cart
   */
  public static update(id: number | number, quantity: number, properties = {}) {
    this.triggerDispatcher();
    return this.queue.add(() => {
      ShopifyCartService.dispatcher.trigger('ShopifyCart:request:start');
      return Utils.post(this.CART_POST_UPDATE_URL, {
        id,
        quantity,
        properties,
      }, 'json');
    });
  }

  /**
   * Use this to change cart attributes, the cart note, and quantities of line items in the cart.
   * @param id Variant ID
   * @param quantity Quantity
   * @param properties Additional properties
   * @return Response The JSON of the cart.
   * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#update-cart
   */
  public static updates(updates: ICartUpdateProperty | Array<number>) {
    this.triggerDispatcher();
    return this.queue.add(() => {
      ShopifyCartService.dispatcher.trigger('ShopifyCart:request:start');
      return Utils.post(this.CART_POST_UPDATE_URL, {
        updates,
      }, 'json');
    })
    .then((cart: any) => {

      ShopifyCartService.cart = cart;
      return ShopifyCartService.cart;
    });
  }

  /**
   * This call sets the quantity of an item already in the cart.
   *
   * Although /cart/update.js and /cart/change.js may seem like they accomplish the same function,
   * they truly are quite different. The /cart/update.js controller allows updates to several items
   * at once, including items that may not yet be in the cart (it will add them), and it also allows
   * updates of cart attributes and the cart note. The /cart/change.js controller is only able to
   * update the quantity of one item at a time, and that item must be in the cart already. If the
   * item is not in the cart, /cart/change.js will not add it and it will then return a 404 error.
   * Whereas the /cart/update.js controller updates no quantity when any of the requested update
   * cannot be met, the /cart/change.js controller, on the other hand, will adjust the quantity to
   * add all items in stock if what is requested is greater than what's available. Use your browser's
   * JavaScript console to test things out if you're not sure about the behavior of the different request URLs.
   *
   * @param id Variant ID
   * @param quantity Quantity
   * @param properties Additional properties
   * @return Response The JSON of the cart.
   * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#change-cart
   */
  public static change(id: number | number, quantity: number, properties = {}) {
    this.triggerDispatcher();
    return this.queue.add(() => {
      ShopifyCartService.dispatcher.trigger('ShopifyCart:request:start');
      return Utils.post(this.CART_POST_CHANGE_URL, {
        id,
        quantity,
        properties,
      }, 'json')
      .then((cart: any) => {
        ShopifyCartService.cart = cart;
        return ShopifyCartService.cart;
      });
    });
  }

  /**
   * If you use Line Item Properties you may end up with several items in the cart that share the same variant ID. How do you update the quantity of an item in the cart that has specific line item properties? Once you have identified the 1-based index of the item in the cart, you can use the line property instead of id like so:
   * @param line -based index of the item in the cart
   * @param quantity Quantity
   * @param properties Additional properties
   * @return Response The JSON of the cart.
   */
  public static changeLine(line: number | number, quantity: number, properties = {}) {
    this.triggerDispatcher();
    return this.queue.add(() => {
      ShopifyCartService.dispatcher.trigger('ShopifyCart:request:start');
      return Utils.post(this.CART_POST_CHANGE_URL, {
        line,
        quantity,
        properties,
      }, 'json')
      .then((cart: any) => {
        ShopifyCartService.cart = cart;
        return ShopifyCartService.cart;
      });
    });
  }

  /**
   * This call sets all quantities of all line items in the cart to zero.
   * @return The JSON of an empty cart. This does not remove cart attributes nor the cart note.
   * @return Response The JSON of an empty cart. This does not remove cart attributes nor the cart note.
   * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#clear-cart
   */
  public static clear() {
    this.triggerDispatcher();
    return this.queue.add(() => {
      ShopifyCartService.dispatcher.trigger('ShopifyCart:request:start');
      return Utils.post(this.CART_POST_CLEAR_URL, {}, 'json')
      .then((cart: any) => {
        ShopifyCartService.cart = cart;
        return ShopifyCartService.cart;
      });
    });
  }

  /**
   * Get estimated shipping rates.
   * @param shippingAddress TODO: /cart/shipping_rates.json?shipping_address[zip]=K1N 5T2&shipping_address[country]=Canada&shipping_address[province]=Ontario
   * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-shipping-rates
   */
  public static shippingRates(shippingAddress: any) {
    return this.queue.add(() => {
      return Utils.post(this.CART_POST_CLEAR_URL, {}, 'json');
    });
  }

  protected static CART_POST_ADD_URL = '/cart/add.js';

  protected static CART_GET_URL = '/cart.js';

  protected static CART_POST_UPDATE_URL = '/cart/update.js';

  protected static CART_POST_CHANGE_URL = '/cart/change.js';

  protected static CART_POST_CLEAR_URL = '/cart/clear.js';

  protected static CART_GET_SHIPPING_RATES_URL = '/cart/shipping_rates.json';

  /**
   * Trigger `ShopifyCart:request:complete`, if queue is already panding no noting (in this case we already looking for onIdle)
   */
  protected static triggerOnComplete() {
    if (this.queue.pending > 0) {
      return;
    }
    return this.queue
    .onIdle()
    .then(() => {
      ShopifyCartService.dispatcher.trigger('ShopifyCart:request:complete', ShopifyCartService.cart);
    });
  }

  /**
   * Trigger `ShopifyCart:request:start`, if not already triggered
   */
  protected static triggerOnStart() {
    if (this.queue.pending > 0) {
      return;
    }
    ShopifyCartService.dispatcher.trigger('ShopifyCart:request:start');
  }

  protected static triggerDispatcher() {
    this.triggerOnStart();
    this.triggerOnComplete();
  }
}
