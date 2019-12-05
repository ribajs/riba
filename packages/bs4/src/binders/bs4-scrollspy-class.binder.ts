import { Binder, Utils } from '@ribajs/core';

/**
 * scrollspy-class
 * @see https://getbootstrap.com/docs/4.1/components/scrollspy/
 */
export const scrollspyClassBinder: Binder<string> = {
  name: 'bs4-scrollspy-*',
  bind(el: HTMLElement) {
    this.customData = {};
    /**
     * Determine if an element is in the viewport
     * @param elem The element
     * @return Returns true if element is in the viewport
     */
    this.customData.isInViewport = (elem: Element ): boolean => {
      if (!elem) {
        return false;
      }
      const distance = elem.getBoundingClientRect();
      this.customData.offsetTop = Number(el.dataset.offset || 0);
      this.customData.offsetBottom = Number(el.dataset.offsetBottom || 0);
      return (
        distance.top + distance.height >= this.customData.offsetBottom && distance.bottom - distance.height <= this.customData.offsetTop
      );
    };

    this.customData.onScroll = () => {
      const target = this.customData.target;
      const className = this.customData.className;
      if (!this.customData.target) {
        return;
      }

      /**
       * Because we are looking if the element is in viewport we should use the parent wrapper instead of header elements
       */
      // if (target.tagName === 'H1' || target.tagName === 'H2' || target.tagName === 'H3' || target.tagName === 'H4' || target.tagName === 'H5' || target.tagName === 'H6') {
      //   if (target.parentElement.tagName === 'SECTION') {
      //     target = target.parentElement;
      //   }
      // }

      if (this.customData.isInViewport(target)) {
        el.classList.add(className);
        if ((el as HTMLInputElement).type === 'radio') {
          (el as HTMLInputElement).checked = true;
        }
      } else {
        el.classList.remove(className);
        if ((el as HTMLInputElement).type === 'radio') {
          (el as HTMLInputElement).checked = false;
        }
      }
    };
    window.addEventListener('scroll', Utils.debounce(this.customData.onScroll), { passive: true });
    this.customData.onScroll();
  },
  routine(el: HTMLElement, targetSelector: string) {
    const nativeIDTargetSelector = targetSelector.replace('#', '');
    this.customData.target = document.getElementById(nativeIDTargetSelector);
    this.customData.className = this.args[0] as string;
  },
  unbind() {
    window.removeEventListener('scroll', Utils.debounce(this.customData.onScroll));
  },
};
