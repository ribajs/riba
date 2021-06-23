import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Get the short human name for the zone's current offset, for example "EST" or "EDT". Defaults to the system's locale if no locale has been specified
 */
export const LuxonOffsetNameShortFormatter: Formatter = {
  name: "lx-offset-name-short",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-offsetNameShort
   * @param target can be a Luxon DateTime object
   * @returns string
   */
  read(target: DateTime): string {
    return target.offsetNameShort;
  },
};
