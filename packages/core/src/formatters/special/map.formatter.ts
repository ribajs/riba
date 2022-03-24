/* eslint-disable prefer-spread */
/* eslint-disable prefer-rest-params */
import { Formatter } from "@ribajs/core";

/**
 * Calls a method on the given object. The first parameters defines the object and the second the methodname.
 * Target will be passed as the first argument to the method.
 * @see https://github.com/matthieuriolo/rivetsjs-stdlib#map
 * @example
 * ```html
 * <span rv-text="10 | map 'Math' 'sin'"></span>
 * ```
 * @returns e.g. as in the example: `<span>-0.5440211108893699</span>`
 */
export const mapFormatter: Formatter = {
  name: "map",
  /**
   * Calls a method on the given object. The first parameters defines the object and the second the method name.
   * Target will be passed as the first argument to the method.
   * @see https://github.com/matthieuriolo/rivetsjs-stdlib#map
   * @example
   * ```html
   * <span rv-text="10 | map 'Math' 'sin'"></span>
   * ```
   * @returns e.g. as in the example: `<span>-0.5440211108893699</span>`
   * @param target
   * @param obj
   * @param prop
   */
  read(target: any, obj: any, prop: string) {
    const args = Array.prototype.slice.call(arguments);
    args.splice(1, 2);
    return obj[prop].apply(obj, args);
  },
};
