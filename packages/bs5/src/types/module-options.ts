import { Breakpoint } from "./breakpoint.js";
export interface Bs5ModuleOptions {
  breakpoints: Breakpoint[];
  /** Set this value to `false` if you do not want data to be stored in the browser, this may be useful for privacy reasons. */
  allowStoreDataInBrowser: boolean;
}
