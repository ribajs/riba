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
   */
  read(start: moment.MomentInput, end?: moment.MomentInput) {
    if (!end) {
      end = moment.now();
    }
    return moment.duration(moment(end).diff(start));
  },
};
