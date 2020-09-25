import { toStringFormatter } from "./to-string.formatter";

export const stringFormatter = {
  name: "string",
  read(value: any, def: string) {
    if (!toStringFormatter || toStringFormatter.read) {
      throw new Error("toStringFormatter.read not defined!");
    } else {
      console.warn(
        "The string formatter is depricated, please use toString instead!"
      );
      return (toStringFormatter as any).read(value, def);
    }
  },
};
