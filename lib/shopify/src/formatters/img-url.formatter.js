"use strict";
/* tslint:disable:variable-name */
Object.defineProperty(exports, "__esModule", { value: true });
const shopify_service_1 = require("../services/shopify.service");
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
exports.img_url = shopify_service_1.ShopifyService.resizeImage;
