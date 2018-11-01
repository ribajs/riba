import { Debug, RibaComponent, JQuery } from '@ribajs/core';

export abstract class ShopifySectionComponent {

}

// export abstract class ShopifySectionComponent extends RibaComponent {

//   public static tagName: string = 'rv-shopify-section';

//   protected debug = Debug('component:' + ShopifySectionComponent.tagName);

//   protected $el: JQuery<HTMLElement>;

//   protected abstract scope: any;

//   constructor(element?: HTMLElement) {
//     super(element);
//     this.$el = JQuery(this.el);

//     this.$el.on('shopify:section:load', this.onSectionLoad);
//     this.$el.on('shopify:section:unload', this.onSectionUnload);
//     this.$el.on('shopify:section:select', this.onSectionSelect);
//     this.$el.on('shopify:section:deselect', this.onSectionDeselect);
//     this.$el.on('shopify:section:reorder', this.onSectionReorder);
//     this.$el.on('shopify:block:select', this.onBlockSelect);
//     this.$el.on('shopify:block:deselect', this.onBlockDeselect);
//   }

//   protected abstract template(): string | null;

//   /**
//    * A section has been added or re-rendered.
//    * Re-execute any JavaScript needed for the section to work and display properly (as if the page had just been loaded).
//    */
//   protected onSectionLoad(event: JQuery.Event, data: any) {
//     this.debug('onSectionLoad', data);
//   }

//   protected onSectionUnload(event: JQuery.Event, data: any) {
//     this.debug('onSectionUnload', data);
//   }

//   protected onSectionSelect(event: JQuery.Event, data: any) {
//     this.debug('onSectionSelect', data);
//   }

//   protected onSectionDeselect(event: JQuery.Event, data: any) {
//     this.debug('onSectionDeselect', data);
//   }

//   protected onSectionReorder(event: JQuery.Event, data: any) {
//     this.debug('onSectionReorder', data);
//   }

//   protected onBlockSelect(event: JQuery.Event, data: any) {
//     this.debug('onBlockSelect', data);
//   }

//   protected onBlockDeselect(event: JQuery.Event, data: any) {
//     this.debug('onBlockDeselect', data);
//   }

// }
