import { Binder } from '../interfaces';

/**
 * Sets the element's text value.
 */
export const htmlBinder: Binder<string> = {
  name: 'html',
  routine(el: HTMLElement, value: string) {
    el.innerHTML = value ? value : '';
  },
};
