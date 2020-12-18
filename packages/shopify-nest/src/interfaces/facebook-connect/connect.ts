// import { ShopifyShop } from 'nest-shopify';

export interface FacebookConnect {
  facebookID: string;
  displayName: string;
  accessToken: string;
  createdAt: Date;
  updatedAt: Date;
  shop: any; // TODO ShopifyShop;
}
