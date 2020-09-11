import { Formatter } from "@ribajs/core";
import moment from "moment";

/**
 * Returns the date portion as string from target.
 */
export const DateFormatter: Formatter = {
  name: "date",
  /**
   * Returns the date portion as string from target.
   * @param target
   * @param format
   */
  read(target: moment.MomentInput, format?: string) {
    return moment(target).format(format);
  },
};
