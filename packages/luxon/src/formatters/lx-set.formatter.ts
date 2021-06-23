import { Formatter } from "@ribajs/core";
import { DateTime, DateObjectUnits } from "luxon";

/**
 * "Set" the values of specified units.
 * Returns a newly constructed DateTime.
 */
export const LuxonSetFormatter: Formatter = {
  name: "lx-set",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-set
   * @param target can be a Luxon DateTime object
   * @param values Object
   * @returns DateTime
   */
  read(target: DateTime, values: DateObjectUnits): DateTime {
    return target.set(values);
  },
};
