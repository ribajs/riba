/**
 * Converts a string into a JSON string.
 * @see https://help.shopify.com/themes/liquid/filters/additional-filters#json
 */
export const jsonFormatter = {
  name: "json",
  read(object: any, replaceSingleQuate = true) {
    const result = JSON.stringify(object);
    if (replaceSingleQuate && result) {
      return result.replace(/'/g, `&#39;`);
    }
    return result;
  }
};
