import { ShopifyObject } from "./base.js";

export interface ProductImage extends ShopifyObject {
  /**
   * The alt text attribute for the image when included in liquid templates
   */
  alt: string | null;

  /**
   * A base64 image attachment. Only used when creating a <see cref="ProductImage"/>, where it's then converted into the <see cref="Src"/>.
   */
  attachment?: string;

  /**
   * The date and time when the product image was created. The API returns this value in ISO 8601 format.
   */
  created_at: string;

  /**
   * Specifies the file name of the image when creating a <see cref="ProductImage"/>, where it's then converted into the <see cref="Src"/> path
   */
  filename?: string;

  /**
   * Height dimension of the image which is determined on upload.
   */
  height: number;

  /**
   * The order of the product image in the list. The first product image is at position 1 and is the "main" image for the product.
   */
  position: number;

  /**
   * The id of the product associated with the image.
   */
  product_id: number;

  /**
   * Specifies the location of the product image.
   */
  src: string;

  /**
   * The date and time when the product image was last modified. The API returns this value in ISO 8601 format.
   */
  updated_at: string;

  /**
   * An array of variant ids associated with the image.
   */
  variant_ids: number[];

  /**
   * Width dimension of the image which is determined on upload.
   */
  width: number;
}
