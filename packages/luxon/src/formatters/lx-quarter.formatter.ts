import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime } from "luxon";

/**
 * Get the quarter
 */
export const LuxonQuarterFormatter: Formatter = {
  name: "lx-quarter",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-quarter
   * @param target can be a Luxon DateTime object
   * @returns number
   */
  read(target: DateTime): number {
    return target.quarter;
  },
};
