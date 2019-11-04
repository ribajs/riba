"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.imgUrlFormatter = {
    name: 'img_url',
    read(url, size, scale, crop, extension, element) {
        try {
            if (size === 'original' || size === 'master') {
                return url;
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
        }
        catch (error) {
            console.error(error);
            return url;
        }
    },
};
