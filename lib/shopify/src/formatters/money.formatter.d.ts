/**
 * Formats the price based on the shop's HTML without currency setting (if the format is not overwritten by passing a format parameter).
 * @see https://help.shopify.com/en/themes/liquid/filters/money-filters
 */
export declare const money: (cents: string | number, format?: string | undefined) => string;
