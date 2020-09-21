import { Formatter } from "@ribajs/core";

/**
 * Returns the integer representation of the given target.
 * @see https://github.com/matthieuriolo/rivetsjs-stdlib/blob/master/src/rivetsstdlib.js#L128
 */
export const toIntegerFormatter: Formatter = {
  name: "toInteger",
  /**
   * Returns the integer representation of the given target.
   * @param target
   */
  read(target: any) {
    const ret = parseInt((target * 1) as any, 10);
    return isNaN(ret) ? 0 : ret;
  },
};
