import { HttpService } from "@ribajs/core/src/index.js";
import {
  ShopifyApiProductService as _ShopifyApiProductService,
  Product,
} from "@ribajs/shopify-tda";

import type { ProductUpdateCreate } from "../interfaces/shopify-api/product-update-create";

export class ShopifyApiProductService extends _ShopifyApiProductService {
  public static instance?: ShopifyApiProductService;

  protected constructor() {
    super("/");
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
    return HttpService.post<Product>(url, product, "json").then((res) => {
      console.debug("[ShopifyApiProductService] product", res.body);
      return res.body;
    });
  }

  /**
   * Updates a product and its variants and images directly in shopify.
   * @param id product id
   */
  public async update(id: number, product: ProductUpdateCreate) {
    const url = `${this.baseUrl}/${id}`;
    return HttpService.put<Product>(url, product, "json").then((res) => {
      console.debug(
        "[ShopifyApiProductService] update product result",
        res.body
      );
      return res.body;
    });
  }

  /**
   * Deletes a product directly in shopify.
   * @param id product id
   */
  public async delete(id: number) {
    const url = `${this.baseUrl}/${id}`;
    return HttpService.delete<{ id: number }>(url, {}, "json").then(
      (result) => {
        console.debug(
          "[ShopifyApiProductService] delete product result",
          result.body
        );
        return result.body;
      }
    );
  }
}
