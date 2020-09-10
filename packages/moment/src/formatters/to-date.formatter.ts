import { Formatter } from "@ribajs/core";
import moment from "moment";

export const ToDateFormatter: Formatter = {
  name: "toDate",
  read(target: number) {
    return moment.unix(target).toDate();
  },
};
