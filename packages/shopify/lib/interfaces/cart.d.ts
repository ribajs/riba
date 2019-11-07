export interface ShopifyCartObject {
    attributes: any;
    currency: string;
    item_count: number;
    items: ShopifyCartLineItem[];
    note: string | null;
    original_total_price: number;
    requires_shipping: boolean;
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
export interface ShopifyCartLineItem {
    id: number;
    title: string;
    price: number;
    line_price: number;
    quantity: number;
    sku: string | null;
    grams: number;
    vendor: string;
    properties: null | any;
    variant_id: number;
    gift_card: boolean;
    url: string;
    image: string;
    handle: string;
    requires_shipping: boolean;
    product_title: string;
    product_description: string;
    product_type: string;
    variant_title: string;
    variant_options: Array<string>;
}
