import { Binder } from "../binder.js";

/**
 * remove-class
 * Removes the given class string.
 * Instead of `class-[classname]` the classname is removed by the
 * given attribute and not by the star value,
 * @example
 * <img class="loading" rv-src="img.src" rv-remove-class="loadingClass">
 */
export class RemoveClassBinder extends Binder<string, HTMLElement> {
  static key = "remove-class";
  private staticClassesString?: string;
  bind(el: HTMLElement) {
    this.staticClassesString = el.className;
  }
  routine(el: HTMLElement, value: string) {
    const regex = new RegExp(`\\b${value}\\b`, "g");
    if (!this.staticClassesString) {
      throw new Error("staticClassesString is undefined!");
    }
    el.className = this.staticClassesString.replace(regex, "").trim();
  }
}
