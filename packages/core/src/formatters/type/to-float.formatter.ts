import { Formatter } from "@ribajs/core/src/index.js";

/**
 * Returns the float representation of the given target
 * @see https://github.com/matthieuriolo/rivetsjs-stdlib/blob/master/src/rivetsstdlib.js#L133
 */
export const toFloatFormatter: Formatter = {
  name: "to-float",
  /**
   * Returns the integer representation of the given target.
   * @param target
   */
  read(target: any) {
    const ret = parseFloat((target * 1.0) as any);
    return isNaN(ret) ? 0.0 : ret;
  }
};
