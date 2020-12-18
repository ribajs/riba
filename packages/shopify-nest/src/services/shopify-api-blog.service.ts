import Debug from 'debug';
import { ShopifyApiBlogsService as _ShopifyApiBlogsService } from '@ribajs/shopify-tda';

export class ShopifyApiBlogsService extends _ShopifyApiBlogsService {
  public static instance?: ShopifyApiBlogsService;

  protected debug = Debug('services:ShopifyApiBlogsService');

  protected constructor() {
    super('/');
  }

  public static getSingleton() {
    if (ShopifyApiBlogsService.instance) {
      return ShopifyApiBlogsService.instance;
    }
    ShopifyApiBlogsService.instance = new ShopifyApiBlogsService();
    return ShopifyApiBlogsService.instance;
  }
}
