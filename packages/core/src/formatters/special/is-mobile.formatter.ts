import { isMobile } from "@ribajs/utils";

export const isMobileFormatter = {
  name: "is-mobile",
  read() {
    return isMobile();
  },
};
