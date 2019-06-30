import { IBinder } from '../interfaces';

/**
 * Sets the element's text value.
 */
export const textBinder: IBinder<string> = {
  name: 'text',
  routine(el: HTMLElement, value: string) {
    el.textContent = value != null ? value : '';
  },
};
