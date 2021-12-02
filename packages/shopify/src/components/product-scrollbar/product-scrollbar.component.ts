import { Component, TemplateFunction } from "@ribajs/core";
import { Pjax, Prefetch } from "@ribajs/router";

export class ShopifyProductScrollbarComponent extends Component {
  public static tagName = "shopify-product-scrollbar";

  static get observedAttributes(): string[] {
    return [];
  }

  public scope: any = {
    onScroll: this.onScroll,
    onProductTap: this.onProductTap,
    onProductMouseenter: this.onProductMouseenter,
    title: "",
  };

  protected products: NodeListOf<HTMLElement> | null = null;

  constructor() {
    super();
  }

  /**
   * Default custom Element method
   * Invoked when the custom element is first connected to the document's DOM.
   */
  protected connectedCallback() {
    super.connectedCallback();
    this.products = this.querySelectorAll(".embed-responsive");
    this.init(ShopifyProductScrollbarComponent.observedAttributes);
  }

  /**
   * Just open the product url
   */
  public onProductTap(event: Event, scope: any, eventEl: HTMLElement) {
    const url = eventEl.dataset.url;
    if (!url) {
      return;
    }
    const pjax = Pjax.getInstance("main");
    if (!pjax) {
      return;
    }
    pjax.goTo(url);
  }

  /**
   * Preload product on mouse over
   */
  public onProductMouseenter(event: Event, scope: any, eventEl: HTMLElement) {
    const url = eventEl.dataset.url;
    const prefetch = Prefetch.getInstance();
    if (!prefetch) {
      return;
    }
    if (!url) {
      return;
    }
    prefetch.onLinkEnter(url, eventEl as HTMLAnchorElement, event);
  }

  /**
   * get product in the middle of the scrollbar element
   */
  public onScroll(event: Event, scope: any, eventEl: HTMLElement) {
    if (this.products) {
      for (let i = 0; i < this.products.length; i++) {
        const product = this.products[i];
        const productData = product.dataset;
        const parentRect = eventEl.getBoundingClientRect();
        const elementRect = product.getBoundingClientRect();
        const elementMiddle = elementRect.width / 2;
        /** centerX is 0 if the product is in the middle */
        const centerX =
          elementRect.left - (parentRect.width / 2 - elementMiddle);
        const offset = elementMiddle;

        if (centerX > offset * -1 && centerX < offset) {
          this.scope.title = productData.title;
        }
      }
    }
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }
}
