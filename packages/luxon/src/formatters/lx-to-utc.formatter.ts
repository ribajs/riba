import { Formatter } from "@ribajs/core";
import { DateTime, ZoneOptions } from "luxon";

/**
 * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.

Equivalent to setZone('utc')
 */
export const LuxonToUTCFormatter: Formatter = {
  name: "lx-to-utc",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toUTC
   * @param target can be a Luxon DateTime object
   * @param offset number
   * @param opts ZoneOptions | undefined
   * @returns DateTime
   */
  read(target: DateTime, offset: number, opts?: ZoneOptions): DateTime {
    return target.toUTC(offset, opts);
  },
};
