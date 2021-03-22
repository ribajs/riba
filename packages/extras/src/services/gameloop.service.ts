import { EventDispatcher } from "@ribajs/events";

export interface GameloopOptions {
  maxFPS?: number;
}

/**
 * @see https://www.sitepoint.com/quick-tip-game-loop-in-javascript/
 * @see https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing#fps-control
 */
export class Gameloop {
  public static events = new EventDispatcher("gameloop");

  public static maxFPS = 60;

  public static getFps() {
    return this.fps;
  }

  public static startLoop(options: GameloopOptions = {}) {
    this.setOptions(options);

    if (!this.loopStarted) {
      this.loopStarted = true;
      window.requestAnimationFrame(this.loop.bind(this));
    }
  }

  public static fps = 60;

  // We want to simulate 1000 ms / 60 FPS = 16.667 ms per frame every time we run scroll()
  protected static timestep = 1000 / 60;

  protected static loopStarted = false;

  protected static lastFrameTimeMs = 0;

  protected static delta = 0;

  protected static framesThisSecond = 0;

  protected static lastFpsUpdate = 0;

  protected static frameID = 0;

  protected static setOptions(options: GameloopOptions) {
    this.maxFPS =
      typeof options.maxFPS === "number" ? options.maxFPS : this.maxFPS;
  }

  /**
   * The main / game loop
   * @param timestamp
   */
  protected static loop(timestamp: number) {
    // Throttle the frame rate.
    if (timestamp < this.lastFrameTimeMs + 1000 / this.maxFPS) {
      this.frameID = window.requestAnimationFrame(this.loop.bind(this));
      return;
    }

    const progress = timestamp - this.lastFrameTimeMs;
    this.delta += progress;
    this.lastFrameTimeMs = timestamp;

    this.begin(timestamp, this.delta);

    if (timestamp > this.lastFpsUpdate + 1000) {
      this.fps = 0.25 * this.framesThisSecond + 0.75 * this.fps;

      this.lastFpsUpdate = timestamp;
      this.framesThisSecond = 0;
    }
    this.framesThisSecond++;

    let numUpdateSteps = 0;
    while (this.delta >= this.timestep) {
      this.update(this.timestep);
      this.delta -= this.timestep;
      if (++numUpdateSteps >= 240) {
        this.panic();
        break;
      }
    }

    this.render(this.delta / this.timestep);

    this.end(this.fps);

    this.frameID = window.requestAnimationFrame(this.loop.bind(this));
  }

  protected static begin(timestamp: number, delta: number) {
    this.events.trigger("begin", timestamp, delta);
  }

  protected static render(interp: number) {
    this.events.trigger("render", interp);
  }

  protected static update(delta: number) {
    this.events.trigger("update", delta);
  }

  protected static end(delta: number) {
    this.events.trigger("end", delta);
  }

  protected static panic() {
    this.delta = 0; // discard the unsimulated time
  }

  constructor(options: GameloopOptions = {}) {
    Gameloop.setOptions(options);
  }
}
