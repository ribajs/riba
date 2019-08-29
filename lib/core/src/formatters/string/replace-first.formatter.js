"use strict";
/* tslint:disable:variable-name */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Replaces the first occurrence of a string with a substring.
 * @see https://help.shopify.com/en/themes/liquid/filters/string-filters#replace_first
 */
exports.replaceFirst = {
    name: 'replace-first',
    read(str, value, replaceValue) {
        return str.replace(value, replaceValue);
    },
};
