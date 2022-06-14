import { Component, TemplateFunction } from "@ribajs/core";
import { JsxElement } from "@ribajs/jsx";
import lottie from "lottie-web/build/player/lottie";
import {
  PlayMode,
  PlayerEvents,
  PlayerState,
  LottiePlayerComponentScope,
  JsxLottiePlayerProps,
} from "../../types/index.js";

/**
 * Parse a resource into a JSON object or a URL string
 */
function parseSrc(src: string | object): string | object {
  if (typeof src === "object") {
    return src;
  }

  try {
    return JSON.parse(src);
  } catch (e) {
    // Try construct an absolute URL from the src URL
    const srcUrl: URL = new URL(src, window.location.href);

    return srcUrl.toString();
  }
}

function isLottie(json: Record<string, any>): boolean {
  const mandatory: string[] = ["v", "ip", "op", "layers", "fr", "w", "h"];

  return mandatory.every((field: string) =>
    Object.prototype.hasOwnProperty.call(json, field)
  );
}

async function fromURL(url: string): Promise<Record<string, any>> {
  if (typeof url !== "string") {
    throw new Error(`The url value must be a string`);
  }

  let json;

  try {
    // Try construct an absolute URL from the src URL
    const srcUrl: URL = new URL(url);

    // Fetch the JSON file from the URL
    const result: any = await fetch(srcUrl.toString());

    json = await result.json();
  } catch (err) {
    throw new Error(
      `An error occurred while trying to load the Lottie file from URL`
    );
  }

  return json;
}

/**
 * LottiePlayer web component class ported to Riba.js
 * @see https://github.com/LottieFiles/lottie-player/blob/master/src/lottie-player.ts
 */
export class LottiePlayerComponent extends Component {
  /**
   * The tag name of the element, in this case `<lottie-player>...</lottie-player>`
   */
  public static tagName = "lottie-player";

  public scope: LottiePlayerComponentScope = {
    autoplay: false,
    background: "transparent",
    controls: false,
    count: 0,
    currentState: PlayerState.Loading,
    description: "Lottie animation",
    direction: 1,
    hover: false,
    intermission: 1,
    loop: false,
    mode: PlayMode.Normal,
    preserveAspectRatio: "xMidYMid meet",
    renderer: "svg",
    seeker: 0,
    speed: 1,
    src: undefined,
    webworkers: false,
    container: null,
    handleSeekChange: this._handleSeekChange.bind(this),
    onInputMousedown: this._onInputMousedown.bind(this),
    onInputMouseup: this._onInputMouseup.bind(this),
    stop: this.stop.bind(this),
    toggleLooping: this.toggleLooping.bind(this),
    togglePlay: this.togglePlay.bind(this),
  };

  static get observedAttributes(): (keyof JsxLottiePlayerProps)[] {
    return [
      "autoplay",
      "background",
      "controls",
      "count",
      "description",
      "direction",
      "hover",
      "intermission",
      "loop",
      "mode",
      "preserveAspectRatio",
      "renderer",
      "seeker",
      "speed",
      "src",
      "webworkers",
    ];
  }

  protected requiredAttributes(): string[] {
    return ["src"];
  }

  private _io: IntersectionObserver | undefined = undefined;

  // private _ro: ResizeObserver | undefined = undefined;
  private _lottie?: any;

  private _prevState?: any;

  private _counter = 1;

  constructor() {
    super();
    // TODO:
    // this.attachShadow({ mode: "open" });
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(LottiePlayerComponent.observedAttributes);
  }

  protected async afterBind() {
    this.load(this.scope.src);
    await super.afterBind();
  }

  /**
   * Configure and initialize lottie-web player instance.
   */
  public async load(src: string | object) {
    // TODO:
    // if (!this.shadowRoot) {
    //   return;
    // }

    const options: any = {
      container: this.scope.container,
      loop: false,
      autoplay: false,
      renderer: this.scope.renderer,
      rendererSettings: {
        preserveAspectRatio: this.scope.preserveAspectRatio,
        clearCanvas: false,
        progressiveLoad: true,
        hideOnTransparent: true,
      },
    };

    // Load the resource information
    try {
      const srcParsed = parseSrc(src);
      let jsonData = {};
      let srcAttrib = typeof srcParsed === "string" ? "path" : "animationData";

      // Clear previous animation, if any
      if (this._lottie) {
        this._lottie.destroy();
      }

      // if (this.scope.webworkers) {
      //   lottie.useWebWorker(true);
      // }

      // Initialize lottie player and load animation
      this._lottie = lottie.loadAnimation({
        ...options,

        [srcAttrib]: srcParsed,
      });

      // Attach the event listeners before we check the requested json file for errors
      this._attachEventListeners();

      // Fetch resource if src is a remote URL
      if (srcAttrib === "path") {
        jsonData = await fromURL(srcParsed as string);
        srcAttrib = "animationData";
      } else {
        jsonData = srcParsed;
      }

      if (!isLottie(jsonData)) {
        this.scope.currentState = PlayerState.Error;
        this.dispatchEvent(new CustomEvent(PlayerEvents.Error));
      }
    } catch (err) {
      this.scope.currentState = PlayerState.Error;
      this.dispatchEvent(new CustomEvent(PlayerEvents.Error));
    }
  }

