"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Strips tabs, spaces, and newlines (all whitespace) from the left and right side of a string.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#strip
 */
exports.strip = {
    name: 'strip',
    read(str) {
        return str.trim();
    },
};
