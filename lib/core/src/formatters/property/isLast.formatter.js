"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns true if value index it the last index of the array. Returns false if it is not the last index.
 * ```
 *  <div rv-each-image="product.images" rv-hide="product.images | last %image%"></div>
 * ```
 * @see https://help.shopify.com/themes/liquid/objects/for-loops#forloop-last
 */
exports.isLast = {
    name: 'isLast',
    read(array, i) {
        return (array.length === i + 1);
    },
};
