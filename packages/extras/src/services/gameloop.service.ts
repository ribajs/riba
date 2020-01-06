export type RenderCallback = (interp: number) => void;

export type UpdateCallback = (delta: number) => void;

export interface GameloopOptions {
  maxFPS?: number;
}

/**
 * @see https://www.sitepoint.com/quick-tip-game-loop-in-javascript/
 * @see https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing#fps-control
 */
export class Gameloop {

  public static maxFPS = 60;

  public static startLoop(options: GameloopOptions = {}, renderCallback?: RenderCallback, updateCallback?: UpdateCallback) {

    this.setOptions(options);

    if (renderCallback) {
      this.addRenderCallback(renderCallback);
    }
    if (updateCallback) {
      this.addUpdateCallback(updateCallback);
    }
    if (!this.loopStarted) {
      this.loopStarted = true;
      window.requestAnimationFrame(this.loop.bind(this));
    }
  }

  protected static renderCallbacks = new Array<RenderCallback>();

  protected static updateCallbacks = new Array<UpdateCallback>();

  // We want to simulate 1000 ms / 60 FPS = 16.667 ms per frame every time we run scroll()
  protected static timestep = 1000 / 60;

  protected static loopStarted = false;

  protected static lastFrameTimeMs = 0;

  protected static delta = 0;

  protected static fps = 60;

  protected static framesThisSecond = 0;

  protected static lastFpsUpdate = 0;

  protected static setOptions(options: GameloopOptions) {
    this.maxFPS = typeof(options.maxFPS) === 'number' ? options.maxFPS : this.maxFPS;
  }

  /**
   * The main / game loop
   * @param timestamp
   */
  protected static loop(timestamp: number) {

    // Throttle the frame rate.
    if (timestamp < this.lastFrameTimeMs + (1000 / this.maxFPS)) {
      requestAnimationFrame(this.loop.bind(this));
      return;
    }

    const progress = timestamp - this.lastFrameTimeMs;
    this.delta += progress;
    this.lastFrameTimeMs = timestamp;

    // this.begin(timestamp, this.delta);

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

    window.requestAnimationFrame(this.loop.bind(this));
  }

  // protected static begin(timestamp: number, delta: number) {
  //   //
  // }

  protected static render(interp: number) {
    for (const renderCallback of this.renderCallbacks) {
      if (typeof(renderCallback) === 'function') {
        renderCallback(interp);
      }
    }
  }

  protected static update(delta: number) {
    for (const updateCallback of this.updateCallbacks) {
      if (typeof(updateCallback) === 'function') {
        updateCallback(delta);
      }
    }
  }

  protected static addRenderCallback(renderCallback: RenderCallback) {
    this.renderCallbacks.push(renderCallback);
  }

  protected static addUpdateCallback(updateCallback: UpdateCallback) {
    this.updateCallbacks.push(updateCallback);
  }

  protected static panic() {
    this.delta = 0; // discard the unsimulated time
  }

  constructor(options: GameloopOptions = {}) {
    Gameloop.setOptions(options);
  }

}
