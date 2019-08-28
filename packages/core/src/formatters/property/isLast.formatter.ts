/**
 * Returns true if value index it the last index of the array. Returns false if it is not the last index.
 * ```
 *  <div rv-each-image="product.images" rv-hide="product.images | last %image%"></div>
 * ```
 * @see https://help.shopify.com/themes/liquid/objects/for-loops#forloop-last
 */
export const isLast = {
  name: 'isLast',
  read(array: any[], i: number) {
    return (array.length === i + 1);
  },
};
