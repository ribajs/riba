"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Multiplies an output by a number.
 * @see https://help.shopify.com/themes/liquid/filters/math-filters#times
 */
exports.timesFormatter = {
    name: 'times',
    read(a, b) {
        return Number(a) * Number(b);
    },
};
