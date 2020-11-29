import { Component } from "@ribajs/core";

export abstract class ShopifySectionComponent extends Component {
  public static tagName = "shopify-section";

  protected abstract scope: any;

  constructor(element?: HTMLElement) {
    super(element);
    this.initEventListeners();
  }

  protected initEventListeners() {
    this.el.addEventListener("shopify:section:load", this.onSectionLoad);
    this.el.addEventListener("shopify:section:unload", this.onSectionUnload);
    this.el.addEventListener("shopify:section:select", this.onSectionSelect);
    this.el.addEventListener(
      "shopify:section:deselect",
      this.onSectionDeselect
    );
    this.el.addEventListener("shopify:section:reorder", this.onSectionReorder);
    this.el.addEventListener("shopify:block:select", this.onBlockSelect);
    this.el.addEventListener("shopify:block:deselect", this.onBlockDeselect);
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
