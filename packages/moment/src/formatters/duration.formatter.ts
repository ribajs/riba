import { Formatter } from "@ribajs/core";
import moment from "moment";

/**
 * Get the duration between two dates
 * @example  {startAt | duration endAt | asHours }
 */
export const DurationFormatter: Formatter = {
  name: "duration",
  read(start: string, end: string) {
    return moment.duration(moment(end).diff(start));
  },
};
