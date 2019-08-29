"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Appends characters to a string.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#append
 */
exports.append = {
    name: 'append',
    read(a, b) {
        return a + b;
    },
};
