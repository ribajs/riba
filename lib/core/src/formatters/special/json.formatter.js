"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Converts a string into JSON format.
 * @see https://help.shopify.com/themes/liquid/filters/additional-filters#json
 */
exports.json = {
    name: 'json',
    read(object, replaceSingleQuate = true) {
        const result = JSON.stringify(object);
        if (replaceSingleQuate && result) {
            return result.replace(/'/g, `&#39;`);
        }
        return result;
    },
};
