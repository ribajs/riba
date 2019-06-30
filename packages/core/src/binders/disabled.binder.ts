import { IBinder } from '../interfaces';

/**
 * Disables the element when value is true (negated version of `enabled` binder).
 */
export const disabledBinder: IBinder<boolean> = {
  name: 'disabled',
  routine(el: HTMLUnknownElement, value: boolean) {
    (el as HTMLButtonElement).disabled = !!value;
  },
};
