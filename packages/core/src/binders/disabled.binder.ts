import { IOneWayBinder } from '../interfaces';

/**
 * Disables the element when value is true (negated version of `enabled` binder).
 */
export const disabled: IOneWayBinder<boolean> = (el: HTMLElement, value: boolean) => {
  (el as HTMLButtonElement).disabled = !!value;
};
