import { Formatter } from "@ribajs/core";
import moment from "moment";

/**
 * Returns a datetime as string from target.
 */
export const DatetimeFormatter: Formatter = {
  name: "datetime",
  /**
   * Returns a datetime as string from target.
   * @param target
   * @param format
   */
  read(target: moment.MomentInput, format?: string) {
    return moment(target).format(format);
  },
};
