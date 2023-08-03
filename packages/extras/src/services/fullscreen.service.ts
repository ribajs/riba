export class FullscreenService {
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

  static instance?: FullscreenService;

  protected constructor() {
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

  public static getSingleton() {
    if (FullscreenService.instance) {
      return FullscreenService.instance;
    }
    FullscreenService.instance = new FullscreenService();
    return FullscreenService.instance;
  }

  public static supported() {
    const d = document as Document & any;
    return !!(
      d.exitFullscreen ||
      d.mozCancelFullScreen ||
      d.webkitExitFullscreen ||
      d.msExitFullscreen
    );
  }

  public enter(el?: HTMLElement) {
    if (!el) {
      el = document.body;
    }
    if (this.isFullscreen()) {
      return;
    }
    if (this.enterK === "webkitRequestFullscreen") {
      el[this.enterK as "requestFullscreen"](
        (Element as any).ALLOW_KEYBOARD_INPUT,
      );
    } else {
      el[this.enterK as "requestFullscreen"]();
    }
  }

  public exit() {
    if (this.isFullscreen()) {
      document[this.exitK as "exitFullscreen"]();
    }
  }

  public isFullscreen() {
    return document[this.elementK as "fullscreenElement"];
  }

  public toggle(el?: HTMLElement) {
    if (this.isFullscreen()) {
      this.exit();
      return;
    } else {
      this.enter(el);
    }
  }
}
