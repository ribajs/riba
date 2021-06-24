import { isDesktop } from "@ribajs/utils";

export const isDesktopFormatter = {
  name: "is-desktop",
  read() {
    return isDesktop();
  },
};
