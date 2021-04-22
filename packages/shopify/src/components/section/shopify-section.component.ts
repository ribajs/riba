import { Component } from "@ribajs/core";

export abstract class ShopifySectionComponent extends Component {
  public static tagName = "shopify-section";

  public abstract scope: any;

  constructor() {
    super();
    this.initEventListeners();
  }

  protected initEventListeners() {
    this.addEventListener("shopify:section:load", this.onSectionLoad);
    this.addEventListener("shopify:section:unload", this.onSectionUnload);
    this.addEventListener("shopify:section:select", this.onSectionSelect);
    this.addEventListener("shopify:section:deselect", this.onSectionDeselect);
    this.addEventListener("shopify:section:reorder", this.onSectionReorder);
    this.addEventListener("shopify:block:select", this.onBlockSelect);
    this.addEventListener("shopify:block:deselect", this.onBlockDeselect);
  }

  protected abstract template(): string | null;

  /**
   * A section has been added or re-rendered.
   * Re-execute any JavaScript needed for the section to work and display properly (as if the page had just been loaded).
   */
  protected onSectionLoad(event: Event) {
    console.debug("onSectionLoad", event);
  }

  protected onSectionUnload(event: Event) {
    console.debug("onSectionUnload", event);
  }

  protected onSectionSelect(event: Event) {
    console.debug("onSectionSelect", event);
  }

  protected onSectionDeselect(event: Event) {
    console.debug("onSectionDeselect", event);
  }

  protected onSectionReorder(event: Event) {
    console.debug("onSectionReorder", event);
  }

  protected onBlockSelect(event: Event) {
    console.debug("onBlockSelect", event);
  }

  protected onBlockDeselect(event: Event) {
    console.debug("onBlockDeselect", event);
  }
}
