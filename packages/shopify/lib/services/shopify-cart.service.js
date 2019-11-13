"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
const p_queue_service_1 = require("./p-queue.service"); // https://github.com/sindresorhus/p-queue
class ShopifyCartService {
    /**
     * Use this to add a variant to the cart.
     * @param id Variant id
     * @param quantity Quantity
     * @param properties Additional properties
     * @return Response if successful, the JSON of the line item associated with the added variant.
     * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#add-to-cart
     */
    static add(id, quantity = 1, properties = {}, options = this.requestOptionDefaults) {
        if (options.triggerOnStart) {
            this.triggerOnStart();
        }
        const promise = this.queue.add(() => {
            const body = { id, quantity };
            if (Object.keys(properties).length !== 0) {
                body.properties = properties;
            }
            return core_1.HttpService.post(this.CART_POST_ADD_URL, body, 'json')
                .then((lineItem) => {
                // Force update cart object
                return core_1.HttpService.get(this.CART_GET_URL, {}, 'json')
                    .then((cart) => {
                    if (options.triggerOnChange) {
                        this.triggerOnChange(cart);
                    }
                    this.triggerAdd(id, quantity, properties);
                    return lineItem; // return original response
                });
            })
                .catch((jqxhr) => {
                return jqxhr.responseJSON;
            });
        });
        if (options.triggerOnComplete) {
            this.triggerOnComplete();
        }
        return promise;
    }
    static _get() {
        if (ShopifyCartService.cart !== null) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (ShopifyCartService.cart !== null) {
                        return resolve(ShopifyCartService.cart);
                    }
                    else {
                        return this._get();
                    }
                }, 0);
            });
        }
        return core_1.HttpService.get(this.CART_GET_URL, {}, 'json')
            .then((cart) => {
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
    static get(options = this.requestOptionDefaults) {
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
    static update(id, quantity, properties = {}, options = this.requestOptionDefaults) {
        if (options.triggerOnStart) {
            this.triggerOnStart();
        }
        const promise = this.queue.add(() => {
            const body = { id, quantity };
            if (Object.keys(properties).length !== 0) {
                body.properties = properties;
            }
            return core_1.HttpService.post(this.CART_POST_UPDATE_URL, body, 'form');
        })
            // because type is form we need to parse the json response by self
            .then((cart) => {
            return JSON.parse(cart);
        })
            .then((cart) => {
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
    static updates(updates, options = this.requestOptionDefaults) {
        if (options.triggerOnStart) {
            this.triggerOnStart();
        }
        const promise = this.queue.add(() => {
            return core_1.HttpService.post(this.CART_POST_UPDATE_URL, {
                updates,
            }, 'form');
        })
            // because type is form we need to parse the json response by self
            .then((cart) => {
            return JSON.parse(cart);
        })
            .then((cart) => {
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
    static change(id, quantity, properties = {}, options = this.requestOptionDefaults) {
        if (options.triggerOnStart) {
            this.triggerOnStart();
        }
        const promise = this.queue.add(() => {
            const body = { id, quantity };
            if (Object.keys(properties).length !== 0) {
                body.properties = properties;
            }
            return core_1.HttpService.post(this.CART_POST_CHANGE_URL, body, 'form')
                // because type is form we need to parse the json response by self
                .then((cart) => {
                return JSON.parse(cart);
            })
                .then((cart) => {
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
    static changeLine(line, quantity, properties = {}, options = this.requestOptionDefaults) {
        if (options.triggerOnStart) {
            this.triggerOnStart();
        }
        const promise = this.queue.add(() => {
            const body = { line, quantity };
            if (Object.keys(properties).length !== 0) {
                body.properties = properties;
            }
            return core_1.HttpService.post(this.CART_POST_CHANGE_URL, body, 'form')
                // because type is form we need to parse the json response by self
                .then((cart) => {
                return JSON.parse(cart);
            })
                .then((cart) => {
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
     * This call sets all quantities of all line items in the cart to zero.
     * @return The JSON of an empty cart. This does not remove cart attributes nor the cart note.
     * @return Response The JSON of an empty cart. This does not remove cart attributes nor the cart note.
     * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#clear-cart
     */
    static clear(options = this.requestOptionDefaults) {
        if (options.triggerOnStart) {
            this.triggerOnStart();
        }
        const promise = this.queue.add(() => {
            return core_1.HttpService.post(this.CART_POST_CLEAR_URL, {}, 'form')
                // because type is form we need to parse the json response by self
                .then((cart) => {
                return JSON.parse(cart);
            })
                .then((cart) => {
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
    static _getShippingRates(shippingAddress, normalize = true) {
        return core_1.HttpService.get(this.CART_GET_SHIPPING_RATES_URL, { shipping_address: shippingAddress }, 'json')
            .then((shippingRates) => {
            if (core_1.Utils.isObject(shippingRates) && core_1.Utils.isObject(shippingRates.shipping_rates)) {
                if (normalize) {
                    return this.normalizeShippingRates(shippingRates.shipping_rates);
                }
                return shippingRates.shipping_rates;
            }
            else {
                throw new Error('shipping_rates property not found: ' + JSON.stringify(shippingRates));
            }
        });
    }
    /**
     * Get estimated shipping rates.
     * @param shippingAddress TODO: /cart/shipping_rates.json?shipping_address[zip]=K1N 5T2&shipping_address[country]=Canada&shipping_address[province]=Ontario
     * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-shipping-rates
     */
    static getShippingRates(shippingAddress, normalize = true, options = this.requestOptionDefaults) {
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
    /**
     * Trigger `ShopifyCart:request:complete`, if queue is already panding no noting (in this case we already looking for onIdle)
     */
    static triggerOnComplete() {
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
    static triggerOnChange(cart) {
        this.cart = cart;
        ShopifyCartService.shopifyCartEventDispatcher.trigger('ShopifyCart:request:changed', this.cart);
    }
    /**
     * Trigger `ShopifyCart:request:start`, if not already triggered
     */
    static triggerOnStart() {
        if (this.queue.pending > 0) {
            return;
        }
        ShopifyCartService.shopifyCartEventDispatcher.trigger('ShopifyCart:request:start');
    }
    /**
     * Trigger `ShopifyCart:add`
     */
    static triggerAdd(id, quantity, properties) {
        ShopifyCartService.shopifyCartEventDispatcher.trigger('ShopifyCart:add', { id, quantity, properties });
    }
    static normalizeShippingRates(shippingRates) {
        const normalized = new Array(shippingRates.length);
        for (const i in shippingRates) {
            if (shippingRates[i]) {
                const shippingRate = shippingRates[i];
                normalized[i] = core_1.Utils.clone(false, shippingRate);
                if (normalized[i] && normalized[i].price) {
                    normalized[i].price = core_1.Utils.getNumber(normalized[i].price);
                    if (normalized[i].price) {
                        normalized[i].price *= 100;
                    }
                    else {
                        console.warn(`Can't parse "${normalized[i].price}" to number`);
                    }
                }
                else {
                    console.warn(`price property not defined`, normalized[i]);
                }
            }
        }
        return normalized;
    }
}
exports.ShopifyCartService = ShopifyCartService;
ShopifyCartService.queue = new p_queue_service_1.PQueue({ concurrency: 1 });
ShopifyCartService.cart = null;
ShopifyCartService.shopifyCartEventDispatcher = new core_1.EventDispatcher('ShopifyCart');
ShopifyCartService.CART_POST_ADD_URL = '/cart/add.js';
ShopifyCartService.CART_GET_URL = '/cart.js';
ShopifyCartService.CART_POST_UPDATE_URL = '/cart/update.js';
ShopifyCartService.CART_POST_CHANGE_URL = '/cart/change.js';
ShopifyCartService.CART_POST_CLEAR_URL = '/cart/clear.js';
ShopifyCartService.CART_GET_SHIPPING_RATES_URL = '/cart/shipping_rates.json';
ShopifyCartService.requestOptionDefaults = {
    triggerOnStart: true,
    triggerOnComplete: true,
    triggerOnChange: true,
};
ShopifyCartService.waitForComplete = false;
