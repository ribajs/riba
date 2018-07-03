/**
 * The `slice` filter returns a substring, starting at the specified index.
 * An optional second parameter can be passed to specify the length of the substring.
 * If no second parameter is given, a substring of one character will be returned.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#slice
 */
export const slice = (value: any, start: number, end: number) => {
  return value.slice(start, end);
};
