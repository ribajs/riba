import { IShopifyCustomer } from './customer.d';
import { IShopifyDiscount } from './discount.d';

export interface IShopifyOrderCustomAttributes {
  [key: string]: string;
}

/**
 * The order object
 * You can access the `order` object in a theme's Liquid templates with `customer.orders`.
 * @see https://help.shopify.com/en/themes/liquid/objects/order
 */
export interface IShopifyOrder {
  attributes: IShopifyOrderCustomAttributes;
  /** Returns `true` if an order is canceled, or `false` if it is not. */
  cancelled: boolean;
  /** Returns the timestamp of when an order was canceled. Use the date filter to format the timestamp. */
  cancelled_at: string; // Date?
  /**
   * Returns one of the following cancellation reasons, if an order was canceled:
   * * items unavailable
   * * fraudulent order
   * * customer changed/cancelled order
   * * other.
   */
  cancel_reason: 'items unavailable' | 'fraudulent order' | 'customer changed/cancelled order' | 'other';
  /** Returns the translated output of an order's order.cancel_reason. */
  cancel_reason_label: string;
  /** Returns the timestamp of when an order was created. Use the date filter to format the timestamp. */
  created_at: string; // Date?
  /** Returns the customer associated with the order. */
  customer: IShopifyCustomer;
  /** Returns a unique URL that the customer can use to access the order. */
  customer_url: string;
  /** Returns an array of discounts for an order. */
  discounts: IShopifyDiscount;
  /** Returns the email address associated with an order, if it exists. */
  email: string;
  /**
   * Returns the financial status of an order. The possible values are:
   * * `pending`
   * * `authorized`
   * * `paid`
   * * `partially_paid`
   * * `refunded`
   * * `partially_refunded`
   * * `voided`
   */
  financial_status: 'pending' | 'authorized' | 'paid' | 'partially_paid' | 'refunded' | 'partially_refunded' | 'voided';
  /** Returns the translated output of an order's financial_status. */
  financial_status_label: string;
  /** Returns the fulfillment status of an order. */
  fulfillment_status: any; // TODO
  /** Returns the translated output of an order's fulfillment_status. */
  fulfillment_status_label: string;
  [key: string]: any; // TODO
}
