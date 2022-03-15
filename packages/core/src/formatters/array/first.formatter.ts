import { getFormatter } from "./get.formatter.js";

/**
 * Array formatter to get the first element of an array
 */
export const firstFormatter = {
  name: "first",
  read(value: any | any[] | string) {
    return getFormatter.read(value, 0);
  }
};
