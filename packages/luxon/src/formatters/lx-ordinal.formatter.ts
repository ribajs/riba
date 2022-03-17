import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Get the ordinal (meaning the day of the year)
 */
export const LuxonOrdinalFormatter: Formatter = {
  name: "lx-ordinal",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-ordinal
   * @param target can be a Luxon DateTime object
   * @returns DateTime
   */
  read(target: DateTime): number {
    return target.ordinal;
  }
};
