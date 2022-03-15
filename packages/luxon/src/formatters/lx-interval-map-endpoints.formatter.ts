import { Formatter } from "@ribajs/core/src/index.js";
import { Interval, DateTime } from "luxon";

/**
 * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
 */
export const LuxonIntervalMapEndpointsFormatter: Formatter = {
  name: "lx-interval-map-endpoints",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-mapEndpoints
   * @param target Interval
   * @param mapFn (DateTime) => DateTime
   * @returns Interval
   */
  read(target: Interval, mapFn: (dt: DateTime) => DateTime): Interval {
    return target.mapEndpoints(mapFn);
  }
};
