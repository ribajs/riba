import { Component, TemplateFunction } from "@ribajs/core";
import {
  ShopifyProductVariant,
  ShopifyProduct,
  ShopifyProductVariantOption,
  ShopifyCartService,
  ShopifyProductService,
} from "@ribajs/shopify";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import template from "./product.component.html";

export interface PreparedProductVariant extends ShopifyProductVariant {
  images?: string[];
}

export interface Scope {
  handle: string | null;
  product: ShopifyProduct | null;
  variant: PreparedProductVariant | null;
  quantity: number;
  showDetailMenu: boolean;
  // showAddToCartButton: boolean;
  chooseOption: ShopifyProductComponent["chooseOption"];
  addToCart: ShopifyProductComponent["addToCart"];
  toggleDetailMenu: ShopifyProductComponent["toggleDetailMenu"];
  decrease: ShopifyProductComponent["decrease"];
  increase: ShopifyProductComponent["increase"];
  /**
   * If the variant is available, used to disable the add to cart button
   */
  available: boolean;
}

export class ShopifyProductComponent extends Component {
  public static tagName = "shopify-product";

  protected autobind = true;

  /**
   * handle is the product handle to get the product json object
   * extras are product data which is only available over liquid and not over the product json object
   */
  static get observedAttributes(): string[] {
    return ["handle", "extras"];
  }

  public scope: Scope = {
    handle: null,
    product: null,
    variant: null,
    quantity: 1,
    showDetailMenu: false,
    // showAddToCartButton: false,
    chooseOption: this.chooseOption,
    addToCart: this.addToCart,
    toggleDetailMenu: this.toggleDetailMenu,
    decrease: this.decrease,
    increase: this.increase,
    /**
     * If the variant is available, used to disable the add to cart button
     */
    available: false,
  };

  private colorOption: ShopifyProductVariantOption | null = null;

  private selectedOptions: string[] = [];

  /**
   * Is true if the user has chosen an option
   */
  private optionChosen = false;

  protected set product(product: ShopifyProduct | null) {
    // console.debug('set product', product);
    if (product) {
      this.scope.product = ShopifyProductService.prepare(product);

      // this.selectedOptions = new Array(this.scope.product.options.length);

      this.colorOption =
        ShopifyProductService.getOption(this.scope.product, "color") || null;
      // set the first variant to the selected one
      this.variant = this.scope.product.variants[0];
    }
  }

  protected get product(): ShopifyProduct | null {
    return this.scope.product;
  }

  protected set variant(variant: ShopifyProductVariant | null) {
    if (variant === null) {
      // console.debug('Error: Variant ist null');
      return;
    }
    // console.debug('set variant', variant);
    this.scope.variant = this.prepareVariant(variant);
    if (this.scope.variant) {
      this.selectedOptions = this.scope.variant.options.slice();
      // console.debug('set selectedOptions', this.selectedOptions);
      this.available = this.scope.variant.available;
      this.activateOptions();
    }
  }

  protected get variant() {
    return this.scope.variant;
  }

  /**
   * available is only true if the variant is available and the user has clicked on an option
   */
  protected set available(available: boolean) {
    this.scope.available = available && this.optionChosen;
  }

  constructor() {
    super();
    // console.debug('constructor', this);
    this.init(ShopifyProductComponent.observedAttributes);
  }

  public chooseOption(
    optionValue: string | number,
    position1: number,
    optionName: string,
    event: MouseEvent
  ) {
    if (!this.scope.product) {
      throw new Error("Product not set!");
    }

    optionValue = optionValue.toString();

    // console.debug('chooseOption', optionValue, position1, self.selectedOptions, self.variant);

    this.selectedOptions[position1 - 1] = optionValue.toString();
    const variant = ShopifyProductService.getVariantOfOptions(
      this.scope.product,
      this.selectedOptions
    );
    if (variant) {
      // Option chosen so enable add to cart button
      this.optionChosen = true;

      this.variant = variant as ShopifyProductVariant;
    }

    event.stopPropagation();
  }

  public addToCart() {
    if (!this.variant) {
      // console.debug('Variant not selected');
      return;
    }
    // console.debug('addToCart', this.variant.id, this.scope.quantity);
    ShopifyCartService.add(this.variant.id, this.scope.quantity)
      .then((response) => {
        console.debug("addToCart response", response);
      })
      .catch((error) => {
        console.debug("addToCart error", error);
      });
  }

  public toggleDetailMenu() {
    // console.debug('toggleDetailMenu');
    this.scope.showDetailMenu = !this.scope.showDetailMenu;
  }

  public increase() {
    // console.debug('increase', this.scope.quantity);
    this.scope.quantity++;
  }

  public decrease() {
    // console.debug('decrease', this.scope.quantity);
    this.scope.quantity--;
    if (this.scope.quantity <= 0) {
      this.scope.quantity = 1;
    }
  }

  /**
   * Workaround because `rv-class-active="isOptionActive | call size"` is not updating if selectedOptions changes
   * @param optionValue
   * @param optionName
   */
  protected activateOption(optionValue: string, optionName: string) {
    optionValue = optionValue.toString().replace("#", "");
    // console.debug('activateOption', `.option-${optionName.toLowerCase()}-${optionValue}`);
    this.querySelector<HTMLElement>(
      `.option-${optionName.toLocaleLowerCase()}`
    )?.classList.remove("active");
    this.querySelector<HTMLElement>(
      `.option-${optionName.toLocaleLowerCase()}-${optionValue}`
    )?.classList.add("active");
  }

