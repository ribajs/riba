import { Binder } from '../interfaces';

/**
 * Sets the element's text value.
 */
export const textBinder: Binder<string> = {
  name: 'text',
  routine(el: HTMLElement, value: string) {
    el.textContent = value != null ? value : '';
  },
};
