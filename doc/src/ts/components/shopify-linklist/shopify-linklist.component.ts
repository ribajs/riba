import { ShopifyLinklistComponent as OriginalShopifyLinklistComponent } from '@ribajs/shopify/src/components/shopify-linklist/shopify-linklist.component';
import template from './shopify-linklist.component.html';

/**
 * shopify-filter
 */
export class ShopifyLinklistComponent extends OriginalShopifyLinklistComponent {

  public static tagName = 'shopify-linklist';

  constructor(element?: HTMLElement) {
    super(element);
  }

  /**
   * Only set the component template if there no childs already
   */
  protected template() {
    if (this.el.hasChildNodes()) {
      return null;
    } else {
      return template;
    }
  }
}
