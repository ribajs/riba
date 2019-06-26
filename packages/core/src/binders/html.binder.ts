import { IBinder } from '../interfaces';

/**
 * Sets the element's text value.
 */
export const html: IBinder<string> = {
  routine(el: HTMLElement, value: string) {
    el.innerHTML = value != null ? value : '';
  },
};
