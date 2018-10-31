import $ from 'jquery';
import { IOneWayBinder, BinderWrapper } from '../services/binder.service';

export const classStar: IOneWayBinder<boolean> = function(el: HTMLElement, value: boolean) {
  if (this.args === null) {
    throw new Error('args is null');
  }
  const classList = el.className.split(' ').filter((ele) => ele !== '');
  const arg = (this.args[0] as string).trim();
  const idx = classList.indexOf(arg);
  if (idx === -1) {
    if (value) {
      el.className += ` ${arg}`;
    }
  } else if (!value) {
    el.className = classList.filter((_, i) => i !== idx).join(' ');
  }
};

/**
 * class-*
 * class-[classname]
 *
 * Custom version of class-[classname]
 * Adds a class (whatever value is in place of [classname]) on the element when the value evaluates to true and removes that class if the value evaluates to false.
 * @see http://rivetsjs.com/docs/reference/#class-[classname]
 */
export const classStarJQuery: IOneWayBinder<string> = function(el: HTMLElement, value: string) {
  const $el = $(el);
  const className = (this as any).args[0];
  if (value) {
    $el.addClass(className);
  } else {
    $el.removeClass(className);
  }
  return value;
};

export const classStarBinderWrapper: BinderWrapper = () => {
  return {
    binder: classStarJQuery,
    name: 'class-*',
  };
};
