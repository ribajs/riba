import { getOS } from "@ribajs/utils";

export const osFormatter = {
  name: "os",
  read() {
    return getOS();
  },
};
