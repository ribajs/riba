import { Binder } from '../interfaces';

/**
 * Disables the element when value is true (negated version of `enabled` binder).
 */
export const disabledBinder: Binder<boolean> = {
  name: 'disabled',
  routine(el: HTMLUnknownElement, value: boolean) {
    (el as HTMLButtonElement).disabled = !!value;
  },
};
