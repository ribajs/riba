/**
 * Converts a string into JSON format.
 * @see https://help.shopify.com/themes/liquid/filters/additional-filters#json
 */
export const json = (object: any) => {
  return JSON.stringify(object);
};
