"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns the size of a string (the number of characters) or an array (the number of elements).
 * @see https://help.shopify.com/themes/liquid/filters/array-filters#size
 */
exports.size = {
    name: 'size',
    read(value) {
        return (value && value.length) ? value.length : 0;
    },
};
