/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */

import type { JsxFuseSearchProps } from "./index.js";

export interface FuseIntrinsicElements {
  "fuse-search": JsxFuseSearchProps;
}

declare global {
  namespace JSX {
    // This extends the IntrinsicElements interface defined in @ribajs/jsx
    interface IntrinsicElements extends FuseIntrinsicElements {}
  }
}