  /**
   * Returns the lottie-web instance used in the component.
   */
  public getLottie(): any {
    return this._lottie;
  }

  /**
   * Start playing animation.
   */
  public play() {
    if (!this._lottie) {
      return;
    }

    this._lottie.play();
    this.scope.currentState = PlayerState.Playing;

    this.dispatchEvent(new CustomEvent(PlayerEvents.Play));
  }

  /**
   * Pause animation play.
   */
  public pause(): void {
    if (!this._lottie) {
      return;
    }

    this._lottie.pause();
    this.scope.currentState = PlayerState.Paused;

    this.dispatchEvent(new CustomEvent(PlayerEvents.Pause));
  }

  /**
   * Stops animation play.
   */
  public stop(): void {
    if (!this._lottie) {
      return;
    }

    this._counter = 1;
    this._lottie.stop();
    this.scope.currentState = PlayerState.Stopped;

    this.dispatchEvent(new CustomEvent(PlayerEvents.Stop));
  }

  /**
   * Destroy animation and lottie-player element.
   */
  public destroy(): void {
    if (!this._lottie) {
      return;
    }

    this._lottie.destroy();
    this._lottie = null;
    this.scope.currentState = PlayerState.Destroyed;
    this.dispatchEvent(new CustomEvent(PlayerEvents.Destroyed));
    this.remove();
  }

  /**
   * Seek to a given frame.
   */
  public seek(value: number | string): void {
    if (!this._lottie) {
      return;
    }

    // Extract frame number from either number or percentage value
    const matches = /^(\d+)(%?)$/.exec(value.toString());

    if (!matches) {
      return;
    }

    // Calculate and set the frame number
    const frame =
      matches[2] === "%"
        ? (this._lottie.totalFrames * Number(matches[1])) / 100
        : Number(matches[1]);

    // Set seeker to new frame number
    this.scope.seeker = frame;

    // Send lottie player to the new frame
    if (this.scope.currentState === PlayerState.Playing) {
      this._lottie.goToAndPlay(frame, true);
    } else {
      this._lottie.goToAndStop(frame, true);
      this._lottie.pause();
    }
  }

