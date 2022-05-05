export interface ShopifyCartObject {
  attributes: any;
  cart_level_discount_applications: []; // TODO https://shopify.dev/api/liquid/objects/discount-application
  currency: string;
  item_count: number;
  discount_applications: []; // TODO https://shopify.dev/api/liquid/objects/discount-application
  items: ShopifyCartLineItem[];
  items_subtotal_price: number;
  note: string | null;
  original_total_price: number;
  taxes_included: boolean;
  /** depreciated or undocumented? */
  requires_shipping: boolean;
  /** depreciated or undocumented? */
  token: string;
  total_discount: number;
  total_price: number;
  total_weight: number;
}

export interface ShopifyCartUpdateProperty {
  [variantId: number]: number;
}

export interface ShopifyCartAddError {
  status: number;
  message: string;
  description: string;
}

/**
 * See https://shopify.dev/docs/themes/liquid/reference/objects/line_item/
 */
export interface ShopifyCartLineItem {
  id: number;
  title: string;
  price: number;
  line_price: number;
  /** Not official property, but can be set by yourself in liquid using `{% for item in cart.items %}{% assign line_number = forloop.index %}{% endfor %}` */
  line_number?: string;
  quantity: number;
  sku: string | null;
  grams: number;
  vendor: string;
  properties: null | any;
  gift_card: boolean;
  url: string;
  image: string;
  /** Returns the line item key, a unique identifier for the line item. The line item key is constructed from the line item's variant ID plus a hash of the line item's properties, even if the item has no additional properties. */
  key: string;
  handle: string;
  requires_shipping: boolean;
  product_title: string;
  product_description: string;
  product_type: string;
  product_id: number;
  variant_title: string;
  variant_options: Array<string>;
  variant_id: number;
}
