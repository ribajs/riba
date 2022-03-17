import { Roles } from "./role.js";
import { ShopifyShop } from "../shopify-api/shop.js";

export interface ShopifyConnect {
  _id: string;
  shopifyID: number;
  myshopify_domain: string;
  accessToken: string;
  createdAt: Date;
  updatedAt: Date;
  roles: Roles;
  shop: ShopifyShop;
}
