import { Binder, LifecycleService } from "@ribajs/core";
import Masonry from "masonry-layout";
import type { Options } from "masonry-layout";
import { debounce } from "@ribajs/utils";
import { EventDispatcher } from "@ribajs/events";

/**
 * masonry
 * This binder can be used similar to the original data-attribute of Masonry,
 * see the original documentation for the options
 * @see https://masonry.desandro.com/options.html
 *
 * If you want to order images with this binder you should use this binder together with the image-events binder (imageEventsBinder) from the @ribajs/extras module
 *
 * @example
 * <div class="grid" rv-image-events rv-masonry='{ "columnWidth": 200, "itemSelector": ".grid-item" }'>
 */
export const masonryBinder: Binder<Options> = {
  name: "masonry",

  bind(el: HTMLElement) {
    const _layout = () => {
      const masonry = this.customData.masonry as Masonry | null;
      if (masonry?.layout) {
        masonry.layout();
      }
    };

    this.customData = {
      masonry: null,
      layout: debounce(_layout.bind(this)),
      images: null,
      resizeObserver: null,
    };

    if (window.ResizeObserver) {
      this.customData.resizeObserver = new ResizeObserver(
        this.customData.layout
      );
      this.customData.resizeObserver.observe(el);
    } else {
      window.addEventListener("resize", this.customData.layout, {
        passive: true,
      });
    }

    // All components bound
    const lifecycle = LifecycleService.getInstance();
    lifecycle.events.once(
      "ComponentLifecycle:allBound",
      this.customData.layout,
      this
    );

    // On new router page
    const routerEvents = new EventDispatcher("main");
    routerEvents.once("newPageReady", this.customData.layout, this);
    routerEvents.once("transitionCompleted", this.customData.layout, this);

    this.customData.layout();
  },

  unbind(el: HTMLElement) {
    let masonry = this.customData.masonry as Masonry | null;
    if (masonry?.destroy) {
      masonry.destroy();
      masonry = null;
    }
    this.customData.images.forEach((img: HTMLImageElement) => {
      // Image size changed
      this.customData.resizeObserver?.unobserve(img);
    });

    this.customData.resizeObserver?.unobserve(el);

    window.removeEventListener("resize", this.customData.layout);

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
      // Default vanilla image loaded event
      img.addEventListener("load", this.customData.layout, { once: true });
      // Additional event from images-events binder
      img.addEventListener("load-always", this.customData.layout, {
        once: true,
      });
      // Image size changed
      this.customData.resizeObserver?.observe(img);
    });

    this.customData.layout();
  },
};
