"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Divides an output by a number. The output is rounded down to the nearest integer.
 * @see https://help.shopify.com/themes/liquid/filters/math-filters#divided_by
 */
exports.dividedBy = {
    name: 'dividedBy',
    read(a, b) {
        return Number(a) / Number(b);
    },
};
