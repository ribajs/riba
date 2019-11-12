/**
 * Custom version of shopify tools like api.jquery.js / option-selection.js
 * @see https://mayert-douglas4935.myshopify.com/pages/api
 */
export declare class ShopifyService {
    static formatMoneyWithDelimiters(num: number, precision?: number, thousands?: string, decimal?: string): string;
    /** singleton instance */
    protected static instance: ShopifyService;
    protected moneyFormat?: string;
    protected moneyWithCurrencyFormat?: string;
    static get moneyWithCurrencyFormat(): any;
    static get moneyFormat(): any;
    constructor(shopSettings?: any);
}
