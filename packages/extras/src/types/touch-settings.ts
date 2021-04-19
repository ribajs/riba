export interface TouchSettings {
  tapPixelRange: number;
  swipeHThreshold: number;
  swipeVThreshold: number;
  tapholdThreshold: number;
  doubletapInterval: number;
  shakeThreshold: number;

  touchCapable: boolean;

  startevent: Array<"touchstart" | "mousedown">;
  endevent: Array<"touchend" | "touchcancel" | "mouseup">;
  moveevent: Array<"touchmove" | "mousemove">;
  tapevent: Array<"tap" | "click">;
}
