import { Formatter } from "@ribajs/core";
import moment from "moment";

/**
 * Get the duration between two dates
 * @example { startAt | duration endAt | asHours }
 */
export const DurationFormatter: Formatter = {
  name: "duration",
  /**
   * Get the duration between two dates
   * @example { startAt | duration endAt | asHours }
   * @param start
   * @param end
   */
  read(start: moment.MomentInput, end: moment.MomentInput) {
    return moment.duration(moment(end).diff(start));
  },
};
