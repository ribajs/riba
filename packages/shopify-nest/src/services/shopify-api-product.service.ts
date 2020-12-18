import { HttpService } from '@ribajs/core';
import {
  ShopifyApiProductService as _ShopifyApiProductService,
  Product,
} from '@ribajs/shopify-tda';

import type { ProductUpdateCreate } from '../interfaces/shopify-api/product-update-create';

export class ShopifyApiProductService extends _ShopifyApiProductService {
  public static instance?: ShopifyApiProductService;

  protected constructor() {
    super('/');
  }

  public static getSingleton() {
    if (ShopifyApiProductService.instance) {
      return ShopifyApiProductService.instance;
    }
    ShopifyApiProductService.instance = new ShopifyApiProductService();
    return ShopifyApiProductService.instance;
  }

  /**
   * Creates a new product directly in shopify
   * @param product The product data
   */
  public async create(product: ProductUpdateCreate) {
    const url = `${this.baseUrl}`;
    return HttpService.post(url, product, 'json').then((prod: Product) => {
      console.debug('[ShopifyApiProductService] product', prod);
      return prod;
    });
  }

  /**
   * Updates a product and its variants and images directly in shopify.
   * @param id product id
   */
  public async update(id: number, product: ProductUpdateCreate) {
    const url = `${this.baseUrl}/${id}`;
    return HttpService.put(url, product, 'json').then((prod: Product) => {
      console.debug('[ShopifyApiProductService] update product result', prod);
      return prod;
    });
  }

  /**
   * Deletes a product directly in shopify.
   * @param id product id
   */
  public async delete(id: number) {
    const url = `${this.baseUrl}/${id}`;
    return HttpService.delete(url, {}, 'json').then(
      (result: { id: number }) => {
        console.debug(
          '[ShopifyApiProductService] delete product result',
          result,
        );
        return result;
      },
    );
  }
}
