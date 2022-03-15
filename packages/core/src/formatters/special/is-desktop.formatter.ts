import { isDesktop } from "@ribajs/utils/src/index.js";

export const isDesktopFormatter = {
  name: "is-desktop",
  read() {
    return isDesktop();
  }
};
