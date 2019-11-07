/**
 * Estimated shipping rate
 * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-shipping-rates
 */
export interface ShopifyShippingRate {
    name: string;
    price: string;
    delivery_date: string | null;
    source: 'shopify' | string;
}
/**
 * Estimated shipping rates
 * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-shipping-rates
 */
export declare type ShopifyShippingRates = ShopifyShippingRate[];
/**
 * Normalized shipping rate, e.g. to get the price in small amounts (cents, pounds, ..) and as a number
 */
export interface ShopifyShippingRateNormalized {
    name: string;
    price: number;
    delivery_date: string | null;
    source: 'shopify' | string;
}
/**
 * Normalized shipping rates, e.g. to get the price in small amounts (cents, pounds, ..) and as a number
 */
export declare type ShopifyShippingRatesNormalized = ShopifyShippingRateNormalized[];
