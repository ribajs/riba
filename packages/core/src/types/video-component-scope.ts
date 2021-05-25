import type { VideoComponent } from "../components/video/video.component";

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
}
