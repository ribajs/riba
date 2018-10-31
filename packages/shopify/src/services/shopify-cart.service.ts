import { Debug, Utils, EventDispatcher } from '@ribajs/core';
import { PQueue } from './p-queue.service'; // https://github.com/sindresorhus/p-queue

import {
  IShopifyCartLineItem,
  IShopifyCartUpdateProperty,
  IShopifyCartAddError,
  IShopifyCartObject,
  IShopifyCustomerAddress,
  IShopifyShippingRates,
  IShopifyShippingRatesNormalized,
} from '../interfaces/interfaces';

export interface IShopifyCartRequestOptions {
  triggerOnStart: boolean;
  triggerOnComplete: boolean;
  triggerOnChange: boolean;
}

export class ShopifyCartService {

  public static queue = new PQueue({concurrency: 1});

  public static cart: IShopifyCartObject | null = null;

  public static shopifyCartEventDispatcher = new EventDispatcher('ShopifyCart');

  /**
   * Use this to add a variant to the cart.
   * @param id Variant id
   * @param quantity Quantity
   * @param properties Additional properties
   * @return Response if successful, the JSON of the line item associated with the added variant.
   * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#add-to-cart
   */
  public static add(id: number | number, quantity = 1, properties = {}, options: IShopifyCartRequestOptions = this.requestOptionDefaults): Promise<IShopifyCartLineItem | IShopifyCartAddError> {
    if (options.triggerOnStart) {
      this.triggerOnStart();
    }
    const promise = this.queue.add(() => {
      return Utils.post(this.CART_POST_ADD_URL, {
        id,
        quantity,
        properties,
      }, 'json')
      .then((lineItem: IShopifyCartLineItem) => {
        // Force update cart object
        return Utils.get(this.CART_GET_URL, {}, 'json')
        .then((cart: IShopifyCartObject) => {
          if (options.triggerOnChange) {
            this.triggerOnChange(cart);
          }
          return lineItem; // return original response
        }) as any;
      })
      .catch((jqxhr) => {
        return jqxhr.responseJSON as IShopifyCartAddError;
      });
    });
    if (options.triggerOnComplete) {
      this.triggerOnComplete();
    }
    return promise;
  }

