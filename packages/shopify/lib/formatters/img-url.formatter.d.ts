import { ShopifyService } from '../services/shopify.service';
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
export declare const img_url: typeof ShopifyService.resizeImage;
