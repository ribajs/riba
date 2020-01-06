import { Binder } from '../interfaces';

/**
 * add-class
 * Adds the value of the attribute to the class.
 * Instead of `class-[classname]` the classname is setted by the
 * attribute value and not by the star value.
 * @example
 * <ul>
 *   <li rv-each-todo="todos">
 *     <div rv-add-class="todo.state"></div>
 *   </li>
 * <ul>
 */
export const addClassBinder: Binder<string> = {
  name: 'add-class',
  function: true,
  priority: 1000,

  bind(el) {
    this.customData = {
      staticClasses: el.className.split(' '),
    };
  },

  unbind() {
    delete this.customData;
  },

  routine(el: HTMLElement, newValue: string) {
    if (newValue) {
      if (this.customData.staticClasses.indexOf(newValue) === -1) {
        el.className = this.customData.staticClasses.join(' ') + ' ' + newValue;
      }
    } else {
      el.className = this.customData.staticClasses.join(' ');
    }
    el.className = el.className.trim();
  },
};
