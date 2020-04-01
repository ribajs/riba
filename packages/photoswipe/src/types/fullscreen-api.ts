export interface FullscreenApi {
  enterK:
    | "requestFullscreen"
    | "mozRequestFullScreen"
    | "webkitRequestFullscreen"
    | "msRequestFullscreen";
  exitK:
    | "exitFullscreen"
    | "mozCancelFullScreen"
    | "webkitExitFullscreen"
    | "msExitFullscreen";
  elementK:
    | "fullscreenElement"
    | "mozFullScreenElement"
    | "webkitFullscreenElement"
    | "msFullscreenElement";
  eventK:
    | "fullscreenchange"
    | "mozfullscreenchange"
    | "webkitfullscreenchange"
    | "MSFullscreenChange";

  enter(): void;
  exit(): void;
  isFullscreen(): Element | null;
}
