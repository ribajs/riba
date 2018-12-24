import { IOneWayBinder } from '../interfaces';

/**
 * Hides the element when value is true (negated version of `show` binder).
 */
export const hide: IOneWayBinder<boolean> = (el: HTMLElement, value: boolean) => {
  el.style.display = value ? 'none' : '';
  if (value) {
    el.setAttribute('hidden', 'true');
  } else {
    el.removeAttribute('hidden');
  }
};
