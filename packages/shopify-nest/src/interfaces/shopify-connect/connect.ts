import { Roles } from './role';
import { ShopifyShop } from '../shopify-api/shop';

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
