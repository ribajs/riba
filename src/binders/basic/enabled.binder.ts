import { IOneWayBinder } from '../../binder.service';

/**
 * Enables the element when value is true.
 */
export const enabled: IOneWayBinder<boolean> = (el: HTMLElement, value: boolean) => {
  (el as HTMLButtonElement).disabled = !value;
};
