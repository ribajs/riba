import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * "Set" the DateTime's zone to the host's local zone.
 * Returns a newly constructed DateTime.
 */
export const LuxonToLocalFormatter: Formatter = {
  name: "lx-to-local",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toLocal
   * @param target can be a Luxon DateTime object
   * @returns DateTime
   */
  read(target: DateTime): DateTime {
    return target.toLocal();
  },
};
