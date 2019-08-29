"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The `slice` filter returns a substring, starting at the specified index.
 * An optional second parameter can be passed to specify the length of the substring.
 * If no second parameter is given, a substring of one character will be returned.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#slice
 */
exports.slice = {
    name: 'slice',
    read(value, start, end) {
        return value.slice(start, end);
    },
};
