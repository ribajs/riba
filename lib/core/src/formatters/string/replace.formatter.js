"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Replaces all occurrences of a string with a substring.
 * @see https://help.shopify.com/en/themes/liquid/filters/string-filters#replace
 */
exports.replace = {
    name: 'replace',
    read(str, value, replaceValue) {
        return str.replace(new RegExp(value, 'g'), replaceValue);
    },
};
