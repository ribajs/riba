import { IFormatter, Utils } from '@ribajs/core';

/**
 * Return a resized shopify image URL
 * @see https://help.shopify.com/en/themes/liquid/filters/url-filters#img_url
 *
 * @param url
 * @param size
 * @param scale TODO
 * @param crop TODO
 * @param extension
 */
export const imgUrlFormatter: IFormatter = {
  name: 'img_url',
  read(url: string, size: string, scale?: number, crop?: string, extension?: string, element?: HTMLImageElement) {
    try {
      if (size === 'original' || size === 'master') {
        return url;
      }
      if (size === 'auto') {
        scale = window.devicePixelRatio;
        let width: number = 0;
        if (element) {
          width = element.offsetWidth;
        } else {
          width = Utils.getViewportDimensions().w;
        }
        size = width + 'x';
      }
      if (scale && scale !== 1) {
        size += '@' + scale + 'x';
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
  },
};
