"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Converts a string into lowercase.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#downcase
 */
exports.downcase = {
    name: 'downcase',
    read(str) {
        return str.toLowerCase();
    },
};
