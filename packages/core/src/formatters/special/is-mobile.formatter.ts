import { isMobile } from "@ribajs/utils/src/index.js";

export const isMobileFormatter = {
  name: "is-mobile",
  read() {
    return isMobile();
  },
};
