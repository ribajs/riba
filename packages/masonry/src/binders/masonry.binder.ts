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
export class MasonryBinder extends Binder<Options, HTMLElement> {
  static key = "masonry";

  private masonry: Masonry | null = null;
  private images: NodeListOf<HTMLImageElement> | null = null;
  private resizeObserver: ResizeObserver | null = null;

  private _layout() {
    if (this.masonry?.layout) {
      this.masonry.layout();
    }
  }

  private layout = debounce(this._layout.bind(this));

  bind(el: HTMLElement) {
    if (window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(this.layout);
      this.resizeObserver.observe(el);
    } else {
      window.removeEventListener("resize", this.layout);
      window.addEventListener("resize", this.layout, {
        passive: true,
      });
    }

    // All components bound
    const lifecycle = LifecycleService.getInstance();
    lifecycle.events.once("ComponentLifecycle:allBound", this.layout, this);

    // On new router page
    const routerEvents = new EventDispatcher("main");
    routerEvents.once("newPageReady", this.layout, this);
    routerEvents.once("transitionCompleted", this.layout, this);

    this.layout();
  }

  unbind(el: HTMLElement) {
    let masonry = this.masonry as Masonry | null;
    if (masonry?.destroy) {
      masonry.destroy();
      masonry = null;
    }
    this.images.forEach((img: HTMLImageElement) => {
      // Image size changed
      this.resizeObserver?.unobserve(img);
    });

    this.resizeObserver?.unobserve(el);

    window.removeEventListener("resize", this.layout);
  }

  routine(el: HTMLElement, options: Options = {}) {
    if (this?.masonry?.destroy) {
      this.masonry.destroy();
    }
    this.masonry = new Masonry(el, options);

    this.images = el.querySelectorAll<HTMLImageElement>("img");

    // Detect image changes
    this.images.forEach((img: HTMLImageElement) => {
      // Default vanilla image loaded event
      img.removeEventListener("load", this.layout);
      img.addEventListener("load", this.layout, { once: true });
      // Additional event from images-events binder
      img.removeEventListener("load-always", this.layout);
      img.addEventListener("load-always", this.layout, {
        once: true,
      });
      // Image size changed
      this.resizeObserver?.observe(img);
    });

    this.layout();
  }
}
