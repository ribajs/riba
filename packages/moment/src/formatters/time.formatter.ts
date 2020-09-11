import { Formatter } from "@ribajs/core";
import moment from "moment";

/**
 * Returns the time portion as string from target.
 */
export const TimeFormatter: Formatter = {
  name: "time",
  /**
   *  Returns the time portion as string from target.
   * @param target
   * @param format
   */
  read(target: moment.MomentInput, format?: string) {
    return moment(target).format(format);
  },
};
