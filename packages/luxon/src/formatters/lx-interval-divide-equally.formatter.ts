import { Formatter } from "@ribajs/core/src/index.js";
import { Interval } from "luxon";

/**
 * Split this Interval into the specified number of smaller intervals.
 */
export const LuxonIntervalDivideEquallyFormatter: Formatter = {
  name: "lx-interval-divide-equally",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-divideEqually
   * @param target Interval
   * @param numberOfParts number
   * @returns Interval[]
   */
  read(target: Interval, numberOfParts: number): Interval[] {
    return target.divideEqually(numberOfParts);
  },
};
