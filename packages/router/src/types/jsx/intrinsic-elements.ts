/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */

import type {
  JsxRouterViewProps
} from "./";

export interface RouterIntrinsicElements {
  "router-view": JsxRouterViewProps;
}

declare global {
  namespace JSX {
    // This extends the IntrinsicElements interface defined in @ribajs/jsx
    interface IntrinsicElements extends RouterIntrinsicElements {}
  }
}
