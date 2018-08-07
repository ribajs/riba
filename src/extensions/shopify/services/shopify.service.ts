import { Utils } from '../../../utils';
import Debug from 'debug';
// import { ShopifyCartService } from './shopify-cart.service';

declare global {
  // tslint:disable: interface-name
  interface Window { model: any; }
}

/**
 * Custom version of shopify tools like api.jquery.js / option-selection.js
 * @see https://mayert-douglas4935.myshopify.com/pages/api
 */
export class ShopifyService {

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
  public static resizeImage(url: string, size: string, scale: number, crop: string, extension: string) {
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
  }

  /** singleton instance */
  private static instance: ShopifyService;

  // public cart = new ShopifyCartService();

  protected moneyFormat?: string;
  protected moneyWithCurrencyFormat?: string;

  private debug = Debug('service:ShopifyService');

  constructor(shopSettings?: any) {

    if (window.model && window.model.system && window.model.system.shopSettings) {
      this.moneyFormat = window.model.system.shopSettings.moneyFormat;
      this.moneyWithCurrencyFormat = window.model.system.shopSettings.moneyWithCurrencyFormat;
    }

    if (ShopifyService.instance) {
      return ShopifyService.instance;
    }

    this.debug('shop settings', this.moneyFormat);

    ShopifyService.instance = this;
  }

  public formatMoneyWithCurrency(cents: string | number, format?: string) {
    const formatString = format || this.moneyWithCurrencyFormat;
    this.formatMoney(cents, formatString);
  }

  /**
   * Custom version of Shopify.formatMoney
   * @param cents
   * @param format
   *
   * @see https://github.com/NathanPJF/deploybot-shopify/blob/master/assets/ajaxify.js.liquid
   * @see https://github.com/discolabs/cartjs/blob/master/src/utils.coffee
   * @see https://github.com/JumpLinkNetwork/shopify-productjs/blob/master/src/utilities.js
   */
  public formatMoney(cents: string | number, format?: string) {
    let value = '';
    const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    const formatString = format || this.moneyFormat;

    if (!formatString) {
      console.warn(`Can't parse format: ${formatString}`);
      return '0';
    }

    if (typeof cents === 'string') {
      cents = cents.replace('.', '');
    }

    // cents to float number
    cents = parseFloat(cents.toString());

    function formatWithDelimiters(num: number, precision = 2, thousands = ',', decimal = '.'): string {

      if (!Utils.isNumber(num) || num === null) {
        return '0';
      }

      const numStr: string = (num / 100.0).toFixed(precision);

      const parts = numStr.split('.');
      const dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
      cents = parts[1] ? (decimal + parts[1]) : '';

      return dollars + cents;
    }

    const matchedFormat = formatString.match(placeholderRegex);

    if (matchedFormat !== null && matchedFormat.length >= 1) {
      switch (matchedFormat[1]) {
        case 'amount':
          value = formatWithDelimiters(cents, 2);
          break;
        case 'amount_no_decimals':
          value = formatWithDelimiters(cents, 0);
          break;
        case 'amount_with_comma_separator':
          value = formatWithDelimiters(cents, 2, '.', ',');
          break;
        case 'amount_no_decimals_with_comma_separator':
          value = formatWithDelimiters(cents, 0, '.', ',');
          break;
      }
      return formatString.replace(placeholderRegex, value);
    }

    console.warn(`Can't parse format: ${formatString}`);
    return '0';
  }

}