  public static _get(): Promise<IShopifyCartObject> {
    if (ShopifyCartService.cart !== null) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (ShopifyCartService.cart !== null) {
            return resolve(ShopifyCartService.cart);
          } else {
            return this._get();
          }
        }, 0);
      });
    }
    return Utils.get(this.CART_GET_URL, {}, 'json')
    .then((cart: IShopifyCartObject) => {
      ShopifyCartService.cart = cart;
      return cart;
    });
  }

  /**
   * Use this to get the cart as JSON.
   * @param data
   * @return The JSON of the cart.
   * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-cart
   */
  public static get(options: IShopifyCartRequestOptions = this.requestOptionDefaults): Promise<IShopifyCartObject> {
    if (options.triggerOnStart) {
      this.triggerOnStart();
    }
    const promise = this.queue.add(() => {
      return this._get();
    });
    if (options.triggerOnComplete) {
      this.triggerOnComplete();
    }
    return promise;
  }

  /**
   * Use this to change cart attributes, the cart note, and quantities of line items in the cart.
   * @param id Variant ID
   * @param quantity Quantity
   * @param properties Additional properties
   * @return Response The JSON of the cart.
   * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#update-cart
   */
  public static update(id: number | number, quantity: number, properties = {}, options: IShopifyCartRequestOptions = this.requestOptionDefaults): Promise<IShopifyCartObject> {
    if (options.triggerOnStart) {
      this.triggerOnStart();
    }
    const promise = this.queue.add(() => {
      return Utils.post(this.CART_POST_UPDATE_URL, {
        id,
        quantity,
        properties,
      }, 'json');
    })
    .then((cart: IShopifyCartObject) => {
      if (options.triggerOnChange) {
        this.triggerOnChange(cart);
      }
      return cart;
    });
    if (options.triggerOnComplete) {
      this.triggerOnComplete();
    }
    return promise;
  }

  /**
   * Use this to change cart attributes, the cart note, and quantities of line items in the cart.
   * @param id Variant ID
   * @param quantity Quantity
   * @param properties Additional properties
   * @return Response The JSON of the cart.
   * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#update-cart
   */
  public static updates(updates: IShopifyCartUpdateProperty | Array<number>, options: IShopifyCartRequestOptions = this.requestOptionDefaults): Promise<IShopifyCartObject> {
    if (options.triggerOnStart) {
      this.triggerOnStart();
    }
    const promise = this.queue.add(() => {
      return Utils.post(this.CART_POST_UPDATE_URL, {
        updates,
      }, 'json');
    })
    .then((cart: IShopifyCartObject) => {
      if (options.triggerOnChange) {
        this.triggerOnChange(cart);
      }
      return cart;
    });
    if (options.triggerOnComplete) {
      this.triggerOnComplete();
    }
    return promise;
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
  public static change(id: number | number, quantity: number, properties = {}, options: IShopifyCartRequestOptions = this.requestOptionDefaults): Promise<IShopifyCartObject> {
    if (options.triggerOnStart) {
      this.triggerOnStart();
    }
    const promise = this.queue.add(() => {
      return Utils.post(this.CART_POST_CHANGE_URL, {
        id,
        quantity,
        properties,
      }, 'json')
      .then((cart: IShopifyCartObject) => {
        if (options.triggerOnChange) {
          this.triggerOnChange(cart);
        }
        return cart;
      });
    });
    if (options.triggerOnComplete) {
      this.triggerOnComplete();
    }
    return promise;
  }

  /**
   * If you use Line Item Properties you may end up with several items in the cart that share the same variant ID. How do you update the quantity of an item in the cart that has specific line item properties? Once you have identified the 1-based index of the item in the cart, you can use the line property instead of id like so:
   * @param line -based index of the item in the cart
   * @param quantity Quantity
   * @param properties Additional properties
   * @return Response The JSON of the cart.
   */
  public static changeLine(line: string | number, quantity: number, properties = {}, options: IShopifyCartRequestOptions = this.requestOptionDefaults): Promise<IShopifyCartObject> {
    if (options.triggerOnStart) {
      this.triggerOnStart();
    }
    const promise = this.queue.add(() => {
      return Utils.post(this.CART_POST_CHANGE_URL, {
        line,
        quantity,
        properties,
      }, 'json')
      .then((cart: IShopifyCartObject) => {
        if (options.triggerOnChange) {
          this.triggerOnChange(cart);
        }
        return cart;
      });
    });
    if (options.triggerOnComplete) {
      this.triggerOnComplete();
    }
    return promise  as Promise<IShopifyCartObject>;
  }

  /**
   * This call sets all quantities of all line items in the cart to zero.
   * @return The JSON of an empty cart. This does not remove cart attributes nor the cart note.
   * @return Response The JSON of an empty cart. This does not remove cart attributes nor the cart note.
   * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#clear-cart
   */
  public static clear(options: IShopifyCartRequestOptions = this.requestOptionDefaults): Promise<IShopifyCartObject> {
    if (options.triggerOnStart) {
      this.triggerOnStart();
    }
    const promise = this.queue.add(() => {
      return Utils.post(this.CART_POST_CLEAR_URL, {}, 'json')
      .then((cart: IShopifyCartObject) => {
        if (options.triggerOnChange) {
          this.triggerOnChange(cart);
        }
        return cart;
      });
    });
    if (options.triggerOnComplete) {
      this.triggerOnComplete();
    }
    return promise;
  }

  public static _getShippingRates(shippingAddress: IShopifyCustomerAddress, normalize: boolean = true): Promise<IShopifyShippingRates | IShopifyShippingRatesNormalized> {
    return Utils.get(this.CART_GET_SHIPPING_RATES_URL, { shipping_address: shippingAddress }, 'json')
    .then((shippingRates: any) => {
      if (Utils.isObject(shippingRates) && Utils.isObject(shippingRates.shipping_rates)) {
        this.debug('getShippingRates result', shippingRates.shipping_rates);
        if (normalize) {
          return this.normalizeShippingRates(shippingRates.shipping_rates);
        }
        return shippingRates.shipping_rates as IShopifyShippingRates;
     } else {
       throw new Error('shipping_rates property not found: ' + JSON.stringify(shippingRates));
     }
    });
  }

  /**
   * Get estimated shipping rates.
   * @param shippingAddress TODO: /cart/shipping_rates.json?shipping_address[zip]=K1N 5T2&shipping_address[country]=Canada&shipping_address[province]=Ontario
   * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-shipping-rates
   */
  public static getShippingRates(shippingAddress: IShopifyCustomerAddress, normalize: boolean = true, options: IShopifyCartRequestOptions = this.requestOptionDefaults): Promise<IShopifyShippingRates | IShopifyShippingRatesNormalized> {
    if (options.triggerOnStart) {
      this.triggerOnStart();
    }
    const promise = this.queue.add(() => {
      return this._getShippingRates(shippingAddress, normalize);
    });
    if (options.triggerOnComplete) {
      this.triggerOnComplete();
    }
    return promise;
  }

  protected static debug = Debug('ShopifyExtension:ShopifyCartService');

  protected static CART_POST_ADD_URL = '/cart/add.js';

  protected static CART_GET_URL = '/cart.js';

  protected static CART_POST_UPDATE_URL = '/cart/update.js';

  protected static CART_POST_CHANGE_URL = '/cart/change.js';

  protected static CART_POST_CLEAR_URL = '/cart/clear.js';

  protected static CART_GET_SHIPPING_RATES_URL = '/cart/shipping_rates.json';

  protected static requestOptionDefaults = {
    triggerOnStart: true,
    triggerOnComplete: true,
    triggerOnChange: true,
  };

  protected static waitForComplete: boolean = false;

  /**
   * Trigger `ShopifyCart:request:complete`, if queue is already panding no noting (in this case we already looking for onIdle)
   */
  protected static triggerOnComplete() {
    if (!this.waitForComplete) {
      this.waitForComplete = true;
      return this.queue
      .onIdle()
      .then(() => {
        ShopifyCartService.shopifyCartEventDispatcher.trigger('ShopifyCart:request:complete', this.cart);
        this.waitForComplete = false;
      });
    }
  }

  /**
   * TODO check if cart values are changed
   * @param cart The cart object
   */
  protected static triggerOnChange(cart: IShopifyCartObject) {
    this.cart = cart;
    ShopifyCartService.shopifyCartEventDispatcher.trigger('ShopifyCart:request:changed', this.cart);
  }

  /**
   * Trigger `ShopifyCart:request:start`, if not already triggered
   */
  protected static triggerOnStart() {
    if (this.queue.pending > 0) {
      return;
    }
    ShopifyCartService.shopifyCartEventDispatcher.trigger('ShopifyCart:request:start');
  }

  protected static normalizeShippingRates(shippingRates: IShopifyShippingRates): IShopifyShippingRatesNormalized {
    const normalized = new Array<any>(shippingRates.length);
    for (const i in shippingRates) {
      if (shippingRates[i]) {
        const shippingRate = shippingRates[i];
        normalized[i] = Utils.clone(false, shippingRate) as IShopifyShippingRates;
        if (normalized[i] && normalized[i].price) {
          normalized[i].price = Utils.getNumber(normalized[i].price);
          if (normalized[i].price) {
            normalized[i].price *= 100;
          } else {
            this.debug(`Can't parse "${normalized[i].price}" to number`);
          }
        } else {
          this.debug(`price property not defined`, normalized[i]);
        }
      }
    }
    return normalized as IShopifyShippingRatesNormalized;
  }
}
