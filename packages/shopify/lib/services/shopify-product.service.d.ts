import { ShopifyProduct, ShopifyProductVariant } from '../interfaces';
export interface ProductsCache {
    [handle: string]: ShopifyProduct;
}
export declare class ShopifyProductService {
    /**
     * Get product object by handle
     * @param handle product handle
     */
    static get(handle: string): Promise<ShopifyProduct>;
    /**
     * Check if the option values fits to the current variant.
     * @param variant
     * @param optionValues
     * @return Returns true if the option values fitting to the variant
     */
    static fitsVariantOptions(variant: ShopifyProductVariant, optionValues: string[]): boolean;
    /**
     * Get product variant of (selected) option values
     * @param optionValues (selected) option values
     */
    static getVariantOfOptions(product: ShopifyProduct, optionValues: string[]): ShopifyProductVariant | null;
    /**
     * Get variant object by variant id
     * @param id Variant id
     */
    static getVariant(product: ShopifyProduct, id: number): null;
    /**
     * Get product option by name
     * @param product product wich holds the options
     * @param name option name
     */
    static getOption(product: ShopifyProduct, name: string): null;
    /**
     * Prepair product, remove protocol from featured_image, lovercase the option names
     * @param product product object
     */
    static prepair(product: ShopifyProduct): ShopifyProduct;
    protected static cache: ProductsCache;
}
