import { IBinder } from '../interfaces';

/**
 * style-*
 * Adds a style to the element.
 *
 * ```html
 * <div rv-style-background-color="'blue'"></div>
 * ```
 */
export const cssStarBinder: IBinder<string> = {
  name: 'style-*',
  routine(el: HTMLElement, value: string) {
    const propertyName = (this as any).args[0];
    if (value === null || value === undefined || value === '') {
      (el.style as any).removeProperty(propertyName);
    } else {
      (el.style as any)[propertyName] = value;
    }
  },
};
