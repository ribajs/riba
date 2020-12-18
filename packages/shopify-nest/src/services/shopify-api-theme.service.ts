import { ShopifyApiThemesService as _ShopifyApiThemesService } from '@ribajs/shopify-tda';

export class ShopifyApiThemesService extends _ShopifyApiThemesService {
  public static instance?: ShopifyApiThemesService;

  protected constructor() {
    super('/');
  }

  public static getSingleton() {
    if (ShopifyApiThemesService.instance) {
      return ShopifyApiThemesService.instance;
    }
    ShopifyApiThemesService.instance = new ShopifyApiThemesService();
    return ShopifyApiThemesService.instance;
  }
}
