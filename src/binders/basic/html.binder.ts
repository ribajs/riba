import { IOneWayBinder } from '../../binder.service';

/**
 * Sets the element's text value.
 */
export const html: IOneWayBinder<string> = (el: HTMLElement, value: string) => {
  el.innerHTML = value != null ? value : '';
};
