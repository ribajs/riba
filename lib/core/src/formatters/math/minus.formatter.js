"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Subtracts a number from an output.
 * @see https://help.shopify.com/themes/liquid/filters/math-filters#minus
 */
exports.minus = {
    name: 'minus',
    read(a, b) {
        return Number(a) - Number(b);
    },
};
