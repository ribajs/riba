import { Utils } from '../../../utils';
import Debug from 'debug';
import {
  IShopifyProduct,
  IShopifyProductVariant,
} from '../interfaces/interfaces';

export interface IProductsCache {
  [handle: string]: IShopifyProduct;
}

export class ShopifyProductService {

  /**
   * Get product object by handle
   * @param handle product handle
   */
  public static get(handle) {
    if (this.cache.hasOwnProperty(handle)) {
      return new Promise((resolve) => {
        resolve(this.cache[handle]);
      });
    } else {
      return Utils.getJSON(`/products/${handle}.js`)
      .then((product: IShopifyProduct) => {
        this.cache[handle] = product;
        return this.cache[handle];
      });
    }
  }

  /**
   * Get product variant of (selected) option values
   * @param optionValues (selected) option values
   */
  public static getVariantOfOptions(product: IShopifyProduct, optionValues: string[]) {
    let result: IShopifyProductVariant | null = null;
    if (product) {
      for (const i in product.variants) {
        if (product.variants[i]) {
          result = null;
          const variant = product.variants[i];
          let fit = false;
          // position0 is the option index starting on 0
          for (const position0 in optionValues) {
            if (optionValues[position0]) {
              const optionValue = optionValues[position0];
              fit = variant.options.indexOf(optionValue.toString()) > -1;
            }
          }
          if (fit) {
            result = variant;
            break;
          }
        }
      }
    }
    this.debug('getVariantOfOptions optionValues', optionValues, 'variant', result);
    return result;
  }

  /**
   * Get variant object by variant id
   * @param id Variant id
   */
  public static getVariant(product: IShopifyProduct, id: number) {
    let result = null;
    if (product) {
      product.variants.forEach((variant: IShopifyProductVariant) => {
        if (variant.id === id) {
          result = variant;
        }
      });
    }
    this.debug('getVariant', result);
    return result;
  }

  /**
   * Get product option by name
   * @param product product wich holds the options
   * @param name option name
   */
  public static getOption(product: IShopifyProduct, name: string) {
    let result = null;
    product.options.forEach((option) => {
      if (option.name.toLowerCase() === name.toLowerCase()) {
        result = option;
      }
    });
    return result;
  }

  /**
   * Prepair product, remove protocol from featured_image, lovercase the option names
   * @param product product object
   */
  public static prepair(product: IShopifyProduct) {
    // remove protocol
    product.featured_image
    .replace(/(^\w+:|^)\/\//, '//');

    // all option names to lower case
    for (const option of product.options) {
      option.name = option.name.toString().toLocaleLowerCase();
    }

    return product;
  }

  protected static debug = Debug('ShopifyExtension:ShopifyProductService');

  protected static cache: IProductsCache = {};

}
