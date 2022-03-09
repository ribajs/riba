import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime } from "luxon";

/**
 * Get the value of unit.
 */
export const LuxonGetFormatter: Formatter = {
  name: "lx-get",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-get
   * @param target can be a Luxon DateTime object
   * @param unit keyof DateTime
   * @returns number
   */
  read(target: DateTime, unit: keyof DateTime): number {
    return target.get(unit);
  },
};
