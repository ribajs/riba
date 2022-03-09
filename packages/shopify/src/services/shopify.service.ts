import { isNumber } from "@ribajs/utils/src/type.js";

/**
 * Custom version of shopify tools like api.jquery.js / option-selection.js
 * @see https://mayert-douglas4935.myshopify.com/pages/api
 */
export class ShopifyService {
  public static formatMoneyWithDelimiters(
    num: number,
    precision = 2,
    thousands = ",",
    decimal = "."
  ): string {
    if (!isNumber(num) || num === null) {
      return "0";
    }

    const numStr: string = (num / 100.0).toFixed(precision);

    const parts = numStr.split(".");
    const dollars = parts[0].replace(
      /(\d)(?=(\d\d\d)+(?!\d))/g,
      "$1" + thousands
    );
    const cents = parts[1] ? decimal + parts[1] : "";

    return dollars + cents;
  }

  /** singleton instance */
  protected static instance: ShopifyService;
  protected moneyFormat?: string;
  protected moneyWithCurrencyFormat?: string;

  public static get moneyWithCurrencyFormat() {
    if (
      (window as any).model &&
      (window as any).model.system &&
      (window as any).model.system.shopSettings
    ) {
      return (window as any).model.system.shopSettings.moneyWithCurrencyFormat;
    }
  }

  public static get moneyFormat() {
    if (
      (window as any).model &&
      (window as any).model.system &&
      (window as any).model.system.shopSettings
    ) {
      return (window as any).model.system.shopSettings.moneyFormat;
    }
  }

  constructor(/*shopSettings?: any*/) {
    if (ShopifyService.instance) {
      return ShopifyService.instance;
    }
    ShopifyService.instance = this;
  }
}
