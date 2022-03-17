import { Binder } from "@ribajs/core";
import { getViewportDimensions, throttle } from "@ribajs/utils/src/index.js";
import { imgUrlFormatter } from "../formatters/img-url.formatter.js";

const PX_OFFSET = 10;
const OVERWRITE_ORIGINAL_SRC = true;

/**
 * shopify-img
 * Loads an shopify image with the exact size for the current `img` element
 * without the need to get the right size manually over the `img_url` filter / formatter.
 * The image source path is set by the `srcset` and `sizes` attributes to make them responsive.
 */
export class ShopifyImgBinder extends Binder<string, HTMLImageElement> {
  static key = "shopify-img";

  private initialSrc?: string;

  private oldImageWidth = (PX_OFFSET + 1) * -1;

  private resizeObserver?: ResizeObserver;

  private setSrcset(width: number) {
    // Max width
    if (width > 5760) {
      width = 5760;
    }
    let currentSrcset = this.el.srcset;
    let currentSizes = this.el.sizes;
    if (!imgUrlFormatter.read) {
      throw new Error("Shopify imgUrlFormatter read method is missing!");
    }
    const vw = getViewportDimensions().w;
    const filterScale = Math.round(window.devicePixelRatio || 1);
    const filterSize = width + "x";
    const newSrc = imgUrlFormatter.read(
      this.initialSrc,
      filterSize,
      filterScale,
      undefined,
      undefined,
      this.el
    );
    if (typeof currentSrcset === "string" && currentSrcset.length > 0) {
      currentSrcset = currentSrcset + ", ";
    } else {
      currentSrcset = "";
    }
    if (typeof currentSizes === "string" && currentSizes.length > 0) {
      currentSizes = currentSizes + ", ";
    } else {
      currentSizes = "";
    }
    const newSrcset = `${currentSrcset}${newSrc} ${width}w`;
    const newSizes = `${currentSizes} (width: ${vw}px) ${width}px`;
    this.el.srcset = newSrcset;
    this.el.sizes = newSizes;
    if (OVERWRITE_ORIGINAL_SRC) {
      this.el.src = newSrc;
    }
  }

  private _onResize() {
    const currentImageWidth = this.el.offsetWidth;
    const currentSrcset = this.el.srcset;
    if (
      this.oldImageWidth + PX_OFFSET < currentImageWidth &&
      currentImageWidth > 0 &&
      !currentSrcset.includes(`${currentImageWidth}w`)
    ) {
      this.setSrcset(currentImageWidth);
      this.oldImageWidth = currentImageWidth;
    }
  }

  private onResize = throttle(this._onResize.bind(this));

  bind(el: HTMLImageElement) {
    this.initialSrc = el.src;

    if (window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver((entries) => {
        entries.forEach(() => {
          this.onResize();
        });
      });
      this.resizeObserver.observe(el);
    } else {
      window.addEventListener("resize", this.onResize);
    }
  }

  unbind(el: HTMLImageElement) {
    window.removeEventListener("resize", this.onResize);
    if (this.resizeObserver && this.resizeObserver.unobserve) {
      this.resizeObserver.unobserve(el);
    }
  }

  routine(el: HTMLImageElement, src: string) {
    this.el = el;
    if (!imgUrlFormatter.read) {
      throw new Error("Shopify imgUrlFormatter read method is missing!");
    }
    if (src) {
      this._onResize();
      setTimeout(this.onResize, 200);
      // Set src attribute if it is not set statically
      if (
        !this.initialSrc ||
        typeof this.initialSrc !== "string" ||
        this.initialSrc.length <= 0
      ) {
        this.initialSrc = src;
        el.src = src;
      }
    }
  }
}
