import { IBinder } from '../interfaces';
import { JQuery as $ } from '../vendors/jquery.module';

/**
 * remove-class
 */
export const removeClassBinder: IBinder<string> = {
  name: 'remove-class',
  routine(el: HTMLElement, value: string) {
    const $el = $(el);
    if (value) {
      $el.removeClass(value);
    }
    return value;
  },
};
