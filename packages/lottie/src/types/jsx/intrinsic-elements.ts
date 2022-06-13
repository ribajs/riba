/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */

import type { JsxLottiePlayerProps } from "./index.js";

export interface EmptyTemplateIntrinsicElements {
  "lottie-player": JsxLottiePlayerProps;
}

declare global {
  namespace JSX {
    // This extends the IntrinsicElements interface defined in @ribajs/jsx
    interface IntrinsicElements extends EmptyTemplateIntrinsicElements {}
  }
}
