import { Component } from "../../component/component";
import {
  TemplateFunction,
  VideoComponentScope,
  MediaReadyState,
} from "../../types";
import { justDigits } from "@ribajs/utils";

export class VideoComponent extends Component {
  public static tagName = "rv-video";

  protected autobind = true;
  protected alreadyStartedPlaying = false;
  protected wasPaused = false;
  public _debug = false;

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
    this.onUpdate();
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
    this.onUpdate();
  }

  public get loop() {
    return this.video?.loop;
  }

  public set loop(loop: boolean) {
    this.video.loop = loop;
    if (loop) {
      this.video.setAttribute("loop", "");
    } else {
      this.video.removeAttribute("loop");
    }
    this.onUpdate();
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
    this.onUpdate();
  }

  public get currentTime() {
    return this.video?.currentTime || 0;
  }

  public set currentTime(currentTime: number) {
    this.video.currentTime = currentTime;
    this.onUpdate();
  }

  public get autoplay() {
    return this.video?.autoplay || false;
  }

  public set autoplay(autoplay: boolean) {
    this.video.autoplay = autoplay;
    this.onUpdate();
  }

  public get height() {
    return this.video?.height || 0;
  }

  public set height(height: number) {
    this.video.height = height;
    this.onUpdate();
  }

  public get width() {
    return this.video?.width || 0;
  }

  public set width(width: number) {
    this.video.width = width;
    this.onUpdate();
  }

  public get poster() {
    return this.video?.poster;
  }

  public set poster(poster: string) {
    this.video.poster = poster;
    this.onUpdate();
  }

  public get preload() {
    return this.video?.preload;
  }

  public set preload(preload: "" | "none" | "metadata" | "auto") {
    this.video.preload = preload;
    this.onUpdate();
  }

  public get disablePictureInPicture() {
    return (
      (this.video as any)?.disablePictureInPicture ||
      this.video?.hasAttribute("disablePictureInPicture") ||
      false
    );
  }

  public set disablePictureInPicture(disablePictureInPicture: boolean) {
    if (typeof (this.video as any)?.disablePictureInPicture !== "undefined") {
      (this.video as any).disablePictureInPicture = disablePictureInPicture;
    }

    if (disablePictureInPicture) {
      this.video.setAttribute("disablePictureInPicture", "");
    } else {
      this.video.removeAttribute("disablePictureInPicture");
    }

    this.onUpdate();
  }

  /**
   * @readonly
   */
  public get paused() {
    return this.video?.paused ?? true;
  }

  protected video: HTMLVideoElement;

  public scope: VideoComponentScope = {
    // properties
    muted: this.muted,
    volume: this.volume,
    loop: this.loop,
    controls: this.controls,
    currentTime: this.currentTime,

    videoSrc: undefined,
    autoplayOnMinBuffer: 0,
    autoplayMediaQuery: "",
    disablePictureInPicture: this.disablePictureInPicture,
    /**
     * @readonly
     */
    paused: this.paused,
    loading: false,
    duration: 0,
    readyState: MediaReadyState.HAVE_NOTHING,
    buffer: 0,
    // methods
    toggleMute: this.toggleMute,
    toggleControls: this.toggleControls,
    play: this.play,
    pause: this.pause,
    togglePlay: this.togglePlay,
    togglePause: this.togglePause,
    reset: this.reset,
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
  }

  public pause() {
    this.debug("pause");
    this.video.pause();
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

  public reset() {
    this.debug("reset");
    this.video.currentTime = 0;
    this.onUpdate();
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
    this.addEventListeners();
    this.onUpdate();
  }

  /**
   * Used to load new video source file
   */
  protected resetVideo() {
    this.video.innerHTML = "";
    const videoEl = this.video.cloneNode(true) as HTMLVideoElement;
    const videoWrapperEl = this.querySelector(".video-wrapper");
    this.removeEventListeners();
    this.video.remove();
    if (videoWrapperEl) {
      videoWrapperEl.appendChild(videoEl);
    } else {
      this.appendChild(videoEl);
    }

    this.video = videoEl;

    if (this.video.hasAttribute("muted")) {
      this.muted = true;
    } else {
      this.muted = false;
    }

    if (this.video.hasAttribute("controls")) {
      this.controls = true;
    } else {
      this.controls = false;
    }

    if (this.video.hasAttribute("autoplay")) {
      this.autoplay = true;
    } else {
      this.autoplay = false;
    }

    if (this.video.hasAttribute("height")) {
      this.height = justDigits(this.video.getAttribute("height") || 0);
    }

    if (this.video.hasAttribute("width")) {
      this.width = justDigits(this.video.getAttribute("width") || 0);
    }

    if (this.video.hasAttribute("loop")) {
      this.loop = true;
    } else {
      this.loop = false;
    }

    if (this.video.hasAttribute("muted")) {
      this.muted = true;
    } else {
      this.muted = false;
    }

    if (this.video.hasAttribute("poster")) {
      this.poster = this.video.getAttribute("poster") || "";
    }

    if (this.video.hasAttribute("preload")) {
      this.preload = (this.video.getAttribute("preload") || "") as
        | ""
        | "none"
        | "metadata"
        | "auto";
    }

    if (this.video.hasAttribute("disablePictureInPicture")) {
      this.disablePictureInPicture = true;
    } else {
      this.disablePictureInPicture = false;
    }

    this.scope.readyState = MediaReadyState.HAVE_NOTHING;
    this.alreadyStartedPlaying = false;
    this.scope.loading = false;

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
      // Initial check
      if (mediaQueryList.matches) {
        this.startAutoplay();
      }
    }

    this.video.addEventListener("progress", this.onVideoProgress);
    this.video.addEventListener("loadstart", this.onLoadStart);
    this.video.addEventListener("canplay", this.onCanPlay);
    this.video.addEventListener("canplaythrough", this.onCanPlayThrough);
    this.video.addEventListener("waiting", this.onWaiting);
    this.video.addEventListener("durationchange", this.onDurationChange);
    this.video.addEventListener("timeupdate", this.onTimeUpdate);
    this.video.addEventListener("play", this.onPlay);
    this.video.addEventListener("pause", this.onPause);
  }

  protected removeEventListeners() {
    if (this.scope.autoplayMediaQuery) {
      // autoplay-media-query attribute
      const mediaQueryList = window.matchMedia(this.scope.autoplayMediaQuery);
      mediaQueryList.removeEventListener("change", this.onMediaQueryListEvent);
    }

    this.video.removeEventListener("progress", this.onVideoProgress);
    this.video.removeEventListener("loadstart", this.onLoadStart);
    this.video.removeEventListener("canplay", this.onCanPlay);
    this.video.removeEventListener("canplaythrough", this.onCanPlayThrough);
    this.video.removeEventListener("waiting", this.onWaiting);
    this.video.removeEventListener("durationchange", this.onDurationChange);
    this.video.removeEventListener("timeupdate", this.onTimeUpdate);
    this.video.removeEventListener("play", this.onPlay);
    this.video.removeEventListener("pause", this.onPause);
  }

  protected _onUpdate() {
    if (this.scope.muted !== this.video.muted) {
      this.scope.muted = this.video.muted;
    }

    if (this.scope.volume !== this.video.volume) {
      this.scope.volume = this.video.volume;
    }

    if (this.scope.loop !== this.video.loop) {
      this.scope.loop = this.video.loop;
    }

    if (this.scope.controls !== this.video.controls) {
      this.scope.controls = this.video.controls;
    }

    if (this.scope.currentTime !== this.video.currentTime) {
      this.scope.currentTime = this.video.currentTime;
    }

    if (this.scope.paused !== this.video.paused) {
      this.scope.paused = this.video.paused;
    }

    if (this.scope.duration !== this.video.duration) {
      this.scope.duration = this.video.duration;
    }

    if (this.scope.readyState !== this.video.readyState) {
      this.scope.readyState = this.video.readyState;
    }
  }

  protected onUpdate = this._onUpdate.bind(this);

  protected async beforeBind() {
    this.initVideoElement();
  }

  /**
   * Loads the media and checks if the autoplay-on-min-buffer is set
   */
  public startAutoplay() {
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
      this.play();
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
        this.startAutoplay();
      }
    } else {
      //if mediaquery stops matching, pause video if not already paused
      this.wasPaused = this.video.paused;
      this.pause();
    }
  }

  protected onMediaQueryListEvent = this._onMediaQueryListEvent.bind(this);

  protected _onVideoProgress() {
    this.debug("_onVideoProgress");
    if (this.alreadyStartedPlaying) return;
    if (isNaN(this.video.duration)) {
      console.warn("Video duration is NaN");
      return;
    }

    // Calculate already buffered amount
    let bufferedAmount = 0;
    for (let i = 0; i < this.video.buffered.length; i++) {
      bufferedAmount +=
        this.video.buffered.end(i) - this.video.buffered.start(i);
    }

    this.scope.buffer = bufferedAmount / this.video.duration;

    // If buffered amount is over given percentage in scope, force autoplay
    if (
      this.scope.autoplayOnMinBuffer &&
      this.scope.buffer > this.scope.autoplayOnMinBuffer
    ) {
      this.forceAutoplay();
    }
  }

  protected onVideoProgress = this._onVideoProgress.bind(this);

  protected _onLoadStart() {
    this.debug("_onLoadStart");
    this.scope.loading = true;
    this.onUpdate();
  }

  protected onLoadStart = this._onLoadStart.bind(this);

  protected _onCanPlay() {
    this.debug("_onCanPlay");
    // this.scope.loading = false;
    this.onUpdate();
  }

  protected onCanPlay = this._onCanPlay.bind(this);

  protected _onCanPlayThrough() {
    this.scope.loading = false;
    if (this.scope.autoplayOnMinBuffer) {
      this.forceAutoplay(); // trust browser more than ourselves
    }
    this.onUpdate();
  }

  protected onCanPlayThrough = this._onCanPlayThrough.bind(this);

  protected _onWaiting() {
    this.debug("_onPlay");
    this.scope.loading = true;
    this.onUpdate();
  }

  protected onWaiting = this._onWaiting.bind(this);

  protected _onDurationChange() {
    this.onUpdate();
  }

  protected onDurationChange = this._onDurationChange.bind(this);

  protected _onTimeUpdate() {
    this.onUpdate();
  }

  protected onTimeUpdate = this._onTimeUpdate.bind(this);

  protected _onPlay() {
    this.debug("_onPlay");
    this.scope.loading = false;
    this.alreadyStartedPlaying = true;
    this.scope.paused = false;
    this.onUpdate();
  }

  protected onPlay = this._onPlay.bind(this);

  protected _onPause() {
    this.scope.paused = true;
    this.onUpdate();
  }

  protected onPause = this._onPause.bind(this);

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
