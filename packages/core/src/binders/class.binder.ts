import $ from 'jquery';
import { ITwoWayBinder, BinderWrapper } from '../services/binder.service';

export const addClass: ITwoWayBinder<string> = {
  function: true,
  priority: 1000,

  bind(el) {
    const $el = $(el);
    this.customData = {
      $el,
      staticClasses: $el.attr('class'),
    };
  },

  unbind(el: HTMLElement) {
    delete this.customData;
  },

  routine(el: HTMLElement, newValue: string) {
    if (newValue) {
      $(el).attr('class', this.customData.staticClasses);
      $(el).addClass(newValue);
    }
  },
};

/**
 * class
 * Adds the value of the attribute to the class.
 * Instead of `class-[classname]` the classname is setted by the attributes value and not by the star value
 */
export const classBinderWrapper: BinderWrapper = () => {
  const name = 'class';
  return {
    binder: addClass,
    name,
  };
};
