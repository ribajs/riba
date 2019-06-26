import { IBinder } from '../interfaces';

/**
 * Enables the element when value is true.
 */
export const enabled: IBinder<boolean> = {
  routine(el: HTMLUnknownElement, value: boolean) {
    (el as HTMLButtonElement).disabled = !value;
  },
};
