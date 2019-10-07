import { IBinder } from '@ribajs/core';
import { imgUrlFormatter } from '../formatters/img-url.formatter';

/**
 * shopify-img
 * Load shopify image with the exact size for the current img element
 */
export const shopifyImgBinder: IBinder<string> = {
  name: 'shopify-img',
  bind(el) {
    this.customData = {
      initialSrc: (el as HTMLImageElement).src,
      oldWidth: -1,
      resizeImage: () => {
        const currentWidth = el.offsetWidth;
        if (!imgUrlFormatter.read) {
          throw new Error('Shopify imgUrlFormatter read method is missing!');
        }
        if (this.customData.oldWidth < currentWidth && currentWidth > 0) {
          const scale = window.devicePixelRatio || 1;
          const size = currentWidth + 'x';
          (el as HTMLImageElement).src = imgUrlFormatter.read(this.customData.initialSrc, size, scale, undefined, undefined, el);
          this.customData.oldWidth = currentWidth;
        }
      },
    };
    // TODO ResizeObserver https://alligator.io/js/resize-observer/
    window.addEventListener('resize', this.customData.resizeImage.bind(this));
  },
  unbind(el: HTMLElement) {
    window.removeEventListener('resize', this.customData.resizeImage.bind(this));
  },
  routine(el, src) {
    if (!imgUrlFormatter.read) {
      throw new Error('Shopify imgUrlFormatter read method is missing!');
    }
    this.customData.initialSrc = this.customData.initialSrc || src;
    if (src) {
      if (el.offsetWidth > 0) {
        this.customData.resizeImage();
      } else {
        setTimeout(this.customData.resizeImage, 200);
      }
    } else {
      (el as HTMLImageElement).src = '';
    }
  },
};
