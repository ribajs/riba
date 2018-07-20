/* tslint:disable:variable-name */

/**
 * Return a resized shopify image URL
 * @see https://help.shopify.com/en/themes/liquid/filters/url-filters#img_url
 */
export const img_url = (url: string, size: string, scale: number, crop: string, extension: string) => {
  try {
    if ('original' === size) {
      return url;
    }
    const result = url.match(/(.*\/[\w\-\_\.]+)\.(\w{2,4})/);

    if (!result || !result[1] || !result[2]) {
      throw new Error(`Can't match url ${url}`);
    }

    const path = result[1];
    extension = extension || result[2];
    return path + '_' + size + '.' + extension;
  } catch (error) {
    console.error(error);
    return url;
  }
};
