import { Component } from "@ribajs/core";
import {
  ShopifyProductVariant,
  ShopifyProduct,
  ShopifyProductVariantOption,
  ShopifyCartService,
  ShopifyProductService,
} from "@ribajs/shopify";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import template from "./product-item.component.html";

export interface Scope {
  handle: string | null;
  product: ShopifyProduct | null;
  variant: ShopifyProductVariant | null;
  quantity: number;
  showDetailMenu: boolean;
  detailMenuPadding: string;
  // showAddToCartButton: boolean;
  chooseOption: ShopifyProductItemComponent["chooseOption"];
  addToCart: ShopifyProductItemComponent["addToCart"];
  toggleDetailMenu: ShopifyProductItemComponent["toggleDetailMenu"];
  decrease: ShopifyProductItemComponent["decrease"];
  increase: ShopifyProductItemComponent["increase"];
  colorOption: ShopifyProductVariantOption | null;
  sizeOption: ShopifyProductVariantOption | null;
  available: boolean;
}

/**
 * TODO minify this, create a general product service instead of extend from ShopifyProductItemComponent
 * or create a product list for all products
 * or just get the attributes we need like the options
 * or render the most with liquid
 */
export class ShopifyProductItemComponent extends Component {
  public static tagName = "shopify-product-item";

  protected autobind = true;

  /**
   * handle is the product handle to get the product json object
   * extras are product data wich is only avaiable over liquid and not over the product json object
   */
  static get observedAttributes() {
    return ["handle", "extras"];
  }

  protected scope: Scope = {
    handle: null,
    product: null,
    variant: null,
    quantity: 1,
    showDetailMenu: false,
    detailMenuPadding: "60px",
    // showAddToCartButton: false,
    chooseOption: this.chooseOption,
    addToCart: this.addToCart,
    toggleDetailMenu: this.toggleDetailMenu,
    decrease: this.decrease,
    increase: this.increase,
    colorOption: null,
    sizeOption: null,
    /**
     * If the variant is available, used to disable the add to cart button
     */
    available: false,
  };

  /**
   * Array with all selected product options
   */
  private selectedOptions: string[] = [];

  /**
   * Number of detail menü padding without px
   */
  private _menuPadding = 60;

  /**
   * Is true if the user has choosed an option
   */
  private optionChoosed = false;

  protected set menuPadding(padding: number) {
    this._menuPadding = padding;
    this.scope.detailMenuPadding = this._menuPadding + "px";
  }

  /**
   * available is only true if the variant is available and the user has clicked on an option
   */
  protected set available(available: boolean) {
    this.scope.available = available && this.optionChoosed;
  }

  protected set showMenu(show: boolean) {
    if (show) {
      this.menuPadding = 215;
    } else {
      this.menuPadding = 60;
    }
    this.scope.showDetailMenu = show;
  }

  protected get showMenu() {
    return this.scope.showDetailMenu;
  }

  protected set product(product: ShopifyProduct | null) {
    // console.debug('set product', product);
    if (product) {
      this.scope.product = ShopifyProductService.prepair(product);

      this.scope.colorOption = ShopifyProductService.getOption(
        this.scope.product,
        "color"
      );
      this.scope.sizeOption = ShopifyProductService.getOption(
        this.scope.product,
        "size"
      );

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
    this.scope.variant = variant;
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

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ShopifyProductItemComponent.observedAttributes);
  }

  public chooseOption(
    optionValue: string | number,
    position1: number,
    optionName: string,
    event: MouseEvent
  ) {
    optionValue = optionValue.toString();

    if (!this.scope.product) {
      throw new Error("Product not set!");
    }

    // console.debug('chooseOption', optionValue, position1, self.selectedOptions, self.variant);

    this.selectedOptions[position1 - 1] = optionValue.toString();
    const variant = ShopifyProductService.getVariantOfOptions(
      this.scope.product,
      this.selectedOptions
    );
    if (variant) {
      // Option choosed so enable add to cart button
      this.optionChoosed = true;

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
      .then((response: any /** TODO not any */) => {
        console.debug("addToCart response", response);
      })
      .catch((error: Error) => {
        console.debug("addToCart error", error);
      });
  }

  public toggleDetailMenu() {
    // console.debug('toggleDetailMenu');
    this.showMenu = !this.showMenu;
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
    this
      .querySelector<HTMLElement>(`.option-${optionName.toLocaleLowerCase()}`)
      ?.classList.remove("active");
    this
      .querySelector<HTMLElement>(
        `.option-${optionName.toLocaleLowerCase()}-${optionValue}`
      )
      ?.classList.add("active");
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
            if (this.optionChoosed) {
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
        return product;
      }
    );
  }

  protected async afterBind() {
    // console.debug('afterBind', this.scope);
    this.activateOptions();
  }

  protected requiredAttributes() {
    return ["handle"];
  }

  protected template() {
    // Only set the component template if there no childs already
    if (this && hasChildNodesTrim(this)) {
      return null;
    } else {
      return template;
    }
  }
}
