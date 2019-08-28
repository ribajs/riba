/**
 * Divides an output by a number. The output is rounded down to the nearest integer.
 * @see https://help.shopify.com/themes/liquid/filters/math-filters#divided_by
 */
export const dividedBy = {
  name: 'dividedBy',
  read(a: string | number, b: string | number) {
    return Number(a) / Number(b);
  },
};
