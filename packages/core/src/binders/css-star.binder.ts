import { IBinder } from '../interfaces';
import { JQuery as $ } from '../modules/jquery.module';

/**
 * css-*
 * Adds a style to the element.
 *
 * ```html
 * <div rv-css-background-color="'blue'"></div>
 * ```
 * @see http://api.jquery.com/css/
 */
export const cssStarBinder: IBinder<string> = {
  name: 'css-*',
  routine(el: HTMLElement, value: string) {
    const $el = $(el);
    const propertyName = (this as any).args[0];
    if (value) {
      $el.css(propertyName, value);
    } else {
      $el.css(propertyName, '');
    }
    return value;
  },
};
