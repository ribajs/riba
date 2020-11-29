import { Binder } from "@ribajs/core";
import { getViewportDimensions } from "@ribajs/utils/src/dom";
import { throttle } from "@ribajs/utils/src/control";
import { imgUrlFormatter } from "../formatters/img-url.formatter";
import "../typings/resize-observer";

const PX_OFFSET = 10;
const OVERWRITE_ORIGINAL_SRC = true;

/**
 * shopify-img
 * Loads an shopify image with the exact size for the current `img` element without the need to get the right size manually over the `img_url` filter / formatter.
 * The image source path is set by the `srcset` and `sizes` attributes to make them responsive.
 */
export const shopifyImgBinder: Binder<string> = {
  name: "shopify-img",
  bind(el: HTMLElement) {
    this.customData = {
      initialSrc: (el as HTMLImageElement).src,
      oldImageWidth: (PX_OFFSET + 1) * -1,
      setSrcset: (width: number) => {
        // Max width
        if (width > 5760) {
          width = 5760;
        }
        let currentSrcset = (el as HTMLImageElement).srcset;
        let currentSizes = (el as HTMLImageElement).sizes;
        if (!imgUrlFormatter.read) {
          throw new Error("Shopify imgUrlFormatter read method is missing!");
        }
        const vw = getViewportDimensions().w;
        const filterScale = Math.round(window.devicePixelRatio || 1);
        const filterSize = width + "x";
        const newSrc = imgUrlFormatter.read(
          this.customData.initialSrc,
          filterSize,
          filterScale,
          undefined,
          undefined,
          el
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
        (el as HTMLImageElement).srcset = newSrcset;
        (el as HTMLImageElement).sizes = newSizes;
        if (OVERWRITE_ORIGINAL_SRC) {
          (el as HTMLImageElement).src = newSrc;
        }
      },
      onResize: throttle(() => {
        const currentImageWidth = el.offsetWidth;
        const currentSrcset = (el as HTMLImageElement).srcset;
        if (
          this.customData.oldImageWidth + PX_OFFSET < currentImageWidth &&
          currentImageWidth > 0 &&
          !currentSrcset.includes(`${currentImageWidth}w`)
        ) {
          this.customData.setSrcset(currentImageWidth);
          this.customData.oldImageWidth = currentImageWidth;
        }
      }),
    };
    if (ResizeObserver) {
      this.customData.resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((/*entry*/) => {
          this.customData.onResize();
        });
      });
      this.customData.resizeObserver.observe(el);
    } else {
      window.addEventListener("resize", this.customData.onResize);
    }
  },
  unbind(el: HTMLElement) {
    window.removeEventListener("resize", this.customData.onResize);
    if (
      this.customData.resizeObserver &&
      this.customData.resizeObserver.unobserve
    ) {
      this.customData.resizeObserver.unobserve(el);
    }
  },
  routine(el: HTMLElement, src: string) {
    if (!imgUrlFormatter.read) {
      throw new Error("Shopify imgUrlFormatter read method is missing!");
    }
    if (src) {
      this.customData.onResize();
      setTimeout(this.customData.onResize, 200);
      // Set src attribute if it is not set statically
      if (
        typeof this.customData.initialSrc !== "string" ||
        this.customData.initialSrc.length <= 0
      ) {
        this.customData.initialSrc = src;
        (el as HTMLImageElement).src = src;
      }
    }
  },
};
