import { ShopifyLinklistComponent as OriginalShopifyLinklistComponent } from "@ribajs/shopify";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";

/**
 * shopify-filter
 */
export class ShopifyLinklistComponent extends OriginalShopifyLinklistComponent {
  public static tagName = "shopify-linklist";

  constructor() {
    super();
  }

  /**
   * Only set the component template if there no childs already
   */
  protected async template() {
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      const { default: template } = await import(
        "./shopify-linklist.component.html?raw"
      );
      return template;
    }
  }
}
