/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */

import type { JsxSSRRootPageProps } from "./";

export interface SSRIntrinsicElements {
  "ssr-root-page": JsxSSRRootPageProps;
}

declare global {
  namespace JSX {
    // This extends the IntrinsicElements interface defined in @ribajs/jsx
    interface IntrinsicElements extends SSRIntrinsicElements {}
  }
}
