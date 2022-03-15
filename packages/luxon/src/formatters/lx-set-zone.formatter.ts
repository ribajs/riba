import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime, Zone, ZoneOptions } from "luxon";

/**
 * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
 * By default, the setter keeps the underlying time the same (as in, the same timestamp), but the new instance will report different local times and consider DSTs when making computations, as with plus. You may wish to use toLocal and toUTC which provide simple convenience wrappers for commonly used zones.
 */
export const LuxonSetZoneFormatter: Formatter = {
  name: "lx-set-zone",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-setZone
   * @param target can be a Luxon DateTime object
   * @param zone string | Zone
   * @param opts ZoneOptions
   * @returns DateTime
   */
  read(target: DateTime, zone: string | Zone, opts?: ZoneOptions): DateTime {
    return target.setZone(zone, opts);
  }
};
