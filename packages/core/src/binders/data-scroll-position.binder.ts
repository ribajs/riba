import { Binder } from '../interfaces';
import { Utils } from '../services/utils';

/**
 * rv-data-scroll-position
 * Sets the scroll position to the element as a data attribute,
 * useful if you want to define styles depending on the scroll position.
 * ```
 * html:not([[data-scroll-position-y='0']) {
 *    padding-top: 3em;
 * }
 * ```
 * @see https://css-tricks.com/styling-based-on-scroll-position/
 */
export const dataScrollPositionBinder: Binder<string> = {
  name: 'data-scroll-position-y',
  bind(el) {
    if (!this.customData) {
      this.customData = {};
    }
    this.customData.onScroll = () => {
      console.debug('onScroll', window.scrollY);
      this.el.dataset['scroll-position-y'] = window.scrollY.toString();
    };
  },
  routine(el: HTMLUnknownElement, elementSelector: string = 'window') {
    // Remove old scroll event
    if (this.customData.watchScrollOnElement) {
      this.customData.watchScrollOnElement.removeEventListener('scroll', Utils.debounce.bind(this, this.customData.onScroll.bind(this)));
    }

    // Set new element to watch for the scroll event
    if (elementSelector === 'window') {
      this.customData.watchScrollOnElement = window;
    } else {
      this.customData.watchScrollOnElement = document.querySelector(elementSelector);
    }

    // Watch new element for scroll event
    if (this.customData.watchScrollOnElement) {
      this.customData.watchScrollOnElement.addEventListener('scroll', Utils.debounce.bind(this, this.customData.onScroll.bind(this)), { passive: true });
    }
  },
  unbind() {
    // Remove old scroll event
    if (this.customData.watchScrollOnElement) {
      this.customData.watchScrollOnElement.removeEventListener('scroll', Utils.debounce.bind(this, this.customData.onScroll.bind(this)));
    }
  },
};
