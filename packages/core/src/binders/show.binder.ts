import { IBinder } from '../interfaces';

/**
 * Shows the element when value is true.
 */
export const show: IBinder<boolean> = {
  routine(el: HTMLElement, value: boolean) {
    el.style.display = value ? '' : 'none';
    if (value) {
      el.removeAttribute('hidden');
    } else {
      el.setAttribute('hidden', 'true');
    }
  },
};
