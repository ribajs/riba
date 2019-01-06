/**
 * Converts a string into JSON format.
 * @see https://help.shopify.com/themes/liquid/filters/additional-filters#json
 */
export const json = (object: any, replaceSingleQuate: boolean = true) => {
  const result = JSON.stringify(object);
  if (replaceSingleQuate) {
    return result.replace(/'/g, `&#39;`);
  }
  return result;
};
