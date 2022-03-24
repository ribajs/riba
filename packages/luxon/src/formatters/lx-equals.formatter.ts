import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Equality check Two DateTimes are equal iff they represent the same millisecond, have the same zone and location, and are both valid.
 */
export const LuxonEqualsFormatter: Formatter = {
  name: "lx-equals",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-equals
   * @param target can be a Luxon DateTime object
   * @param other DateTime
   * @returns boolean
   */
  read(target: DateTime, other: DateTime): boolean {
    return target.equals(other);
  },
};
