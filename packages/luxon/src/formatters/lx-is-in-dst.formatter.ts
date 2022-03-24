import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Get whether the DateTime is in a DST (Dailyight saving time zone).
 */
export const LuxonIsInDSTFormatter: Formatter = {
  name: "lx-is-in-dst",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-isInDST
   * @param target can be a Luxon DateTime object
   * @returns boolean
   */
  read(target: DateTime): boolean {
    return target.isInDST;
  },
};
