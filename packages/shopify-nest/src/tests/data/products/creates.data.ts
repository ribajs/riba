import { ProductUpdateCreate } from "../../../interfaces/shopify-api/product-update-create";

const products: ProductUpdateCreate[] = [
  /**
   * Create a new product with the default product variant
   */
  {
    title: "Burton Custom Freestyle 151",
    body_html: "<strong>Good snowboard!</strong>",
    vendor: "Burton",
    product_type: "Snowboard",
    tags: `Barnes & Noble, John's Fav, "Big Air"`,
  },
  /**
   * Create a new unpublished product
   */
  {
    title: "Burton Custom Freestyle 151",
    body_html: "<strong>Good snowboard!</strong>",
    vendor: "Burton",
    product_type: "Snowboard",
    published: false,
  },
  /**
   * Create a new product with multiple product variants
   */
  {
    title: "Burton Custom Freestyle 151",
    body_html: "<strong>Good snowboard!</strong>",
    vendor: "Burton",
    product_type: "Snowboard",
    variants: [
      {
        option1: "First",
        price: "10.00",
        sku: "123",
      },
      {
        option1: "Second",
        price: "20.00",
        sku: "123",
      },
    ],
  },
  /**
   * Create a new product with multiple product variants and multiple options
   */
  {
    title: "Burton Custom Freestyle 151",
    body_html: "<strong>Good snowboard!</strong>",
    vendor: "Burton",
    product_type: "Snowboard",
    variants: [
      {
        option1: "Blue",
        option2: "155",
      },
      {
        option1: "Black",
        option2: "159",
      },
    ],
    options: [
      {
        name: "Color",
        values: ["Blue", "Black"],
      },
      {
        name: "Size",
        values: ["155", "159"],
      },
    ],
  },
  /**
   * Create a new product with the default variant and base64 encoded image
   */
  {
    title: "Burton Custom Freestyle 151",
    body_html: "<strong>Good snowboard!</strong>",
    vendor: "Burton",
    product_type: "Snowboard",
    images: [
      {
        attachment:
          "R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==\n",
      },
    ],
  },
  /**
   * Create a new product with the default variant and a product image that will be downloaded by Shopify
   */
  {
    title: "Burton Custom Freestyle 151",
    body_html: "<strong>Good snowboard!</strong>",
    vendor: "Burton",
    product_type: "Snowboard",
    images: [
      {
        src: "http://example.com/rails_logo.gif",
      },
    ],
  },
  /**
   * Creating a product without a title will return an error
   */
  {
    body_html: "A mystery!",
  },
];

export default products;
