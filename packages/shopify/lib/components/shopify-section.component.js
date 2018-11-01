"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
class ShopifySectionComponent extends core_1.RibaComponent {
    constructor(element) {
        super(element);
        this.debug = core_1.Debug('component:' + ShopifySectionComponent.tagName);
        this.$el = core_1.JQuery(this.el);
        this.$el.on('shopify:section:load', this.onSectionLoad);
        this.$el.on('shopify:section:unload', this.onSectionUnload);
        this.$el.on('shopify:section:select', this.onSectionSelect);
        this.$el.on('shopify:section:deselect', this.onSectionDeselect);
        this.$el.on('shopify:section:reorder', this.onSectionReorder);
        this.$el.on('shopify:block:select', this.onBlockSelect);
        this.$el.on('shopify:block:deselect', this.onBlockDeselect);
    }
    /**
     * A section has been added or re-rendered.
     * Re-execute any JavaScript needed for the section to work and display properly (as if the page had just been loaded).
     */
    onSectionLoad(event, data) {
        this.debug('onSectionLoad', data);
    }
    onSectionUnload(event, data) {
        this.debug('onSectionUnload', data);
    }
    onSectionSelect(event, data) {
        this.debug('onSectionSelect', data);
    }
    onSectionDeselect(event, data) {
        this.debug('onSectionDeselect', data);
    }
    onSectionReorder(event, data) {
        this.debug('onSectionReorder', data);
    }
    onBlockSelect(event, data) {
        this.debug('onBlockSelect', data);
    }
    onBlockDeselect(event, data) {
        this.debug('onBlockDeselect', data);
    }
}
ShopifySectionComponent.tagName = 'rv-shopify-section';
exports.ShopifySectionComponent = ShopifySectionComponent;
