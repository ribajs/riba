import { Binder } from "../binder";

/**
 * add-class
 * Adds the value of the attribute to the class.
 * Instead of `class-[classname]` the classname is defined by the
 * attribute value and not by the star value.
 * @example
 * <ul>
 *   <li rv-each-todo="todos">
 *     <div rv-add-class="todo.state"></div>
 *   </li>
 * <ul>
 */
export class AddClassBinder extends Binder<string, HTMLElement> {
  static key = "add-class";
  function = true;
  priority = 1000;
  private staticClasses?: string[];

  bind(el: HTMLElement) {
    this.staticClasses = el.className.split(" ");
  }

  unbind() {
    delete this.staticClasses;
  }

  routine(el: HTMLElement, newValue: string) {
    if (newValue) {
      if (this.staticClasses?.indexOf(newValue) === -1) {
        el.className = this.staticClasses.join(" ") + " " + newValue;
      }
    } else {
      if (this.staticClasses) {
        el.className = this.staticClasses.join(" ");
      }
    }
    el.className = el.className.trim();
  }
}
