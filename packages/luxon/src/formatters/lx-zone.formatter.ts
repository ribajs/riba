import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime, Zone } from "luxon";

/**
 * Get the time zone associated with this DateTime.
 */
export const LuxonZoneFormatter: Formatter = {
  name: "lx-zone",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-zone
   * @param target can be a Luxon DateTime object
   * @returns Zone
   */
  read(target: DateTime): Zone {
    return target.zone;
  }
};
