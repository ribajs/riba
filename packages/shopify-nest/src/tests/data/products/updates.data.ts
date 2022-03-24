import type { ProductUpdateCreate } from "../../../interfaces/shopify-api/product-update-create";

const products: ProductUpdateCreate[] = [
  /**
   * Update a product's title
   */
  {
    id: 632910392,
    title: "New product title",
  },
  /**
   * Update a product's tags
   */
  {
    id: 632910392,
    tags: `Barnes & Noble, John's Fav`,
  },
  /**
   * Update a product by clearing product images
   */
  {
    id: 632910392,
    images: [],
  },
  /**
   * Update a product by adding a new product image
   */
  {
    id: 632910392,
    images: [
      {
        id: 850703190,
      },
      {
        id: 562641783,
      },
      {
        src: "http://example.com/rails_logo.gif",
      },
    ],
  },
  /**
   * Update a product by reordering product image
   */
  {
    id: 632910392,
    images: [
      {
        id: 850703190,
        position: 2,
      },
      {
        id: 562641783,
        position: 1,
      },
    ],
  },
  /**
   * Update a product by reordering the product variants
   */
  {
    id: 632910392,
    variants: [
      {
        id: 457924702,
      },
      {
        id: 39072856,
      },
      {
        id: 49148385,
      },
      {
        id: 808950810,
      },
    ],
  },
  /**
   * Update a product and one of its variants
   */
  {
    id: 632910392,
    title: "Updated Product Title",
    variants: [
      {
        id: 808950810,
        price: "2000.00",
        sku: "Updating the Product SKU",
      },
      {
        id: 49148385,
      },
      {
        id: 39072856,
      },
      {
        id: 457924702,
      },
    ],
  },
  /**
   * Update a product's SEO title and description
   */
  {
    id: 632910392,
    metafields_global_title_tag: "Brand new title",
    metafields_global_description_tag: "Brand new description",
  },
  /**
   * Show a hidden product by changing the published attribute to true
   */
  {
    id: 632910392,
    published: true,
  },
  /**
   * Hide a published product by changing the published attribute to false
   */
  {
    id: 632910392,
    published: false,
  },
  /**
   * Add a metafield to an existing product
   */
  {
    id: 632910392,
    metafields: [
      {
        key: "new",
        value: "newvalue",
        value_type: "string",
        namespace: "global",
      },
    ],
  },
];

export default products;
