import type { LottiePlayerComponent } from "../components/lottie-player/lottie-player.component.js";
import type { PlayMode, PlayerState } from "./index.js";

export interface LottiePlayerComponentScope {
  /**
   * Autoplay animation on load.
   */
  autoplay: boolean;

  /**
   * Background color.
   */
  background?: string;

  /**
   * Show controls.
   */
  controls: boolean;

  /**
   * Number of times to loop animation.
   */
  count?: number;

  /**
   * Player state.
   */
  currentState: PlayerState;

  /**
   * Animation description for screen readers.
   */
  description: string;

  /**
   * Direction of animation.
   */
  direction: number;

  /**
   * Whether to play on mouse hover
   */
  hover: boolean;

  /**
   * Intermission
   */
  intermission: number;

  /**
   * Whether to loop animation.
   */
  loop: boolean;

  /**
   * Play mode.
   */
  mode: PlayMode;

  /**
   * Aspect ratio to pass to lottie-web.
   */
  preserveAspectRatio: string;

  /**
   * Renderer to use.
   */
  renderer: "svg";

  /**
   * seeker
   */
  seeker: number;

  /**
   * Animation speed.
   */
  speed: number;

  /**
   * Bodymovin JSON data or URL to JSON.
   */
  src?: any | string; // TODO

  /**
   * Enable web workers
   */
  webworkers?: boolean;

  // ELEMENTS

  /**
   * Animation container.
   */
  container: HTMLElement | null;

  // METHODS

  handleSeekChange: LottiePlayerComponent["_handleSeekChange"];
  onInputMousedown: LottiePlayerComponent["_onInputMousedown"];
  onInputMouseup: LottiePlayerComponent["_onInputMouseup"];
  togglePlay: LottiePlayerComponent["togglePlay"];
  toggleLooping: LottiePlayerComponent["toggleLooping"];
  stop: LottiePlayerComponent["stop"];
}
