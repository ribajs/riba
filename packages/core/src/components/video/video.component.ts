import { Component } from "../../component/component";
import { TemplateFunction } from "../../types";

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
  togglePause: VideoComponent["togglePause"];

  // custom
  /** If the user will pass the video source for some reason */
  videoSrc?: string;
  autoplayOnMinBuffer: number;
  autoplayMediaQuery: string;
}

export class VideoComponent extends Component {
  public static tagName = "rv-video";

  protected autobind = true;
  protected alreadyStartedPlaying = false;
  protected wasPaused = false;
  protected updateInterval: ReturnType<typeof setInterval> | null = null;
  protected updateIntervalDelay = 200;
  public _debug = true;

  static get observedAttributes(): string[] {
    return ["video-src", "autoplay-on-min-buffer", "autoplay-media-query"];
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
    return this.video?.volume || 0;
  }

  public set volume(volume: number) {
    this.video.volume = volume;
    this.scope.volume = this.video.volume;
  }

  public get loop() {
    return this.video?.loop;
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
    return this.video?.controls;
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
    return this.video?.currentTime || 0;
  }

  public set currentTime(currentTime: number) {
    this.video.currentTime = currentTime;
    this.scope.currentTime = this.video.currentTime;
  }

  /**
   * @readonly
   */
  public get paused() {
    return this.video?.paused ?? true;
  }

  protected video: HTMLVideoElement;

  public scope: Scope = {
    // properties
    muted: this.muted,
    volume: this.volume,
    loop: this.loop,
    controls: this.controls,
    currentTime: this.currentTime,

    videoSrc: undefined,
    autoplayOnMinBuffer: 0,
    autoplayMediaQuery: "",
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
    togglePause: this.togglePause,
  };

  constructor() {
    super();
    const video = this.querySelector("video") as HTMLVideoElement;
    this.video = video;
  }

  public toggleMute() {
    this.debug("toggleMute");
    this.muted = !this.muted;
    this.onUpdate();
  }

  public toggleControls() {
    this.debug("toggleControls");
    this.controls = !this.controls;
    this.onUpdate();
  }

  public play() {
    this.debug("play");
    this.video.play();
    this.scope.paused = false;
    this.onUpdate();
  }

  public pause() {
    this.debug("pause");
    this.video.pause();
    this.scope.paused = true;
    this.onUpdate();
  }

  public togglePlay() {
    if (this.paused) {
      return this.play();
    } else {
      return this.pause();
    }
  }

  public togglePause() {
    this.debug("togglePause");
    return this.togglePlay();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(VideoComponent.observedAttributes);
  }

  protected initVideoElement() {
    const video = this.querySelector("video");
    if (!video) {
      throw new Error("The video child element is required!");
    }
    this.video = video;
    this.onUpdate();
  }

  protected resetVideo() {
    this.video.innerHTML = "";
    const videoEl = this.video.cloneNode(true) as HTMLVideoElement;
    this.video.remove();
    this.appendChild(videoEl);
    this.video = videoEl;
    this.initVideoElement();
  }

  protected setVideoSource() {
    if (this.scope.videoSrc) {
      this.resetVideo();
      let sourceElement = this.video.querySelector("source");
      if (!sourceElement) {
        sourceElement = document.createElement("source");
        this.video.appendChild(sourceElement);
      }
      sourceElement.setAttribute("src", this.scope.videoSrc);
    }
  }

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace
    );
    this.debug("parsedAttributeChangedCallback", attributeName);
    if (attributeName === "videoSrc") {
      this.setVideoSource();
    }
  }

  protected addEventListeners() {
    if (this.scope.autoplayMediaQuery) {
      // autoplay-media-query attribute
      const mediaQueryList = window.matchMedia(this.scope.autoplayMediaQuery);
      mediaQueryList.addEventListener("change", this.onMediaQueryListEvent);
      // Intial check
      if (mediaQueryList.matches) {
        this.autoplay();
      }
    }

    if (this.scope.autoplayOnMinBuffer) {
      this.video.addEventListener("progress", this.onVideoProgress);
      this.video.addEventListener(
        "canplaythrough",
        this.forceAutoplay // trust browser more than ourselves
      );
    }
  }

  protected _onUpdate() {
    console.debug("_onUpdate");
    if (this.scope.muted != this.video.muted) {
      this.scope.muted = this.video.muted;
    }

    if (this.scope.volume != this.video.volume) {
      this.scope.volume = this.video.volume;
    }

    if (this.scope.loop != this.video.loop) {
      this.scope.loop = this.video.loop;
    }

    if (this.scope.controls != this.video.controls) {
      this.scope.controls = this.video.controls;
    }

    if (this.scope.currentTime != this.video.currentTime) {
      this.scope.currentTime = this.video.currentTime;
    }

    if (this.scope.paused != this.video.paused) {
      this.scope.paused = this.video.paused;
    }
  }

  protected onUpdate = this._onUpdate.bind(this);

  protected setInvervals() {
    this.updateInterval = setInterval(this.onUpdate, this.updateIntervalDelay);
  }

  protected async beforeBind() {
    this.initVideoElement();
  }

  protected async afterBind() {
    this.setVideoSource();
    this.addEventListeners();
    this.setInvervals();

    await super.afterBind();
  }
  /**
   * Loads the media and checks if the autoplay-on-min-buffer is set
   */
  public autoplay() {
    if (this.scope.autoplayOnMinBuffer) {
      this.forceLoad();
    } else {
      this.forceAutoplay();
    }
  }

  public forceLoad() {
    this.video.setAttribute("preload", "auto");
    this.video.load();
  }

  /**
   * Forces autoplay without checking for the autoplay-on-min-buffer event
   */
  protected _forceAutoplay() {
    if (!this.alreadyStartedPlaying) {
      this.alreadyStartedPlaying = true;
      this.video.muted = true; //video is required to be muted if autoplay video is supposed to autoplay
      this.forceLoad();
      this.video.play();
    }
  }

  /**
   * Forces autoplay without checking for the autoplay-on-min-buffer event
   */
  public forceAutoplay = this._forceAutoplay.bind(this);

  /*********************
   * Event listener start
   *********************/
  protected _onMediaQueryListEvent(event: MediaQueryListEvent) {
    if (event.matches) {
      //if mediaquery matches, play video or start autoplay
      if (this.alreadyStartedPlaying) {
        if (!this.wasPaused) {
          this.play();
        }
      } else {
        this.autoplay();
      }
    } else {
      //if mediaquery stops matching, pause video if not already paused
      this.wasPaused = this.video.paused;
      this.pause();
    }
  }

  protected onMediaQueryListEvent = this._onMediaQueryListEvent.bind(this);

  protected _onVideoProgress() {
    if (this.alreadyStartedPlaying) return;
    if (isNaN(this.video.duration)) {
      console.warn("Video duration is NaN");
      return;
    }

    //calculate already buffered amount
    let bufferedAmount = 0;
    for (let i = 0; i < this.video.buffered.length; i++) {
      bufferedAmount +=
        this.video.buffered.end(i) - this.video.buffered.start(i);
    }

    //if buffered amount is over given percentage in scope, force autoplay
    if (bufferedAmount / this.video.duration > this.scope.autoplayOnMinBuffer) {
      this.forceAutoplay();
    }
  }

  protected onVideoProgress = this._onVideoProgress.bind(this);

  /*********************
   * Event listener end
   *********************/

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes).then((view) => {
      return view;
    });
  }

  // deconstruction
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }
}
