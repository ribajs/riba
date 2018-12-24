import { IOneWayBinder } from '../interfaces';

/**
 * Sets the element's text value.
 */
export const text: IOneWayBinder<string> = (el: HTMLElement, value: string) => {
  el.textContent = value != null ? value : '';
};
