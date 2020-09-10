import { Formatter } from "@ribajs/core";
import moment from "moment";

export const ToMomentFormatter: Formatter = {
  name: "toMoment",
  read(date: string | number) {
    return moment(date);
  },
};
