import type { VideoComponent } from "../components/video/video.component";
import type { MediaReadyState } from "./media-ready-state";

export interface VideoComponentScope {
  // properties
  muted: boolean;
  volume: number;
  loop: boolean;
  controls: boolean;
  currentTime: number;
  disablePictureInPicture: boolean;
  /**
   * @readonly
   */
  paused: boolean;
  loading: boolean;
  duration: number;
  readyState: MediaReadyState;
  // methods
  toggleMute: VideoComponent["toggleMute"];
  toggleControls: VideoComponent["toggleControls"];
  play: VideoComponent["play"];
  pause: VideoComponent["pause"];
  togglePlay: VideoComponent["togglePlay"];
  togglePause: VideoComponent["togglePause"];
  reset: VideoComponent["reset"];

  // custom
  /** If the user will pass the video source for some reason */
  videoSrc?: string;
  autoplayOnMinBuffer: number;
  autoplayMediaQuery: string;
  buffer: number;
}
