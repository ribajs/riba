"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
class ShopifySectionComponent extends core_1.Component {
    constructor(element) {
        super(element);
        this.initEventListeners();
    }
    initEventListeners() {
        this.el.addEventListener('shopify:section:load', this.onSectionLoad);
        this.el.addEventListener('shopify:section:unload', this.onSectionUnload);
        this.el.addEventListener('shopify:section:select', this.onSectionSelect);
        this.el.addEventListener('shopify:section:deselect', this.onSectionDeselect);
        this.el.addEventListener('shopify:section:reorder', this.onSectionReorder);
        this.el.addEventListener('shopify:block:select', this.onBlockSelect);
        this.el.addEventListener('shopify:block:deselect', this.onBlockDeselect);
    }
    /**
     * A section has been added or re-rendered.
     * Re-execute any JavaScript needed for the section to work and display properly (as if the page had just been loaded).
     */
    onSectionLoad(event) {
        console.debug('onSectionLoad', event);
    }
    onSectionUnload(event) {
        console.debug('onSectionUnload', event);
    }
    onSectionSelect(event) {
        console.debug('onSectionSelect', event);
    }
    onSectionDeselect(event) {
        console.debug('onSectionDeselect', event);
    }
    onSectionReorder(event) {
        console.debug('onSectionReorder', event);
    }
    onBlockSelect(event) {
        console.debug('onBlockSelect', event);
    }
    onBlockDeselect(event) {
        console.debug('onBlockDeselect', event);
    }
}
exports.ShopifySectionComponent = ShopifySectionComponent;
ShopifySectionComponent.tagName = 'shopify-section';
