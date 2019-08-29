"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Prepends characters to a string.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#prepend
 */
exports.prepend = {
    name: 'prepend',
    read(a, b) {
        return b + a;
    },
};
