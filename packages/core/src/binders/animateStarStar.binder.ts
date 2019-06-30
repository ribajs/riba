import { JQuery as $ } from '../modules';
import { IBinder } from '../interfaces';

/**
 * animate-{class}-{duration in ms}
 * Add animation class with start and done affix with duration
 */
export const animateStarBinder: IBinder<boolean> = {
  name: 'animate-*',
  function: true,
  priority: 1000,

  bind(el) {
    const $el = $(el);
    const animateClassName = (this as any).args[0];
    $el
    .addClass(animateClassName);
  },

  unbind(el: HTMLElement) {
    //
  },

  routine(el: HTMLElement, start: boolean) {
    const $el = $(el);
    const animateClassName = (this as any).args[0];
    if (start) {
      $el
      .addClass(animateClassName + '-start')
      .removeClass(animateClassName + '-done');
    } else {
      $el
      .removeClass(animateClassName + '-start')
      .addClass(animateClassName + '-done');
    }
  },
};
