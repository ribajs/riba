/**
 * The customer_address object
 * The `customer_address` contains information of addresses tied to a [Customer Account](https://help.shopify.com/en/manual/customers/customer-accounts).
 * @see https://help.shopify.com/en/themes/liquid/objects/customer-address
 */
export interface IShopifyCustomerAddress {
  /** Returns the value of the Address1 field of the address. */
  address1: string;
  /** Returns the value of the Address2 field of the address. */
  address2: string;
  /** Returns the value of the City field of the address. */
  city: string;
  /** Returns the value of the Company field of the address. */
  company: string;
  /** Returns the value of the Country field of the address. */
  country: string;
  /** Returns the value of the Country field of the address in ISO 3166-2 standard format. */
  country_code: string;
  /** Returns the value of the First Name field of the address. */
  first_name: string;
  /** Returns the id of customer address. */
  id: number;
  /** Returns the value of the Last Name field of the address. */
  last_name: string;
  /** Returns the value of the Phone field of the address. */
  phone: string;
  /** Returns the value of the Province/State field of the address. */
  province: string | null;
  /** Returns the abbreviated value of the Province/State field of the address. */
  province_code: string | null;
  /** Returns the combined values of the Address1 and Address2 fields of the address. */
  street: string;
  /** Returns the value of the Postal/Zip field of the address. */
  zip: string;
}
