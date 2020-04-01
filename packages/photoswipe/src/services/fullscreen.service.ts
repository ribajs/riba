class FullscreenService {
  enterK:
    | "requestFullscreen"
    | "mozRequestFullScreen"
    | "webkitRequestFullscreen"
    | "msRequestFullscreen" = "requestFullscreen";
  exitK:
    | "exitFullscreen"
    | "mozCancelFullScreen"
    | "webkitExitFullscreen"
    | "msExitFullscreen" = "exitFullscreen";
  elementK:
    | "fullscreenElement"
    | "mozFullScreenElement"
    | "webkitFullscreenElement"
    | "msFullscreenElement" = "fullscreenElement";
  eventK:
    | "fullscreenchange"
    | "mozfullscreenchange"
    | "webkitfullscreenchange"
    | "MSFullscreenChange" = "fullscreenchange";

  constructor() {
    const dE = document.documentElement as HTMLElement & any;
    const tF = "fullscreenchange";

    if (dE.requestFullscreen) {
      this.enterK = "requestFullscreen";
      this.exitK = "exitFullscreen";
      this.elementK = "fullscreenElement";
      this.eventK = tF;
    } else if (dE.mozRequestFullScreen) {
      this.enterK = "mozRequestFullScreen";
      this.exitK = "mozCancelFullScreen";
      this.elementK = "mozFullScreenElement";
      this.eventK = ("moz" + tF) as FullscreenService["eventK"];
    } else if (dE.webkitRequestFullscreen) {
      this.enterK = "webkitRequestFullscreen";
      this.exitK = "webkitExitFullscreen";
      this.elementK = "webkitFullscreenElement";
      this.eventK = ("webkit" + tF) as FullscreenService["eventK"];
    } else if (dE.msRequestFullscreen) {
      this.enterK = "msRequestFullscreen";
      this.exitK = "msExitFullscreen";
      this.elementK = "msFullscreenElement";
      this.eventK = "MSFullscreenChange";
    }
  }

  enter(el: HTMLElement) {
    if (this.enterK === "webkitRequestFullscreen") {
      el[this.enterK as "requestFullscreen"](
        (Element as any).ALLOW_KEYBOARD_INPUT
      );
    } else {
      return el[this.enterK as "requestFullscreen"]();
    }
  }

  exit() {
    return document[this.exitK as "exitFullscreen"]();
  }

  isFullscreen() {
    return document[this.elementK as "fullscreenElement"];
  }
}

export const fullscreenApi = new FullscreenService();
