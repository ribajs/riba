import { Binder } from '../interfaces';

/**
 * Enables the element when value is true.
 */
export const enabledBinder: Binder<boolean> = {
  name: 'enabled',
  routine(el: HTMLUnknownElement, value: boolean) {
    (el as HTMLButtonElement).disabled = !value;
  },
};
