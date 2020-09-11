import { Formatter } from "../../interfaces/formatter";

/**
 * Checks if value is a number
 * @see https://github.com/matthieuriolo/rivetsjs-stdlib/blob/master/src/rivetsstdlib.js#L82
 */
export const isIntegerFormatter: Formatter = {
  name: "isInteger",
  read(n: number) {
    /**
     * Thanks a lot to Dagg Nabbit
     * http://stackoverflow.com/questions/3885817/how-to-check-if-a-number-is-float-or-integer
     */
    return n === +n && n === (n | 0);
  },
};
