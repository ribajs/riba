import { Formatter } from "@ribajs/core";
import moment from "moment";

export const ToTimestampFormatter: Formatter = {
  name: "toTimestamp",
  read(target: string | number) {
    return moment(target).format("X");
  },
};
