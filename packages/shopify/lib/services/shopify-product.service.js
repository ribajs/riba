"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
class ShopifyProductService {
    /**
     * Get product object by handle
     * @param handle product handle
     */
    static get(handle) {
        if (this.cache.hasOwnProperty(handle)) {
            return new Promise((resolve) => {
                resolve(this.cache[handle]);
            });
        }
        else {
            return core_1.Utils.getJSON(`/products/${handle}.js`)
                .then((product) => {
                this.cache[handle] = product;
                return this.cache[handle];
            });
        }
    }
    /**
     * Check if the option values fits to the current variant.
     * @param variant
     * @param optionValues
     * @return Returns true if the option values fitting to the variant
     */
    static fitsVariantOptions(variant, optionValues) {
        let fit = true;
        // position0 is the option index starting on 0
        for (const position0 in optionValues) {
            if (optionValues[position0]) {
                const optionValue = optionValues[position0];
                fit = fit && variant.options.indexOf(optionValue.toString()) > -1;
            }
        }
        return fit;
    }
    /**
     * Get product variant of (selected) option values
     * @param optionValues (selected) option values
     */
    static getVariantOfOptions(product, optionValues) {
        let result = null;
        if (product) {
            for (const i in product.variants) {
                if (product.variants[i]) {
                    result = null;
                    const variant = product.variants[i];
                    const fits = this.fitsVariantOptions(variant, optionValues);
                    if (fits) {
                        result = variant;
                        break;
                    }
                }
            }
        }
        return result;
    }
    /**
     * Get variant object by variant id
     * @param id Variant id
     */
    static getVariant(product, id) {
        let result = null;
        if (product) {
            product.variants.forEach((variant) => {
                if (variant.id === id) {
                    result = variant;
                }
            });
        }
        return result;
    }
    /**
     * Get product option by name
     * @param product product wich holds the options
     * @param name option name
     */
    static getOption(product, name) {
        let result = null;
        product.options.forEach((option) => {
            if (option.name.toLowerCase() === name.toLowerCase()) {
                result = option;
            }
        });
        return result;
    }
    /**
     * Prepair product, remove protocol from featured_image, lovercase the option names
     * @param product product object
     */
    static prepair(product) {
        // remove protocol
        product.featured_image
            .replace(/(^\w+:|^)\/\//, '//');
        // all option names to lower case
        for (const option of product.options) {
            option.name = option.name.toString().toLocaleLowerCase();
        }
        return product;
    }
}
exports.ShopifyProductService = ShopifyProductService;
ShopifyProductService.cache = {};
