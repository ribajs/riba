import { IBinder } from '../interfaces';
import { JQuery as $ } from '../modules/jquery.module';
import { Utils } from '../services/utils';

/**
 * css-*
 * Adds a style to the element.
 *
 * ```html
 * <div rv-style-background-color="'blue'"></div>
 * ```
 * @see http://api.jquery.com/css/
 */
export const cssStarBinder: IBinder<string> = {
  name: 'style-*',
  routine(el: HTMLElement, value: string) {
    const propertyName = Utils.camelCase((this as any).args[0]);
    (el.style as any)[propertyName] = value;
    // if (typeof(value) !== 'undefined') {
    //   (el.style as any)[propertyName] = value;
    // } else {
    //   // TODO how remove style?
    //   delete (el.style as any)[propertyName];
    // }
  },
};
