import { ShopifyImage } from "./image";

export declare interface ShopifyProductImage extends ShopifyImage {
  position: number;
  product_id: number;
  variant_ids: number[];
}

export declare enum ShopifyProductWeightUnit {
  GRAMS = "g",
  KILOGRAMS = "kg",
  OUNCES = "oz",
  POUNDS = "lb"
}

export declare interface ShopifyProductVariant {
  available: boolean;
  barcode: string;
  compare_at_price: number | null;
  featured_image: ShopifyProductImage | null;
  created_at: Date;
  fulfillment_service?: string;
  grams?: number;
  id: number;
  inventory_management: string | "shopify";
  inventory_policy?: string;
  inventory_quantity?: number;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  options: string[];
  price: number;
  public_title: string;
  requires_shipping: boolean;
  sku: string;
  taxable: boolean;
  title: string;
  updated_at: Date;
  weight: number;
  weight_unit?: ShopifyProductWeightUnit; // TODO
}

export declare interface ShopifyProductVariantOption {
  name: string;
  position: number;
  values: string[];
}

export declare interface ShopifyProduct {
  available: boolean;
  compare_at_price: number | null;
  compare_at_price_max: number;
  compare_at_price_min: number;
  compare_at_price_varies: boolean;
  created_at: Date;
  description: string;
  featured_image: string;
  handle: string;
  id: number;
  images: string[];
  options: ShopifyProductVariantOption[];
  price: number;
  price_max: number;
  price_min: number;
  price_varies: boolean;
  published_at: Date;
  tags: string[];
  title: string;
  type: string;
  updated_at?: Date;
  url: string;
  variants: ShopifyProductVariant[];
  vendor: string;
}
