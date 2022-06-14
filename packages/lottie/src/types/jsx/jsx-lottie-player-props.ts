import type { JsxHtmlGlobalProps } from "@ribajs/jsx/src/index.js";
import type { PlayMode } from "../index.js";

export interface JsxLottiePlayerProps extends JsxHtmlGlobalProps {
  /**
   * Autoplay animation on load.
   */
  autoplay?: boolean;

  /**
   * Background color.
   */
  background?: string;

  /**
   * Show controls.
   */
  controls?: boolean;

  /**
   * Number of times to loop animation.
   */
  count?: number;

  /**
   * Animation description for screen readers.
   */
  description?: string;

  /**
   * Direction of animation.
   */
  direction?: number;

  /**
   * Whether to play on mouse hover
   */
  hover?: boolean;

  /**
   * Intermission
   */
  intermission?: number;

  /**
   * Whether to loop animation.
   */
  loop?: boolean;

  /**
   * Play mode.
   */
  mode?: PlayMode;

  /**
   * Aspect ratio to pass to lottie-web.
   */
  preserveAspectRatio?: string;

  /**
   * Renderer to use.
   */
  renderer?: "svg";

  /**
   * seeker
   */
  seeker?: number;

  /**
   * Animation speed.
   */
  speed?: number;

  /**
   * Bodymovin JSON data or URL to JSON.
   * Required but type is optional because we can also use `rv-co-src` or `rv-src`
   */
  src?: any | string;

  /**
   * Enable web workers
   */
  webworkers?: boolean;
}
