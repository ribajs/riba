/**
 * Returns the size of a string (the number of characters) or an array (the number of elements).
 * @see https://help.shopify.com/themes/liquid/filters/array-filters#size
 */
export const count = (value: any[] | string) => {
  return (value && value.length) ? value.length : 0;
};