  /**
   * Snapshot the current frame as SVG.
   *
   * If 'download' argument is boolean true, then a download is triggered in browser.
   */
  public snapshot(download = true): string | void {
    // TODO:
    // if (!this.shadowRoot) return;

    // Get SVG element and serialize markup
    // TODO: const svgElement = this.shadowRoot.querySelector(".animation svg") as Node;
    const svgElement = this.querySelector(".animation svg") as Node;
    const data = new XMLSerializer().serializeToString(svgElement);

    // Trigger file download
    if (download) {
      const element = document.createElement("a");

      element.href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        data
      )}`;
      element.download = `download_${this.scope.seeker}.svg`;
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }

    return data;
  }

  /**
   * Sets animation play speed.
   *
   * @param value Playback speed.
   */
  public setSpeed(value = 1): void {
    if (!this._lottie) {
      return;
    }

    this._lottie.setSpeed(value);
  }

  /**
   * Animation play direction.
   *
   * @param value Direction values.
   */
  public setDirection(value: number): void {
    if (!this._lottie) {
      return;
    }

    this._lottie.setDirection(value);
  }

  /**
   * Sets the looping of the animation.
   *
   * @param value Whether to enable looping. Boolean true enables looping.
   */
  public setLooping(value: boolean): void {
    if (this._lottie) {
      this.scope.loop = value;
      this._lottie.loop = value;
    }
  }

  /**
   * Toggle playing state.
   */
  public togglePlay(): void {
    return this.scope.currentState === PlayerState.Playing
      ? this.pause()
      : this.play();
  }

  /**
   * Toggles animation looping.
   */
  public toggleLooping(): void {
    this.setLooping(!this.scope.loop);
  }

  /**
   * Resize animation.
   */
  public resize() {
    if (!this._lottie) {
      return;
    }

    this._lottie.resize();
  }

  /**
   * Cleanup on component destroy.
   */
  public disconnectedCallback(): void {
    // Don't clean up if node is still connected to the context (i.e. this is a move).
    if (this.isConnected) return;

    // Remove intersection observer for detecting component being out-of-view.
    if (this._io) {
      this._io.disconnect();
      this._io = undefined;
    }

    // Remove resize observer for detecting resize/reflow events affecting element.
    // if (this._ro) {
    //   this._ro.disconnect();
    //   this._ro = undefined;
    // }

    // Remove the attached Visibility API's change event listener.
    document.removeEventListener("visibilitychange", () =>
      this._onVisibilityChange()
    );

    // Destroy the animation instance and element
    this.destroy();
  }

  /**
   * Initialize everything on component first render.
   */
  protected firstUpdated(): void {
    // Add intersection observer for detecting component being out-of-view.
    if ("IntersectionObserver" in window) {
      this._io = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          if (entries[0].isIntersecting) {
            if (this.scope.currentState === PlayerState.Frozen) {
              this.play();
            }
          } else if (this.scope.currentState === PlayerState.Playing) {
            this.freeze();
          }
        }
      );

      if (this.scope.container) this._io.observe(this.scope.container);
    }

    // Add listener for Visibility API's change event.
    if (typeof document.hidden !== "undefined") {
      document.addEventListener("visibilitychange", () =>
        this._onVisibilityChange()
      );
    }

    // Setup lottie player
    if (this.scope.src) {
      this.load(this.scope.src);
    }
    this.dispatchEvent(new CustomEvent(PlayerEvents.Rendered));
  }

  private _onInputMousedown() {
    this._prevState = this.scope.currentState;
    this.freeze();
  }

  private _onInputMouseup() {
    this._prevState === PlayerState.Playing && this.play();
  }

  /**
   * Handle visibility change events.
   */
  private _onVisibilityChange(): void {
    if (
      document.hidden === true &&
      this.scope.currentState === PlayerState.Playing
    ) {
      this.freeze();
    } else if (this.scope.currentState === PlayerState.Frozen) {
      this.play();
    }
  }

  /**
   * Handles click and drag actions on the progress track.
   */
  private _handleSeekChange(
    e: any,
    context: LottiePlayerComponentScope,
    el: HTMLInputElement
  ): void {
    if (!this._lottie || isNaN(Number(el.value))) {
      return;
    }

    const frame: number = Math.round(
      (Number(el.value) / 100) * this._lottie.totalFrames
    );
    // const frame: number = (Number(el.value) / 100) * this._lottie.totalFrames;
    // const percents = el.value + "%";

    this.seek(frame);
  }

  private _attachEventListeners(): void {
    this._lottie.addEventListener("enterFrame", () => {
      this.scope.seeker =
        (this._lottie.currentFrame / this._lottie.totalFrames) * 100;

      this.dispatchEvent(
        new CustomEvent(PlayerEvents.Frame, {
          detail: {
            frame: this._lottie.currentFrame,
            seeker: this.scope.seeker,
          },
        })
      );
    });

    // Handle animation play complete
    this._lottie.addEventListener("complete", () => {
      if (this.scope.currentState !== PlayerState.Playing) {
        this.dispatchEvent(new CustomEvent(PlayerEvents.Complete));

        return;
      }

      if (
        !this.scope.loop ||
        (this.scope.count && this._counter >= this.scope.count)
      ) {
        this.dispatchEvent(new CustomEvent(PlayerEvents.Complete));

        if (this.scope.mode === PlayMode.Bounce) {
          if (this._lottie.currentFrame === 0) {
            return;
          }
        } else {
          return;
        }
      }

      if (this.scope.mode === PlayMode.Bounce) {
        if (this.scope.count) {
          this._counter += 0.5;
        }

        setTimeout(() => {
          this.dispatchEvent(new CustomEvent(PlayerEvents.Loop));

          if (this.scope.currentState === PlayerState.Playing) {
            this._lottie.setDirection(this._lottie.playDirection * -1);
            this._lottie.play();
          }
        }, this.scope.intermission);
      } else {
        if (this.scope.count) {
          this._counter += 1;
        }

        window.setTimeout(() => {
          this.dispatchEvent(new CustomEvent(PlayerEvents.Loop));

          if (this.scope.currentState === PlayerState.Playing) {
            if (this.scope.direction === -1) {
              // Prevents flickering
              this.seek("99%");
              this.play();
            } else {
              this._lottie.stop();
              this._lottie.play();
            }
          }
        }, this.scope.intermission);
      }
    });

    // Handle lottie-web ready event
    this._lottie.addEventListener("DOMLoaded", () => {
      // Set initial playback speed and direction
      this.setSpeed(this.scope.speed);
      this.setDirection(this.scope.direction);

      // Start playing if autoplay is enabled
      if (this.scope.autoplay) {
        if (this.scope.direction === -1) this.seek("100%");
        this.play();
      }

      this.dispatchEvent(new CustomEvent(PlayerEvents.Ready));
    });

    // Handle animation data load complete
    this._lottie.addEventListener("data_ready", () => {
      this.dispatchEvent(new CustomEvent(PlayerEvents.Load));
    });

    // Set error state when animation load fail event triggers
    this._lottie.addEventListener("data_failed", () => {
      this.scope.currentState = PlayerState.Error;

      this.dispatchEvent(new CustomEvent(PlayerEvents.Error));
    });

    // Set handlers to auto play animation on hover if enabled
    this.scope.container?.addEventListener("mouseenter", () => {
      if (this.scope.hover && this.scope.currentState !== PlayerState.Playing) {
        this.play();
      }
    });
    this.scope.container?.addEventListener("mouseleave", () => {
      if (this.scope.hover && this.scope.currentState === PlayerState.Playing) {
        this.stop();
      }
    });
  }

  /**
   * Freeze animation play.
   * This internal state pauses animation and is used to differentiate between
   * user requested pauses and component instigated pauses.
   */
  private freeze(): void {
    if (!this._lottie) {
      return;
    }

    this._lottie.pause();
    this.scope.currentState = PlayerState.Frozen;

    this.dispatchEvent(new CustomEvent(PlayerEvents.Freeze));
  }

  protected getControlsTemplate(): JsxElement {
    return (
      <div
        id="lottie-controls"
        aria-label="lottie-animation-controls"
        class="toolbar"
        rv-if="controls"
      >
        <button
          id="lottie-play-button"
          rv-on-click="togglePlay"
          rv-class-active="isPlaying"
          style="align-items:center;"
          tabIndex={0}
          aria-label="play-pause"
        >
          <svg
            rv-show="currentState | eq 'playing'"
            width="24"
            height="24"
            aria-hidden="true"
            focusable={false}
          >
            <path d="M14.016 5.016H18v13.969h-3.984V5.016zM6 18.984V5.015h3.984v13.969H6z" />
          </svg>

          <svg
            rv-hide="currentState | eq 'playing'"
            width="24"
            height="24"
            aria-hidden="true"
            focusable={false}
          >
            <path d="M8.016 5.016L18.985 12 8.016 18.984V5.015z" />
          </svg>
        </button>
        <button
          id="lottie-stop-button"
          rv-on-click="stop"
          rv-class-active="currentState | eq 'stopped'"
          style="align-items:center;"
          tabIndex={0}
          aria-label="stop"
        >
          <svg width="24" height="24" aria-hidden="true" focusable={false}>
            <path d="M6 6h12v12H6V6z" />
          </svg>
        </button>
        <input
          id="lottie-seeker-input"
          class="seeker"
          type="range"
          min={0}
          step={1}
          max={100}
          rv-value="seeker"
          rv-on-change="handleSeekChange"
          rv-on-mousedown="onInputMousedown"
          rv-on-mouseup="onInputMouseup"
          aria-valuemin="1"
          aria-valuemax="100"
          role="slider"
          rv-aria-valuenow="seeker"
          tabIndex={0}
          aria-label="lottie-seek-input"
        />
        <button
          id="lottie-loop-toggle"
          rv-on-click="toggleLooping"
          rv-class-active="loop"
          style="align-items:center;"
          tabIndex={0}
          aria-label="loop-toggle"
        >
          <svg width="24" height="24" aria-hidden="true" focusable={false}>
            <path d="M17.016 17.016v-4.031h1.969v6h-12v3l-3.984-3.984 3.984-3.984v3h10.031zM6.984 6.984v4.031H5.015v-6h12v-3l3.984 3.984-3.984 3.984v-3H6.984z" />
          </svg>
        </button>
      </div>
    );
  }

  /**
   * Returns the template, if null is returned, the child html of this element / component is not replaced
   */
  protected template(): ReturnType<TemplateFunction> {
    return (
      <div
        id="animation-container"
        class="main"
        rv-class-controls="controls"
        lang="en"
        rv-aria-label="description"
        role="img"
      >
        <div
          id="animation"
          class="animation"
          rv-class-controls="controls"
          rv-element="container"
          rv-style-background="background"
        >
          <div rv-show="currentState | eq 'error'" class="error">
            ⚠️
          </div>
        </div>
        {this.getControlsTemplate()}
      </div>
    );
  }
}
