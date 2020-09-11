import { Formatter } from "../../interfaces";

export const padEndFormatter: Formatter = {
  name: "padEnd",
  read(target: string, length = 2, padString = "0") {
    return target.padEnd(length, padString);
  },
};
