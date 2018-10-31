import $ from 'jquery';
import { IOneWayBinder, BinderWrapper } from '../../binder.service';

export const removeClass: IOneWayBinder<string> = (el: HTMLElement, value: string) => {
  const $el = $(el);
  if (value) {
    $el.removeClass(value);
  }
  return value;
};

/**
 * remove-class
 */
export const removeClassBinder: BinderWrapper = () => {
  return {
    binder: removeClass,
    name: 'remove-class',
  };
};
