import { IBinder } from '../interfaces';
import { ifBinder } from './if.binder';

/**
 * unless
 * Removes and unbinds the element and it's child nodes into the DOM when true
 * (negated version of `if` binder).
 */
export const unlessBinder: IBinder<boolean> = {
  name: 'unless',
  block: true,
  priority: 4000,

  bind: ifBinder.bind,

  unbind: ifBinder.unbind,

  routine(el: HTMLElement, value: boolean) {
    if (ifBinder.routine) {
        return ifBinder.routine.call(this, el, !value);
    }
  },

  update: ifBinder.update,
};
