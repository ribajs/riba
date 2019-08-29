"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Divides an output by a number and returns the remainder.
 * @see https://help.shopify.com/themes/liquid/filters/math-filters#modulo
 */
exports.modulo = {
    name: 'modulo',
    read(a, b) {
        return Number(a) % Number(b);
    },
};
