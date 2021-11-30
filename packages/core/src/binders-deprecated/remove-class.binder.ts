import { BinderDeprecated } from "../types";

/**
 * remove-class
 * Removes the given class string the class attibute.
 * Instead of `class-[classname]` the classname is removed by the
 * given attribute and not by the star value,
 * @example
 * <img class="loading" rv-src="img.src" rv-remove-class="loadingClass">
 */
export const removeClassBinder: BinderDeprecated<string> = {
  name: "remove-class",
  bind(el) {
    this.customData = {
      staticClassesString: el.className,
    };
  },
  routine(el: HTMLElement, value: string) {
    const regex = new RegExp(`\\b${value}\\b`, "g");
    el.className = this.customData.staticClassesString
      .replace(regex, "")
      .trim();
  },
};
