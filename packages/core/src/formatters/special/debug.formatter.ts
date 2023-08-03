import { Formatter } from "@ribajs/core";

export const debugFormatter: Formatter = {
  name: "debug",
  read(
    toPrint: any,
    level: "log" | "debug" | "info" | "error" | "warn" = "debug",
  ) {
    console[level](toPrint);
    return toPrint;
  },
};
