/**
 * Converts a string into JSON format.
 * @see https://help.shopify.com/themes/liquid/filters/additional-filters#json
 */
export const jsonFormatter = {
  name: 'json',
  read(object: any, replaceSingleQuate: boolean = true) {
    const result = JSON.stringify(object);
    if (replaceSingleQuate && result) {
      return result.replace(/'/g, `&#39;`);
    }
    return result;
  },
};
