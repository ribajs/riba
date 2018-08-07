import { Utils } from '../../../utils';
import PQueue from 'p-queue'; // https://github.com/sindresorhus/p-queue

export interface ICartUpdateProperty {
  [variantId: number]: number;
}

export class ShopifyCartService {

  public static queue = new PQueue({concurrency: 1});

  /**
   * Use this to add a variant to the cart.
   * @param id Variant id
   * @param quantity Quantity
   * @param properties Additional properties
   * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#add-to-cart
   */
  public static add(id: number | number, quantity = 1, properties = {}) {
    return this.queue.add(() => {
      return Utils.post(this.CART_POST_ADD_URL, {
        id,
        quantity,
        properties,
      }, 'json');
    });
  }

  /**
   * Use this to get the cart as JSON.
   * @param data
   * @return The JSON of the cart.
   * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-cart
   */
  public static get() {
    return this.queue.add(() => {
      return Utils.get(this.CART_GET_URL);
    });
  }

  /**
   * Use this to change cart attributes, the cart note, and quantities of line items in the cart.
   * @param id Variant ID
   * @param quantity Quantity
   * @param properties Additional properties
   * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#update-cart
   */
  public static update(id: number | number, quantity: number, properties = {}) {
    return this.queue.add(() => {
      return Utils.post(this.CART_POST_UPDATE_URL, {
        id,
        quantity,
        properties,
      });
    });
  }

  /**
   * Use this to change cart attributes, the cart note, and quantities of line items in the cart.
   * @param id Variant ID
   * @param quantity Quantity
   * @param properties Additional properties
   * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#update-cart
   */
  public static updates(updates: ICartUpdateProperty | Array<number>) {
    return this.queue.add(() => {
      return Utils.post(this.CART_POST_UPDATE_URL, {
        updates,
      });
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
   * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#change-cart
   */
  public static change(id: number | number, quantity: number, properties = {}) {
    return this.queue.add(() => {
      return Utils.post(this.CART_POST_CHANGE_URL, {
        id,
        quantity,
        properties,
      });
    });
  }

  /**
   * If you use Line Item Properties you may end up with several items in the cart that share the same variant ID. How do you update the quantity of an item in the cart that has specific line item properties? Once you have identified the 1-based index of the item in the cart, you can use the line property instead of id like so:
   * @param line -based index of the item in the cart
   * @param quantity Quantity
   * @param properties Additional properties
   */
  public static changeLine(line: number | number, quantity: number, properties = {}) {
    return this.queue.add(() => {
      return Utils.post(this.CART_POST_CHANGE_URL, {
        line,
        quantity,
        properties,
      });
    });
  }

  /**
   * This call sets all quantities of all line items in the cart to zero.
   * @return The JSON of an empty cart. This does not remove cart attributes nor the cart note.
   * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#clear-cart
   */
  public static clear() {
    return this.queue.add(() => {
      return Utils.post(this.CART_POST_CLEAR_URL);
    });
  }

  /**
   * Get estimated shipping rates.
   * @param shippingAddress TODO: /cart/shipping_rates.json?shipping_address[zip]=K1N 5T2&shipping_address[country]=Canada&shipping_address[province]=Ontario
   * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-shipping-rates
   */
  public static shippingRates(shippingAddress: any) {
    return this.queue.add(() => {
      return Utils.post(this.CART_POST_CLEAR_URL);
    });
  }

  protected static CART_POST_ADD_URL = '/cart/add.js';

  protected static CART_GET_URL = '/cart.js';

  protected static CART_POST_UPDATE_URL = '/cart/update.js';

  protected static CART_POST_CHANGE_URL = '/cart/change.js';

  protected static CART_POST_CLEAR_URL = '/cart/clear.js';

  protected static CART_GET_SHIPPING_RATES_URL = '/cart/shipping_rates.json';

}
