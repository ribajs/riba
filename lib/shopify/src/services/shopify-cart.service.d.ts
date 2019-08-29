import { Debug, EventDispatcher } from '@ribajs/core';
import { PQueue } from './p-queue.service';
import { IShopifyCartLineItem, IShopifyCartUpdateProperty, IShopifyCartAddError, IShopifyCartObject, IShopifyCustomerAddress, IShopifyShippingRates, IShopifyShippingRatesNormalized } from '../interfaces';
export interface IShopifyCartRequestOptions {
    triggerOnStart: boolean;
    triggerOnComplete: boolean;
    triggerOnChange: boolean;
}
export declare class ShopifyCartService {
    static queue: PQueue;
    static cart: IShopifyCartObject | null;
    static shopifyCartEventDispatcher: EventDispatcher;
    /**
     * Use this to add a variant to the cart.
     * @param id Variant id
     * @param quantity Quantity
     * @param properties Additional properties
     * @return Response if successful, the JSON of the line item associated with the added variant.
     * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#add-to-cart
     */
    static add(id: number | number, quantity?: number, properties?: {}, options?: IShopifyCartRequestOptions): Promise<IShopifyCartLineItem | IShopifyCartAddError>;
    static _get(): Promise<IShopifyCartObject>;
    /**
     * Use this to get the cart as JSON.
     * @param data
     * @return The JSON of the cart.
     * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-cart
     */
    static get(options?: IShopifyCartRequestOptions): Promise<IShopifyCartObject>;
    /**
     * Use this to change cart attributes, the cart note, and quantities of line items in the cart.
     * @param id Variant ID
     * @param quantity Quantity
     * @param properties Additional properties
     * @return Response The JSON of the cart.
     * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#update-cart
     */
    static update(id: number | number, quantity: number, properties?: {}, options?: IShopifyCartRequestOptions): Promise<IShopifyCartObject>;
    /**
     * Use this to change cart attributes, the cart note, and quantities of line items in the cart.
     * @param id Variant ID
     * @param quantity Quantity
     * @param properties Additional properties
     * @return Response The JSON of the cart.
     * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#update-cart
     */
    static updates(updates: IShopifyCartUpdateProperty | Array<number>, options?: IShopifyCartRequestOptions): Promise<IShopifyCartObject>;
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
    static change(id: number | number, quantity: number, properties?: {}, options?: IShopifyCartRequestOptions): Promise<IShopifyCartObject>;
    /**
     * If you use Line Item Properties you may end up with several items in the cart that share the same variant ID. How do you update the quantity of an item in the cart that has specific line item properties? Once you have identified the 1-based index of the item in the cart, you can use the line property instead of id like so:
     * @param line -based index of the item in the cart
     * @param quantity Quantity
     * @param properties Additional properties
     * @return Response The JSON of the cart.
     */
    static changeLine(line: string | number, quantity: number, properties?: {}, options?: IShopifyCartRequestOptions): Promise<IShopifyCartObject>;
    /**
     * This call sets all quantities of all line items in the cart to zero.
     * @return The JSON of an empty cart. This does not remove cart attributes nor the cart note.
     * @return Response The JSON of an empty cart. This does not remove cart attributes nor the cart note.
     * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#clear-cart
     */
    static clear(options?: IShopifyCartRequestOptions): Promise<IShopifyCartObject>;
    static _getShippingRates(shippingAddress: IShopifyCustomerAddress, normalize?: boolean): Promise<IShopifyShippingRates | IShopifyShippingRatesNormalized>;
    /**
     * Get estimated shipping rates.
     * @param shippingAddress TODO: /cart/shipping_rates.json?shipping_address[zip]=K1N 5T2&shipping_address[country]=Canada&shipping_address[province]=Ontario
     * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-shipping-rates
     */
    static getShippingRates(shippingAddress: IShopifyCustomerAddress, normalize?: boolean, options?: IShopifyCartRequestOptions): Promise<IShopifyShippingRates | IShopifyShippingRatesNormalized>;
    protected static debug: Debug.Debugger;
    protected static CART_POST_ADD_URL: string;
    protected static CART_GET_URL: string;
    protected static CART_POST_UPDATE_URL: string;
    protected static CART_POST_CHANGE_URL: string;
    protected static CART_POST_CLEAR_URL: string;
    protected static CART_GET_SHIPPING_RATES_URL: string;
    protected static requestOptionDefaults: {
        triggerOnStart: boolean;
        triggerOnComplete: boolean;
        triggerOnChange: boolean;
    };
    protected static waitForComplete: boolean;
    /**
     * Trigger `ShopifyCart:request:complete`, if queue is already panding no noting (in this case we already looking for onIdle)
     */
    protected static triggerOnComplete(): Promise<void> | undefined;
    /**
     * TODO check if cart values are changed
     * @param cart The cart object
     */
    protected static triggerOnChange(cart: IShopifyCartObject): void;
    /**
     * Trigger `ShopifyCart:request:start`, if not already triggered
     */
    protected static triggerOnStart(): void;
    protected static normalizeShippingRates(shippingRates: IShopifyShippingRates): IShopifyShippingRatesNormalized;
}
