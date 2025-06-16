import type { JsxLottiePlayerProps } from "./index.js";

export interface LottieIntrinsicElements {
  "lottie-player": JsxLottiePlayerProps;
}

declare global {
  namespace JSX {
    // This extends the IntrinsicElements interface defined in @ribajs/jsx
    interface IntrinsicElements extends LottieIntrinsicElements {}
  }
}
