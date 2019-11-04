"use strict";
// https://github.com/sindresorhus/p-queue
Object.defineProperty(exports, "__esModule", { value: true });
const priority_queue_service_1 = require("./priority-queue.service");
class PQueue {
    constructor(options) {
        this.queue = new priority_queue_service_1.PriorityQueue(); // eslint-disable-line new-cap
        this._intervalCount = 0;
        this._intervalEnd = 0;
        this._pendingCount = 0;
        options = Object.assign({
            carryoverConcurrencyCount: false,
            intervalCap: Infinity,
            interval: 0,
            concurrency: Infinity,
            autoStart: true,
            queueClass: priority_queue_service_1.PriorityQueue,
        }, options);
        if (!(typeof options.concurrency === 'number' && options.concurrency >= 1)) {
            throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${options.concurrency}\` (${typeof options.concurrency})`);
        }
        if (!(typeof options.intervalCap === 'number' && options.intervalCap >= 1)) {
            throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${options.intervalCap}\` (${typeof options.intervalCap})`);
        }
        if (!(typeof options.interval === 'number' && Number.isFinite(options.interval) && options.interval >= 0)) {
            throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${options.interval}\` (${typeof options.interval})`);
        }
        this._carryoverConcurrencyCount = options.carryoverConcurrencyCount;
        this._isIntervalIgnored = options.intervalCap === Infinity || options.interval === 0;
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
        this._resolveEmpty = () => { }; // tslint:disable-line
        this._resolveIdle = () => { }; // tslint:disable-line
    }
    add(fn, options) {
        return new Promise((resolve, reject) => {
            const run = () => {
                this._pendingCount++;
                this._intervalCount++;
                try {
                    Promise.resolve(fn()).then((val) => {
                        resolve(val);
                        this._next();
                    }, (err) => {
                        reject(err);
                        this._next();
                    });
                }
                catch (err) {
                    reject(err);
                    this._next();
                }
            };
            this.queue.enqueue(run, options);
            this._tryToStartAnother();
        });
    }
    addAll(fns, options) {
        return Promise.all(fns.map((fn) => this.add(fn, options)));
    }
    start() {
        if (!this._isPaused) {
            return;
        }
        this._isPaused = false;
        while (this._tryToStartAnother()) { } // tslint:disable-line
    }
    pause() {
        this._isPaused = true;
    }
    clear() {
        this.queue = new priority_queue_service_1.PriorityQueue();
    }
    onEmpty() {
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
    onIdle() {
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
    // private _resolveEmpty = () => { }; // tslint:disable-line
    // private _resolveIdle = () => { }; // tslint:disable-line
    get _doesIntervalAllowAnother() {
        return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
    }
    get _doesConcurrentAllowAnother() {
        return this._pendingCount < this._concurrency;
    }
    _next() {
        this._pendingCount--;
        this._tryToStartAnother();
    }
    _resolvePromises() {
        this._resolveEmpty();
        this._resolveEmpty = () => { }; // tslint:disable-line
        if (this._pendingCount === 0) {
            this._resolveIdle();
            this._resolveIdle = () => { }; // tslint:disable-line
        }
    }
    _onResumeInterval() {
        this._onInterval();
        this._initializeIntervalIfNeeded();
        this._timeoutId = null;
    }
    _intervalPaused() {
        const now = Date.now();
        if (typeof (this._intervalId) === undefined) {
            const delay = this._intervalEnd - now;
            if (delay < 0) {
                // Act as the interval was done
                // We don't need to resume it here,
                // because it'll be resumed on line 160
                this._intervalCount = (this._carryoverConcurrencyCount) ? this._pendingCount : 0;
            }
            else {
                // Act as the interval is pending
                if (this._timeoutId === null) {
                    this._timeoutId = setTimeout(() => this._onResumeInterval(), delay);
                }
                return true;
            }
        }
        return false;
    }
    _tryToStartAnother() {
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
    _initializeIntervalIfNeeded() {
        if (this._isIntervalIgnored || this._intervalId !== null) {
            return;
        }
        this._intervalId = setInterval(() => this._onInterval(), this._interval);
        this._intervalEnd = Date.now() + this._interval;
    }
    _onInterval() {
        if (this._intervalCount === 0 && this._pendingCount === 0) {
            clearInterval(this._intervalId);
            this._intervalId = undefined;
        }
        this._intervalCount = (this._carryoverConcurrencyCount) ? this._pendingCount : 0;
        while (this._tryToStartAnother()) { } // tslint:disable-line
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
exports.PQueue = PQueue;
