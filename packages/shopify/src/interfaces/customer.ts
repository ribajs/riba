import { ShopifyCustomerAddress } from "./address.js";
import { ShopifyOrder } from "./order.js";

/**
 * The customer object
 * The `customer` object contains information about a customer who has a [customer account](https://help.shopify.com/en/manual/customers/customer-accounts).
 * @see https://help.shopify.com/en/themes/liquid/objects/customer
 */
export interface ShopifyCustomer {
  /** Returns `true` if the customer accepts marketing, returns `false` if the customer does not. */
  accepts_marketing: boolean;
  /** Returns an array of all addresses associated with a customer. See customer_address for a full list of available attributes. */
  addresses: ShopifyCustomerAddress[];
  /** Returns the number of addresses associated with a customer. */
  addresses_count: number;
  /** Returns the default customer_address. */
  default_address: ShopifyCustomerAddress | null;
  /** Returns the email address of the customer. */
  email: string;
  /** Returns the first name of the customer. */
  first_name: string;
  /**
   * Returns `true` if the email associated with an order is also tied to a customer account.
   * Returns `false` if it is not. Helpful in email templates.
   * In a theme, customer.has_account will always return true. In the checkout, it can return true or false.
   */
  has_account: boolean;
  /** Returns the id of the customer. */
  id: number;
  /** Returns the last name of the customer. */
  last_name: string;
  /** Returns the last order placed by the customer, not including test orders. */
  last_order: ShopifyOrder;
  /** Returns the full name of the customer. */
  name: string;
  /** Returns an array of all orders placed by the customer. */
  orders: ShopifyOrder[];
  /** Returns the total number of orders a customer has placed. */
  orders_count: number;
  /** Returns the list of tags associated with the customer. */
  tags: string[];
  /** Returns the total amount spent on all orders. */
  total_spent: number;
}
