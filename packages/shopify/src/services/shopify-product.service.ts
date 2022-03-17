import { HttpService } from "@ribajs/core";

import { ShopifyProduct, ShopifyProductVariant } from "../interfaces";

export interface ProductsCache {
  [handle: string]: ShopifyProduct;
}

export class ShopifyProductService {
  /**
   * Get product object by handle
   * @param handle product handle
   */
  public static get(handle: string): Promise<ShopifyProduct> {
    if (this.cache[handle]) {
      return new Promise((resolve) => {
        resolve(this.cache[handle]);
      });
    } else {
      return HttpService.getJSON<ShopifyProduct>(`/products/${handle}.js`).then(
        (res) => {
          const product = res.body;
          this.cache[handle] = product;
          return this.cache[handle];
        }
      );
    }
  }

  /**
   * Check if the option values fits to the current variant.
   * @param variant
   * @param optionValues
   * @return Returns true if the option values fitting to the variant
   */
  public static fitsVariantOptions(
    variant: ShopifyProductVariant,
    optionValues: string[]
  ) {
    let fit = true;
    // position0 is the option index starting on 0
    for (const position0 in optionValues) {
      if (optionValues[position0]) {
        const optionValue = optionValues[position0];
        fit = fit && variant.options.indexOf(optionValue.toString()) > -1;
      }
    }
    return fit;
  }

  /**
   * Get product variant of (selected) option values
   * @param optionValues (selected) option values
   */
  public static getVariantOfOptions(
    product: ShopifyProduct,
    optionValues: string[]
  ) {
    let result: ShopifyProductVariant | null = null;
    if (product) {
      for (const i in product.variants) {
        if (product.variants[i]) {
          result = null;
          const variant = product.variants[i];
          const fits = this.fitsVariantOptions(variant, optionValues);
          if (fits) {
            result = variant;
            break;
          }
        }
      }
    }
    return result;
  }

  /**
   * Get variant object by variant id
   * @param id Variant id
   */
  public static getVariant(product: ShopifyProduct, id: number) {
    const result =
      product.variants.find((variant) => variant.id === id) || null;
    return result;
  }

  /**
   * Get product option by name
   * @param product product which holds the options
   * @param name option name
   */
  public static getOption(product: ShopifyProduct, name: string) {
    const result = product.options.find(
      (option) => option.name.toLowerCase() === name.toLowerCase()
    );
    return result;
  }

  /**
   * Get product option which includes a substring
   * @param product product which holds the options
   * @param name option name
   */
  public static getOptionIncludes(
    product: ShopifyProduct,
    searchSubstr: string
  ) {
    const result = product.options.find((option) =>
      option.name.includes(searchSubstr)
    );
    return result;
  }

  /**
   * Prepare product, remove protocol from featured_image, lowercase the option names
   * @param product product object
   */
  public static prepare(product: ShopifyProduct) {
    // remove protocol
    product.featured_image.replace(/(^\w+:|^)\/\//, "//");

    // all option names to lower case
    for (const option of product.options) {
      option.name = option.name.toString().toLocaleLowerCase();
    }

    return product;
  }

  protected static cache: ProductsCache = {};
}
