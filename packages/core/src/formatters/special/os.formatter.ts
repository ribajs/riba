import { getOS } from "@ribajs/utils/src/index.js";

export const osFormatter = {
  name: "os",
  read() {
    return getOS();
  }
};
