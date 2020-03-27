import { Component } from "../../component/component";

interface Scope {
  // properties
  muted: boolean;
  volume: number;
  loop: boolean;
  controls: boolean;
  currentTime: number;
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

  // custom
  /** If the user will pass the mp4 source for some reason */
  mp4Src?: string;
}

export class VideoComponent extends Component {
  public static tagName = "rv-video";

  protected autobind = true;

  static get observedAttributes() {
    return ["mp4-src"];
  }

  public get muted() {
    return this.video && this.video.muted;
  }

  public set muted(muted: boolean) {
    this.video.muted = muted;
    this.scope.muted = this.video.muted;
    if (muted) {
      this.video.setAttribute("muted", "");
    } else {
      this.video.removeAttribute("muted");
    }
  }

  /**
   * * 1.0 is highest volume (100%. This is default)
   * * 0.5 is half volume (50%)
   * * 0.0 is silent (same as mute)
   */
  public get volume() {
    return this.video ? this.video.volume : 0;
  }

  public set volume(volume: number) {
    this.video.volume = volume;
    this.scope.volume = this.video.volume;
  }

  public get loop() {
    return this.video && this.video.loop;
  }

  public set loop(loop: boolean) {
    this.video.loop = loop;
    this.scope.loop = this.video.loop;
    if (loop) {
      this.video.setAttribute("loop", "");
    } else {
      this.video.removeAttribute("loop");
    }
  }

  public get controls() {
    return this.video && this.video.controls;
  }

  public set controls(controls: boolean) {
    this.video.controls = controls;
    this.scope.controls = this.video.controls;
    if (controls) {
      this.video.setAttribute("controls", "");
      // show controls
      this.video.dispatchEvent(new Event("mouseover"));
      this.video.dispatchEvent(new Event("mouseenter"));
      this.video.dispatchEvent(new Event("mousemove"));
    } else {
      this.video.removeAttribute("controls");
    }
  }

  public get currentTime() {
    return this.video ? this.video.currentTime : 0;
  }

  public set currentTime(currentTime: number) {
    this.video.currentTime = currentTime;
    this.scope.currentTime = this.video.currentTime;
  }

  /**
   * @readonly
   */
  public get paused() {
    return this.video && this.video.paused;
  }

  protected video: HTMLVideoElement;

  protected scope: Scope = {
    // properties
    muted: this.muted,
    volume: this.volume,
    loop: this.loop,
    controls: this.controls,
    currentTime: this.currentTime,
    /**
     * @readonly
     */
    paused: this.paused,
    // methods
    toggleMute: this.toggleMute,
    toggleControls: this.toggleControls,
    play: this.play,
    pause: this.pause,
    togglePlay: this.togglePlay,
    mp4Src: ""
  };

  constructor(element?: HTMLElement) {
    super(element);
    const video = this.el.querySelector("video") as HTMLVideoElement;
    this.video = video;
  }

  public toggleMute() {
    this.muted = !this.muted;
  }

  public toggleControls() {
    this.controls = !this.controls;
  }

  public play() {
    this.video.play();
  }

  public pause() {
    this.video.pause();
  }

  public togglePlay() {
    if (this.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  protected connectedCallback() {
    super.connectedCallback();
    const video = this.el.querySelector("video");
    if (!video) {
      throw new Error("The video child element is required!");
    }
    this.video = video;
    this.scope.muted = this.video.muted;
    this.scope.volume = this.video.volume;
    this.scope.loop = this.video.loop;
    this.scope.controls = this.video.controls;
    this.scope.currentTime = this.video.currentTime;
    this.scope.paused = this.video.paused;
    this.init(VideoComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes).then(view => {
      return view;
    });
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    return null;
  }
}
