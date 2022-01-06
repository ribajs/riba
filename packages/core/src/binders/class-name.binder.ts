import { Binder } from "../binder";

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
export class ClassStarBinder extends Binder<boolean, HTMLElement | SVGElement> {
  static key = "class-*";
  routine(el: HTMLElement | SVGElement, value: boolean) {
    if (this.args === null) {
      throw new Error("args is null");
    }
    // Note: We use el.getAttribute("class") instead of el.className here to also support svg elements
    const className = el.getAttribute("class") || "";
    const classList = className.split(" ").filter((ele: string) => ele !== "");
    const arg = (this.args[0] as string).trim();
    const idx = classList.indexOf(arg);
    if (idx === -1) {
      if (value) {
        el.setAttribute("class", `${className} ${arg}`);
      }
    } else if (!value) {
      el.setAttribute("class", classList.filter((_, i) => i !== idx).join(" "));
    }
  }
}
