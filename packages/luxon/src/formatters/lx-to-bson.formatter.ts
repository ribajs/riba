import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Returns a BSON serializable equivalent to this DateTime.
 */
export const LuxonToBSONFormatter: Formatter = {
  name: "lx-to-bson",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toBSON
   * @param target can be a Luxon DateTime object
   * @returns Date
   */
  read(target: DateTime): Date {
    return target.toBSON();
  },
};
