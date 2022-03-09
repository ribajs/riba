import { Formatter } from "@ribajs/core/src/index.js";
import moment from "moment";

/**
 * Returns the unix timestamp from target.
 */
export const ToTimestampFormatter: Formatter = {
  name: "toTimestamp",
  read(target: moment.MomentInput) {
    return moment(target).format("X");
  },
};
