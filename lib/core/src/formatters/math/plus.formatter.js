"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Adds a number to an output.
 * @see https://help.shopify.com/themes/liquid/filters/math-filters#plus
 */
exports.plus = {
    name: 'plus',
    read(a, b) {
        return Number(a) + Number(b);
    },
};
