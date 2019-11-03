import { Debug, Component } from '@ribajs/core';

export abstract class ShopifySectionComponent extends Component {

  public static tagName: string = 'shopify-section';

  protected debug = Debug('component:' + ShopifySectionComponent.tagName);

  protected abstract scope: any;

  constructor(element?: HTMLElement) {
    super(element);
    this.initEventListeners();
  }

  protected initEventListeners() {
    this.el.addEventListener('shopify:section:load', this.onSectionLoad);
    this.el.addEventListener('shopify:section:unload', this.onSectionUnload);
    this.el.addEventListener('shopify:section:select', this.onSectionSelect);
    this.el.addEventListener('shopify:section:deselect', this.onSectionDeselect);
    this.el.addEventListener('shopify:section:reorder', this.onSectionReorder);
    this.el.addEventListener('shopify:block:select', this.onBlockSelect);
    this.el.addEventListener('shopify:block:deselect', this.onBlockDeselect);
  }

  protected abstract template(): string | null;

  /**
   * A section has been added or re-rendered.
   * Re-execute any JavaScript needed for the section to work and display properly (as if the page had just been loaded).
   */
  protected onSectionLoad(event: Event) {
    this.debug('onSectionLoad', event);
  }

  protected onSectionUnload(event: Event) {
    this.debug('onSectionUnload', event);
  }

  protected onSectionSelect(event: Event) {
    this.debug('onSectionSelect', event);
  }

  protected onSectionDeselect(event: Event) {
    this.debug('onSectionDeselect', event);
  }

  protected onSectionReorder(event: Event) {
    this.debug('onSectionReorder', event);
  }

  protected onBlockSelect(event: Event) {
    this.debug('onBlockSelect', event);
  }

  protected onBlockDeselect(event: Event) {
    this.debug('onBlockDeselect', event);
  }

}
