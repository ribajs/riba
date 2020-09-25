/**
 * Converts a string into a JSON string.
 * @see https://help.shopify.com/themes/liquid/filters/additional-filters#json
 */
export const jsonFormatter = {
  name: "json",
  read(object: any, space = 2, replaceSingleQuate = true) {
    const result = JSON.stringify(object, null, space);
    if (replaceSingleQuate && result) {
      return result.replace(/'/g, `&#39;`);
    }
    return result;
  },
};
