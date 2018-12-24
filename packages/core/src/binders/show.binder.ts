import { IOneWayBinder } from '../interfaces';

/**
 * Shows the element when value is true.
 */
export const show: IOneWayBinder<boolean> = (el: HTMLElement, value: boolean) => {
  el.style.display = value ? '' : 'none';
  if (value) {
    el.removeAttribute('hidden');
  } else {
    el.setAttribute('hidden', 'true');
  }
};
