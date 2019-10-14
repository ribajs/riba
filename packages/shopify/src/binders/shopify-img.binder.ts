import { IBinder, Utils } from '@ribajs/core';
import { imgUrlFormatter } from '../formatters/img-url.formatter';
import './ResizeObserver.d';

const PX_OFFSET = 10;
const OVERWRITE_ORIGINAL_SRC = false;

/**
 * shopify-img
 * Loads an shopify image with the exact size for the current `img` element without the need to get the right size manually over the `img_url` filter / formatter.
 * The image source path is set by the `srcset` and `sizes` attributes to make them responsive.
 */
export const shopifyImgBinder: IBinder<string> = {
  name: 'shopify-img',
  bind(el) {
    this.customData = {
      initialSrc: (el as HTMLImageElement).src,
      oldImageWidth: ((PX_OFFSET + 1) * -1),
      onResize: () => {
        const currentImageWidth = el.offsetWidth;
        let currentSrcset = (el as HTMLImageElement).srcset;
        let currentSizes = (el as HTMLImageElement).sizes;
        if (!imgUrlFormatter.read) {
          throw new Error('Shopify imgUrlFormatter read method is missing!');
        }
        if (this.customData.oldImageWidth + PX_OFFSET < currentImageWidth && currentImageWidth > 0 && !currentSrcset.includes(`${currentImageWidth}w`)) {
          const vw = Utils.getViewportDimensions().w;
          const filterScale = window.devicePixelRatio || 1;
          const filterSize = currentImageWidth + 'x';
          const newSrc = imgUrlFormatter.read(this.customData.initialSrc, filterSize, filterScale, undefined, undefined, el);
          if (typeof(currentSrcset) === 'string' && currentSrcset.length > 0) {
            currentSrcset = currentSrcset + ', ';
          } else {
            currentSrcset = '';
          }
          if (typeof(currentSizes) === 'string' && currentSizes.length > 0) {
            currentSizes = currentSizes + ', ';
          } else {
            currentSizes = '';
          }
          const newSrcset = `${currentSrcset}${newSrc} ${currentImageWidth}w`;
          const newSizes = `${currentSizes} (width: ${vw}px) ${currentImageWidth}px`;

          (el as HTMLImageElement).srcset = newSrcset;
          (el as HTMLImageElement).sizes = newSizes;
          if (OVERWRITE_ORIGINAL_SRC) {
            (el as HTMLImageElement).src = newSrc;
          }
          this.customData.oldImageWidth = currentImageWidth;
        }
      },
    };
    if ((window as any).ResizeObserver) {
      this.customData.resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          this.customData.onResize();
        });
      });
      this.customData.resizeObserver.observe(el);
    } else {
      window.addEventListener('resize', this.customData.onResize.bind(this));
    }
  },
  unbind(el: HTMLElement) {
    window.removeEventListener('resize', this.customData.onResize.bind(this));
    if (this.customData.resizeObserver && this.customData.resizeObserver.unobserve) {
      this.customData.resizeObserver.unobserve(el);
    }
  },
  routine(el, src) {
    if (!imgUrlFormatter.read) {
      throw new Error('Shopify imgUrlFormatter read method is missing!');
    }
    this.customData.initialSrc = this.customData.initialSrc || src;
    if (src) {
      if (el.offsetWidth > 0) {
        this.customData.onResize();
      } else {
        setTimeout(this.customData.onResize, 200);
      }
    } else {
      (el as HTMLImageElement).src = this.customData.initialSrc;
    }
  },
};
