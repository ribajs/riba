/**
 * Custom version of shopify tools like api.jquery.js / option-selection.js
 * @see https://mayert-douglas4935.myshopify.com/pages/api
 */
export declare class ShopifyService {
    /**
     * Custom version of Shopify.resizeImage
     * @param url
     * @param size
     * @param scale TODO
     * @param crop TODO
     * @param extension
     *
     * @see https://help.shopify.com/en/themes/liquid/filters/url-filters#img_url
     */
    static resizeImage(url: string, size: string, scale: number, crop: string, extension: string): string;
    /** singleton instance */
    private static instance;
    protected moneyFormat?: string;
    protected moneyWithCurrencyFormat?: string;
    private debug;
    constructor(shopSettings?: any);
    formatMoneyWithCurrency(cents: string | number, format?: string): void;
    /**
     * Custom version of Shopify.formatMoney
     * @param cents
     * @param format
     *
     * @see https://github.com/NathanPJF/deploybot-shopify/blob/master/assets/ajaxify.js.liquid
     * @see https://github.com/discolabs/cartjs/blob/master/src/utils.coffee
     * @see https://github.com/JumpLinkNetwork/shopify-productjs/blob/master/src/utilities.js
     */
    formatMoney(cents: string | number, format?: string): string;
}