  /**
   * Activate option by selected options (scope.selectedOptions)
   * This method sets the active class to the options elements
   */
  protected activateOptions() {
    for (const position0 in this.selectedOptions) {
      if (this.selectedOptions[position0]) {
        const optionValue = this.selectedOptions[position0];
        if (this.scope.product) {
          // console.debug('activateOptions', this.scope.product.options[position0]);
          const optionName = this.scope.product.options[position0].name;
          // Only activate size if it was clicked by the user
          if (optionName === "size") {
            if (this.optionChosen) {
              this.activateOption(optionValue, optionName);
            }
          } else {
            this.activateOption(optionValue, optionName);
          }
        }
      }
    }
  }

  protected async beforeBind() {
    // console.debug('beforeBind');
    if (this.scope.handle === null) {
      throw new Error("Product handle not set");
    }
    return ShopifyProductService.get(this.scope.handle).then(
      (product: ShopifyProduct) => {
        this.product = product;
      }
    );
  }

  protected async afterBind() {
    // console.debug('afterBind', this.scope);
    this.activateOptions();
  }

  protected requiredAttributes(): string[] {
    return ["handle"];
  }

  protected template(): ReturnType<TemplateFunction> {
    // Only set the component template if there no childs already
    if (this && hasChildNodesTrim(this)) {
      return null;
    } else {
      return template;
    }
  }

  /**
   * custom version of images.indexOf but compares without protocol and query string in url
   * @param images
   * @param findImage
   */
  private indexOfUrl(images: string[], findImage: string) {
    let index = -1;
    const clearFindImage = findImage
      .split("?")[0] // remove query string
      .replace(/(^\w+:|^)\/\//, "//"); // remove protocol
    images.forEach((image, i) => {
      const clearImage = image
        .split("?")[0] // remove query string
        .replace(/(^\w+:|^)\/\//, "//"); // remove protocol
      if (clearImage === clearFindImage) {
        index = i;
      }
    });
    return index;
  }

  /**
   * Get images which are not linked to any variant
   */
  private getGeneralImages(optionName = "color") {
    optionName = optionName.toLowerCase();
    // // console.debug('getImages');
    const generalImages: string[] = [];
    if (this.scope.product) {
      // add images without optionName in filename
      this.scope.product.images.forEach((image: string) => {
        if (!image.toLowerCase().includes(`${optionName}-`)) {
          generalImages.push(image);
        }
      });
      // remove variant images from copied array
      this.scope.product.variants.forEach((variant: ShopifyProductVariant) => {
        let index = -1;
        if (variant.featured_image !== null && variant.featured_image.src) {
          index = this.indexOfUrl(generalImages, variant.featured_image.src);
        }
        if (index >= 0) {
          generalImages.splice(index, 1);
        }
      });
    }

    // // console.debug('getGeneralImages', generalImages);

    return generalImages;
  }

  /**
   * Get options images (without featured image) filtered by filename.
   * Shopify only supports one image per variant, with this function more images for each variant are possible.
   * The image filename must include {optionName}-{optionValue} for that.
   */
  private getOptionImages(
    option: ShopifyProductVariantOption,
    optionValue: string
  ) {
    optionValue = optionValue.toLowerCase().replace("#", "_");
    const optionName = option.name.toLowerCase();
    // // console.debug('getOptionImages', optionName, optionValue);
    const optionImages: string[] = [];
    if (this.scope.product) {
      this.scope.product.images.forEach((image: string) => {
        // // console.debug(`check ${optionName}-${optionValue} in`, image);
        if (image.toLowerCase().includes(`${optionName}-${optionValue}`)) {
          optionImages.push(image);
        }
      });
    }

    return optionImages;
  }

  /**
   * Get featured images of variant, use the first option image or the featured product image as fallback
   */
  private getFeaturedImage(variant: PreparedProductVariant) {
    if (variant.featured_image !== null) {
      variant.featured_image.src = variant.featured_image.src.replace(
        /(^\w+:|^)\/\//,
        "//"
      ); // remove protocol
      return variant.featured_image;
    }

    let fallbackImageSrc = "";

    if (variant.images && variant.images.length > 0) {
      fallbackImageSrc = variant.images[0];
    } else if (this.scope.product) {
      fallbackImageSrc = this.scope.product.featured_image;
    }

    if (!fallbackImageSrc) {
      return null;
    }

    // remove protocol for normalization
    fallbackImageSrc = fallbackImageSrc.replace(/(^\w+:|^)\/\//, "//");

    // If variant has no image use the default product image
    if (this.scope.product) {
      const featuredImage = {
        src: fallbackImageSrc,
        position: 0,
        product_id: this.scope.product.id,
        variant_ids: [] as PreparedProductVariant["id"][],
        alt: this.scope.product.title,
        created_at: this.scope.product.created_at,
        height: 0,
        width: 0,
        id: 0,
        updated_at: this.scope.product.created_at,
      };
      return featuredImage;
    }

    throw new Error("image not found");
  }

  /**
   * prepare variant, e.g. fix missing image etc
   * @param variant
   */
  private prepareVariant(variant: PreparedProductVariant) {
    if (variant === null) {
      // console.debug('Error: Variant is null!');
      return null;
    }

    if (this.colorOption) {
      variant.images = this.getOptionImages(
        this.colorOption,
        variant.options[this.colorOption.position - 1]
      );
    } else {
      // console.debug('Warn: colorOption not defined');
      variant.images = [];
    }

    variant.featured_image = this.getFeaturedImage(variant);

    if (variant.images && variant.featured_image) {
      // Remove featured image so that it does not appear twice
      const i = this.indexOfUrl(variant.images, variant.featured_image.src);
      if (i >= 0) {
        variant.images.splice(i, 1);
      }

      // add general images
      variant.images = variant.images.concat(this.getGeneralImages());
    }

    return variant;
  }
}
