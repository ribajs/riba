import { Binder, LifecycleService } from "@ribajs/core";
import Masonry from "masonry-layout";
import type { Options } from "masonry-layout";
import { throttle } from "@ribajs/utils";
import { EventDispatcher } from "@ribajs/events";

/**
 * masonry
 * This binder can be used similar to the original data-attribute of Masonry,
 * see the original documentation for the options
 * @see https://masonry.desandro.com/options.html
 *
 * @example
 * <div class="grid" rv-masonry='{ "columnWidth": 200, "itemSelector": ".grid-item" }'>
 */
export const masonryBinder: Binder<Options> = {
  name: "masonry",

  bind() {
    const layout = () => {
      const masonry = this.customData.masonry as Masonry | null;
      if (masonry?.layout) {
        masonry.layout();
      }
    };

    this.customData = {
      masonry: null,
      layout: throttle(layout.bind(this)),
      images: null,
      resizeObserver: null,
    };

    if (window.ResizeObserver) {
      this.customData.resizeObserver = new ResizeObserver(
        this.customData.layout
      );
    }

    // All components bound
    const lifecycle = LifecycleService.getInstance();
    lifecycle.events.on(
      "ComponentLifecycle:allBound",
      this.customData.layout,
      this
    );

    // On new router page
    const routerEvents = new EventDispatcher("main");
    routerEvents.on("newPageReady", this.customData.layout, this);

    this.customData.layout();
  },

  unbind() {
    let masonry = this.customData.masonry as Masonry | null;
    if (masonry?.destroy) {
      masonry.destroy();
      masonry = null;
    }
    this.customData.images.forEach((img: HTMLImageElement) => {
      // Image size changed
      this.customData.resizeObserver?.unobserve(img);
    });
    delete this.customData;
  },

  routine(el: HTMLElement, options: Options = {}) {
    if (this.customData?.masonry?.destroy) {
      this.customData.masonry.destroy();
    }
    this.customData.masonry = new Masonry(el, options);

    this.customData.images = el.querySelectorAll<HTMLImageElement>("img");

    // Detect image changes
    this.customData.images.forEach((img: HTMLImageElement) => {
      // Image loaded
      img.onload?.(this.customData.layout);
      // Image size changed
      this.customData.resizeObserver?.observe(img);
    });

    this.customData.layout();
  },
};
