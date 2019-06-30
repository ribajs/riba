import { IBinder } from '../interfaces';

/**
 * Enables the element when value is true.
 */
export const enabledBinder: IBinder<boolean> = {
  name: 'enabled',
  routine(el: HTMLUnknownElement, value: boolean) {
    (el as HTMLButtonElement).disabled = !value;
  },
};
