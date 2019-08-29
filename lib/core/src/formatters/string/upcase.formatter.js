"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Converts a string into uppercase.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#upcase
 */
exports.upcase = {
    name: 'upcase',
    read(str) {
        return str.toUpperCase();
    },
};
