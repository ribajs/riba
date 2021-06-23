import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time". Defaults to the system's locale if no locale has been specified
 */
export const LuxonOffsetNameLongFormatter: Formatter = {
  name: "lx-offset-name-long",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-offsetNameLong
   * @param target can be a Luxon DateTime object
   * @returns string
   */
  read(target: DateTime): string {
    return target.offsetNameLong;
  },
};
