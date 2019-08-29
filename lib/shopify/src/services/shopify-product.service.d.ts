import { Debug } from '@ribajs/core';
import { IShopifyProduct, IShopifyProductVariant } from '../interfaces';
export interface IProductsCache {
    [handle: string]: IShopifyProduct;
}
export declare class ShopifyProductService {
    /**
     * Get product object by handle
     * @param handle product handle
     */
    static get(handle: string): Promise<IShopifyProduct>;
    /**
     * Get product variant of (selected) option values
     * @param optionValues (selected) option values
     */
    static getVariantOfOptions(product: IShopifyProduct, optionValues: string[]): IShopifyProductVariant | null;
    /**
     * Get variant object by variant id
     * @param id Variant id
     */
    static getVariant(product: IShopifyProduct, id: number): null;
    /**
     * Get product option by name
     * @param product product wich holds the options
     * @param name option name
     */
    static getOption(product: IShopifyProduct, name: string): null;
    /**
     * Prepair product, remove protocol from featured_image, lovercase the option names
     * @param product product object
     */
    static prepair(product: IShopifyProduct): IShopifyProduct;
    protected static debug: Debug.Debugger;
    protected static cache: IProductsCache;
}
