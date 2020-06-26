// https://github.com/sindresorhus/p-queue

import { PriorityQueue } from "./priority-queue.service";

export class PQueue {
  public queue = new PriorityQueue(); // eslint-disable-line new-cap

  private _carryoverConcurrencyCount: number;
  private _isIntervalIgnored: boolean;
  private _intervalCount = 0;
  private _intervalCap: typeof Infinity;
  private _interval: number;
  private _intervalId?: any;
  private _intervalEnd = 0;
  private _timeoutId: any | null;

  private _pendingCount = 0;
  private _concurrency: typeof Infinity;
  private _isPaused: boolean;

  private _resolveEmpty: () => any;
  private _resolveIdle: () => any;

  constructor(options: any) {
    options = Object.assign(
      {
        carryoverConcurrencyCount: false,
        intervalCap: Infinity,
        interval: 0,
        concurrency: Infinity,
        autoStart: true,
        queueClass: PriorityQueue,
      },
      options
    );

    if (
      !(typeof options.concurrency === "number" && options.concurrency >= 1)
    ) {
      throw new TypeError(
        `Expected \`concurrency\` to be a number from 1 and up, got \`${
          options.concurrency
        }\` (${typeof options.concurrency})`
      );
    }

    if (
      !(typeof options.intervalCap === "number" && options.intervalCap >= 1)
    ) {
      throw new TypeError(
        `Expected \`intervalCap\` to be a number from 1 and up, got \`${
          options.intervalCap
        }\` (${typeof options.intervalCap})`
      );
    }

    if (
      !(
        typeof options.interval === "number" &&
        Number.isFinite(options.interval) &&
        options.interval >= 0
      )
    ) {
      throw new TypeError(
        `Expected \`interval\` to be a finite number >= 0, got \`${
          options.interval
        }\` (${typeof options.interval})`
      );
    }

    this._carryoverConcurrencyCount = options.carryoverConcurrencyCount;
    this._isIntervalIgnored =
      options.intervalCap === Infinity || options.interval === 0;
    this._intervalCount = 0;
    this._intervalCap = options.intervalCap;
    this._interval = options.interval;
    this._intervalId = undefined;
    this._intervalEnd = 0;
    this._timeoutId = null;

    this.queue = new options.queueClass(); // eslint-disable-line new-cap
    this._pendingCount = 0;
    this._concurrency = options.concurrency;
    this._isPaused = options.autoStart === false;
    this._resolveEmpty = () => {}; // eslint-disable-line
    this._resolveIdle = () => {}; // eslint-disable-line
  }

  public add(fn: any, options?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const run = () => {
        this._pendingCount++;
        this._intervalCount++;

        try {
          Promise.resolve(fn()).then(
            (val) => {
              resolve(val);
              this._next();
            },
            (err) => {
              reject(err);
              this._next();
            }
          );
        } catch (err) {
          reject(err);
          this._next();
        }
      };

      this.queue.enqueue(run, options);
      this._tryToStartAnother();
    });
  }

  public addAll(fns: any, options: any) {
    return Promise.all(fns.map((fn: any) => this.add(fn, options)));
  }

  public start() {
    if (!this._isPaused) {
      return;
    }

    this._isPaused = false;
    while (this._tryToStartAnother()) {} // eslint-disable-line
  }

  public pause() {
    this._isPaused = true;
  }

  public clear() {
    this.queue = new PriorityQueue();
  }

  public onEmpty() {
    // Instantly resolve if the queue is empty
    if (this.queue.size === 0) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const existingResolve = this._resolveEmpty;
      this._resolveEmpty = () => {
        existingResolve();
        resolve();
      };
    });
  }

  public onIdle(): Promise<any> {
    // Instantly resolve if none pending and if nothing else is queued
    if (this._pendingCount === 0 && this.queue.size === 0) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const existingResolve = this._resolveIdle;
      this._resolveIdle = () => {
        existingResolve();
        resolve();
      };
    });
  }

  // private _resolveEmpty = () => { }; // eslint-disable-line
  // private _resolveIdle = () => { }; // eslint-disable-line

  get _doesIntervalAllowAnother() {
    return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
  }

  get _doesConcurrentAllowAnother() {
    return this._pendingCount < this._concurrency;
  }

  private _next() {
    this._pendingCount--;
    this._tryToStartAnother();
  }

  private _resolvePromises() {
    this._resolveEmpty();
    this._resolveEmpty = () => {}; // eslint-disable-line

    if (this._pendingCount === 0) {
      this._resolveIdle();
      this._resolveIdle = () => {}; // eslint-disable-line
    }
  }

  private _onResumeInterval() {
    this._onInterval();
    this._initializeIntervalIfNeeded();
    this._timeoutId = null;
  }

  private _intervalPaused() {
    const now = Date.now();

    if (typeof this._intervalId === undefined) {
      const delay = this._intervalEnd - now;
      if (delay < 0) {
        // Act as the interval was done
        // We don't need to resume it here,
        // because it'll be resumed on line 160
        this._intervalCount = this._carryoverConcurrencyCount
          ? this._pendingCount
          : 0;
      } else {
        // Act as the interval is pending
        if (this._timeoutId === null) {
          this._timeoutId = setTimeout(() => this._onResumeInterval(), delay);
        }

        return true;
      }
    }

    return false;
  }

  private _tryToStartAnother() {
    if (this.queue.size === 0) {
      // We can clear the interval ("pause")
      // because we can redo it later ("resume")
      clearInterval(this._intervalId);
      this._intervalId = undefined;

      this._resolvePromises();

      return false;
    }

    if (!this._isPaused) {
      const canInitializeInterval = !this._intervalPaused();
      if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
        this.queue.dequeue()();
        if (canInitializeInterval) {
          this._initializeIntervalIfNeeded();
        }

        return true;
      }
    }

    return false;
  }

  private _initializeIntervalIfNeeded() {
    if (this._isIntervalIgnored || this._intervalId !== null) {
      return;
    }

    this._intervalId = setInterval(() => this._onInterval(), this._interval);
    this._intervalEnd = Date.now() + this._interval;
  }

  private _onInterval() {
    if (this._intervalCount === 0 && this._pendingCount === 0) {
      clearInterval(this._intervalId);
      this._intervalId = undefined;
    }

    this._intervalCount = this._carryoverConcurrencyCount
      ? this._pendingCount
      : 0;
    while (this._tryToStartAnother()) {} // eslint-disable-line
  }

  get size() {
    return this.queue.size;
  }

  get pending() {
    return this._pendingCount;
  }

  get isPaused() {
    return this._isPaused;
  }
}
