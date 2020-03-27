import { Binder } from "../interfaces";

/**
 * class-*
 * class-[classname]
 *
 * Adds a class (whatever value is in place of [classname]) on the element
 * when the value evaluates to true and removes that class if the value
 * evaluates to false.
 * @example
 * <li rv-class-completed="todo.done">{ todo.name }</li>
 */
export const classStarBinder: Binder<boolean> = {
  name: "class-*",
  routine(el: HTMLElement, value: boolean) {
    if (this.args === null) {
      throw new Error("args is null");
    }
    const classList = el.className.split(" ").filter(ele => ele !== "");
    const arg = (this.args[0] as string).trim();
    const idx = classList.indexOf(arg);
    if (idx === -1) {
      if (value) {
        el.className += ` ${arg}`;
      }
    } else if (!value) {
      el.className = classList.filter((_, i) => i !== idx).join(" ");
    }
  }
};
