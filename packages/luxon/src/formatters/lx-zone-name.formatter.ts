import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Get the name of the time zone.
 */
export const LuxonZoneNameFormatter: Formatter = {
  name: "lx-zone-name",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-zoneName
   * @param target can be a Luxon DateTime object
   * @returns string
   */
  read(target: DateTime): string {
    return target.zoneName;
  },
};
