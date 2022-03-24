/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */

import type { JsxEmptyTemplateProps } from "./index.js";

export interface EmptyTemplateIntrinsicElements {
  "empty-template": JsxEmptyTemplateProps;
}

declare global {
  namespace JSX {
    // This extends the IntrinsicElements interface defined in @ribajs/jsx
    interface IntrinsicElements extends EmptyTemplateIntrinsicElements {}
  }
}
