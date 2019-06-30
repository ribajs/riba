import { IBinder } from '../interfaces';

/**
 * Sets the element's text value.
 */
export const htmlBinder: IBinder<string> = {
  name: 'html',
  routine(el: HTMLElement, value: string) {
    el.innerHTML = value != null ? value : '';
  },
};
