import { Formatter } from "@ribajs/core";
import { toIntegerFormatter } from "./to-integer.formatter.js";
import { toFloatFormatter } from "./to-float.formatter.js";

export const toDecimalFormatter: Formatter = {
  name: "to-decimal",
  read(target: any) {
    if (!toIntegerFormatter.read) {
      throw new Error("toIntegerFormatter must have a read function");
    }
    if (!toFloatFormatter.read) {
      throw new Error("toFloatFormatter must have a read function");
    }
    const retI = toIntegerFormatter.read(target * 1);
    const retF = toFloatFormatter.read(target);
    return retI == retF ? retI : retF;
  },
};
