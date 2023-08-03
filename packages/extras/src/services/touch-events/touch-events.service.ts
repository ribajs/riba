import { getElementIndex } from "@ribajs/utils/src/dom.js";
import {
  Position,
  TouchData,
  TouchEventData,
  TouchOffset,
  TouchSettings,
  TouchType,
  TouchSwipeData,
  TouchDirection,
} from "../../types/index.js";

import { BaseEventsService } from "./base-events.service.js";

/**
 * Vanilla version of jQuery Mobile Events
 * @see https://github.com/benmajor/jQuery-Touch-Events
 *
 * Copyright 2011-2019, Ben Major
 * Copyright 2019-2021, Pascal Garber
 * Licensed under the MIT License:
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
export class TouchEventsService extends BaseEventsService {
  // GETTERS:

  public get isTouchCapable() {
    return this.settings.touchCapable;
  }

  public get startEvent() {
    return this.settings.startevent;
  }

  public get endEvent() {
    return this.settings.endevent;
  }

  public get moveEvent() {
    return this.settings.moveevent;
  }

  public get tapEvent() {
    return this.settings.tapevent;
  }

  // public get scrollEvent() {
  //   return this.scrollEvents.scrollEvent;
  // }

  // SETTERS:

  /** Set the X threshold of swipe events */
  public set swipeThresholdX(threshold: number) {
    if (typeof threshold !== "number") {
      throw new Error("Threshold parameter must be a type of number");
    }
    this.settings.swipeHThreshold = threshold;
  }

  /** Set the Y threshold of swipe events */
  public set swipeThresholdY(threshold: number) {
    if (typeof threshold !== "number") {
      throw new Error("Threshold parameter must be a type of number");
    }
    this.settings.swipeVThreshold = threshold;
  }

  /** Set the double tap interval */
  public set doubleTapInt(interval: number) {
    if (typeof interval !== "number") {
      throw new Error("Interval parameter must be a type of number");
    }
    this.settings.doubletapInterval = interval;
  }

  /** Set the taphold threshold */
  public set tapHoldThreshold(threshold: number) {
    if (typeof threshold !== "number") {
      throw new Error("Threshold parameter must be a type of number");
    }
    this.settings.tapholdThreshold = threshold;
  }

  /** Set the pixel range for tapas */
  public set tapRange(range: number) {
    if (typeof range !== "number") {
      throw new Error("Ranger parameter must be a type of number");
    }
    this.settings.tapPixelRange = range;
  }

  // PROPERTIES:

  /** Used internally for `taphold` */
  protected startPosition: Position = {
    x: 0,
    y: 0,
  };

  /** Used internally for `taphold` */
  protected endPosition: Position = {
    x: 0,
    y: 0,
  };

  /** Used internally for `swipe` */
  protected originalCoord: Position = {
    x: 0,
    y: 0,
  };

  /** Used internally for `swipe` */
  protected finalCoord: Position = {
    x: 0,
    y: 0,
  };

  /** Used internally for `swipe` */
  protected startEvnt: TouchData | null = null;

  /** Used internally for `taphold` and `singletap` */
  protected tapheld = false;

  /** Used internally for `doubletap` */
  protected firstTap: TouchData | null = null;

  /** Used internally for `doubletap` */
  protected cooling = false;

  /** Used internally for `doubletap` and `singletap` */
  protected doubletapped = false;

  /** Used internally for `doubletap` */
  protected lastTouch = 0;

  /** Used internally for `swipe` */
  protected hasSwiped = false;

  /** Used internally for `tap` */
  protected tapStarted = false;

  /** Used internally for `swipe` */
  protected swipeStarted = false;

  /** Used internally for `tap`, `taphold` and `singletap` */
  protected startTime = 0;

  // TIMERS:

  protected holdTimer = -1;
  protected tapTimer = -1;

  /** Used internally for `doubletap` */
  protected actionTimer = -1;

  protected settings: TouchSettings;

  // protected scrollEvents: ScrollEventsService;

  constructor(
    el: HTMLElement,
    settings: TouchSettings = {
      tapPixelRange: 5,
      swipeHThreshold: 50,
      swipeVThreshold: 50,
      tapholdThreshold: 750,
      doubletapInterval: 500,
      shakeThreshold: 15,
      touchCapable: "ontouchstart" in window,

      startevent: ["touchstart"],
      endevent: ["touchend"],
      moveevent: ["touchmove"],
      tapevent: ["tap"],
    },
  ) {
    super(el);
    this.el = el;

    // Set settings by device type (if device is touch capable)
    settings.startevent = settings.touchCapable
      ? ["touchstart"]
      : ["mousedown"];
    settings.endevent = settings.touchCapable ? ["touchend"] : ["mouseup"];
    settings.moveevent = settings.touchCapable ? ["touchmove"] : ["mousemove"];
    settings.tapevent = settings.touchCapable ? ["tap"] : ["click"];

    this.settings = settings;

    // this.scrollEvents = new ScrollEventsService(this.el);
    this.onStartEvent = this.onStartEvent.bind(this);
    this.onMoveEvent = this.onMoveEvent.bind(this);
    this.onEndEvent = this.onEndEvent.bind(this);
    this.addEventListeners();
  }

  public destroy() {
    this.removeEventListeners();
    // this.scrollEvents.destroy();
  }

  protected removeEventListeners() {
    for (const eventName of this.settings.startevent) {
      this.el.removeEventListener(
        eventName,
        this.onStartEvent as any as EventListener,
      );
    }
    for (const eventName of this.settings.moveevent) {
      this.el.removeEventListener(
        eventName,
        this.onMoveEvent as any as EventListener,
      );
    }
    for (const eventName of this.settings.endevent) {
      this.el.removeEventListener(
        eventName,
        this.onEndEvent as any as EventListener,
      );
    }
    // this.scrollEvents.destroy();
  }

  // HELPER METHODS:

  protected getSwipeDir(
    startPosition: Position,
    endPosition: Position,
    hThreshold: number = this.settings.swipeHThreshold,
    vThreshold: number = this.settings.swipeVThreshold,
  ) {
    let swipeDir = "";
    if (
      startPosition.y > endPosition.y &&
      startPosition.y - endPosition.y > vThreshold
    ) {
      swipeDir = "swipeup";
    }
    if (
      startPosition.x < endPosition.x &&
      endPosition.x - startPosition.x > hThreshold
    ) {
      swipeDir = "swiperight";
    }
    if (
      startPosition.y < endPosition.y &&
      endPosition.y - startPosition.y > vThreshold
    ) {
      swipeDir = "swipedown";
    }
    if (
      startPosition.x > endPosition.x &&
      startPosition.x - endPosition.x > hThreshold
    ) {
      swipeDir = "swipeleft";
    }
    return swipeDir;
  }

  protected getPosition(
    event: TouchEvent | MouseEvent,
    type: TouchType = TouchType.DEFAULT,
    index = 0,
  ): Position {
    let touchesTypes: TouchList;
    switch (type) {
      case TouchType.CHANGED:
        touchesTypes = (event as TouchEvent).changedTouches;
        break;
      case TouchType.TARGET:
        touchesTypes = (event as TouchEvent).targetTouches;
        break;
      default:
        touchesTypes = (event as TouchEvent).touches;
        break;
    }
    const position = {
      x: this.settings.touchCapable
        ? touchesTypes[index].pageX
        : (event as MouseEvent).pageX,
      y: this.settings.touchCapable
        ? touchesTypes[index].pageY
        : (event as MouseEvent).pageY,
    };
    return position;
  }

  protected getOffset(
    event: TouchEvent | MouseEvent,
    type: TouchType = TouchType.DEFAULT,
    index = 0,
  ): TouchOffset {
    const boundingClientRect = (this.el as HTMLElement).getBoundingClientRect();
    let touchesTypes: TouchList;
    switch (type) {
      case TouchType.CHANGED:
        touchesTypes = (event as TouchEvent).changedTouches;
        break;
      case TouchType.TARGET:
        touchesTypes = (event as TouchEvent).targetTouches;
        break;
      default:
        touchesTypes = (event as TouchEvent).touches;
        break;
    }
    const offset = {
      x: this.settings.touchCapable
        ? Math.round(
            touchesTypes[index].pageX -
              (boundingClientRect ? boundingClientRect.left : 0),
          )
        : Math.round(
            (event as any as MouseEvent).pageX -
              (boundingClientRect ? boundingClientRect.left : 0),
          ),
      y: this.settings.touchCapable
        ? Math.round(
            touchesTypes[index].pageY -
              (boundingClientRect ? boundingClientRect.top : 0),
          )
        : Math.round(
            (event as any as MouseEvent).pageY -
              (boundingClientRect ? boundingClientRect.top : 0),
          ),
    };
    return offset;
  }

  protected getTouchData(
    event: TouchEvent | MouseEvent,
    withIndex = false,
    positionType = TouchType.DEFAULT,
    offsetType = TouchType.CHANGED,
  ): TouchData {
    const touchData: TouchData = {
      position: this.getPosition(event, positionType),
      offset: this.getOffset(event, offsetType),
      time: Date.now(),
    };
    if (withIndex) {
      touchData.index = getElementIndex(event.target as Element | null);
    }
    return touchData;
  }

  protected addEventListeners() {
    for (const eventName of this.settings.startevent) {
      this.el.addEventListener(
        eventName,
        this.onStartEvent as any as EventListener,
        {
          passive: true,
        },
      );
    }
    for (const eventName of this.settings.moveevent) {
      this.el.addEventListener(
        eventName,
        this.onMoveEvent as any as EventListener,
        {
          passive: true,
        },
      );
    }
    for (const eventName of this.settings.endevent) {
      this.el.addEventListener(
        eventName,
        this.onEndEvent as any as EventListener,
        {
          passive: true,
        },
      );
    }
  }

  // EVENT HANDLERS:

  protected onStartEvent(event: TouchEvent | MouseEvent) {
    if (event.which && event.which !== 1) {
      return false;
    }
    this.startPosition = this.getPosition(event, TouchType.TARGET);
    this.endPosition = {
      x: this.startPosition.x,
      y: this.startPosition.y,
    };
    this.startTime = Date.now();

    // For `doubletap`
    this.doubletapped = false;
    if (!this.firstTap) {
      this.firstTap = this.getTouchData(
        event,
        true,
        TouchType.DEFAULT,
        TouchType.CHANGED,
      );
    }

    // For `tap`, `swipe`
    this.tapStarted = true;
    this.swipeStarted = true;

    // For `swipe`
    this.originalCoord = this.getPosition(event, TouchType.TARGET);
    this.finalCoord = this.getPosition(event, TouchType.TARGET);
    this.startEvnt = this.getTouchData(
      event,
      false,
      TouchType.DEFAULT,
      TouchType.CHANGED,
    );

    this.tapstart(event);
    this.taphold(event);
    return true;
  }

  protected onEndEvent(event: TouchEvent | MouseEvent) {
    this.endPosition = this.getPosition(event, TouchType.CHANGED);
    this.tapheld = false;

    window.clearTimeout(this.holdTimer);
    this.tapend(event);
    this.swipeend(event);
    this.tap(event);
    this.doubletap(event);
    this.singletap(event);

    this.tapStarted = false;
    this.swipeStarted = false;
    this.hasSwiped = false;

    return true;
  }

  protected onMoveEvent(event: TouchEvent | MouseEvent) {
    this.endPosition = this.getPosition(event, TouchType.TARGET);
    this.finalCoord = this.getPosition(event, TouchType.TARGET);
    this.tapmove(event);
    this.swipe(event);
    return true;
  }

  // CUSTOM EVENT METHODS:

  /** tapstart Event */
  protected tapstart(event: TouchEvent | MouseEvent) {
    this.triggerCustomEvent(
      "tapstart",
      event,
      this.getTouchData(event, false, TouchType.DEFAULT, TouchType.CHANGED),
    );
    return true;
  }

  /** tapmove Event */
  protected tapmove(event: TouchEvent | MouseEvent) {
    this.triggerCustomEvent(
      "tapmove",
      event,
      this.getTouchData(event, false, TouchType.DEFAULT, TouchType.CHANGED),
    );
    return true;
  }

  /** tapend Event */
  protected tapend(event: TouchEvent | MouseEvent) {
    this.triggerCustomEvent(
      "tapend",
      event,
      this.getTouchData(event, false, TouchType.CHANGED, TouchType.CHANGED),
    );
    return true;
  }

  /** taphold Event */
  protected taphold(event: TouchEvent | MouseEvent) {
    this.holdTimer = window.setTimeout(() => {
      const diffPosition: Position = {
        x: this.startPosition.x - this.endPosition.x,
        y: this.startPosition.y - this.endPosition.y,
      };

      // helded?
      if (
        (this.startPosition.x === this.endPosition.x &&
          this.startPosition.y === this.endPosition.y) ||
        (diffPosition.x >= -this.settings.tapPixelRange &&
          diffPosition.x <= this.settings.tapPixelRange &&
          diffPosition.y >= -this.settings.tapPixelRange &&
          diffPosition.y <= this.settings.tapPixelRange)
      ) {
        this.tapheld = true;
        const endTime = Date.now();
        const duration = endTime - this.startTime;
        const touchesLength: number = (event as TouchEvent).targetTouches
          ? (event as TouchEvent).targetTouches.length
          : 1;
        const touches = new Array<Partial<TouchData>>();

        for (let i = 0; i < touchesLength; i++) {
          const elOffset = (this.el as HTMLElement).getBoundingClientRect();
          const touch = {
            position: {
              x: this.settings.touchCapable
                ? (event as TouchEvent).changedTouches[i].pageX
                : (event as MouseEvent).pageX,
              y: this.settings.touchCapable
                ? (event as TouchEvent).changedTouches[i].pageY
                : (event as MouseEvent).pageY,
            },
            offset: {
              x: this.settings.touchCapable
                ? Math.round(
                    (event as TouchEvent).changedTouches[i].pageX -
                      (elOffset ? elOffset.left : 0),
                  )
                : Math.round(
                    (event as MouseEvent).pageX -
                      (elOffset ? elOffset.left : 0),
                  ),
              y: this.settings.touchCapable
                ? Math.round(
                    (event as TouchEvent).changedTouches[i].pageY -
                      (elOffset ? elOffset.top : 0),
                  )
                : Math.round(
                    (event as MouseEvent).pageY - (elOffset ? elOffset.top : 0),
                  ),
            },
          };

          touches.push(touch);
        }
        const eventName =
          touchesLength > 1 ? "taphold" + touchesLength : "taphold";

        const touchData: TouchEventData = {
          touches,
          time: Date.now(),
          duration,
        };

        this.triggerCustomEvent(eventName, event, touchData);
      }
    }, this.settings.tapholdThreshold);

    return true;
  }

  /** doubletap Event */
  protected doubletap(event: TouchEvent | MouseEvent) {
    const now = Date.now();
    const lastTouch = Number(this.lastTouch) || now + 1;
    const delta = now - lastTouch;
    if (this.actionTimer !== -1) {
      window.clearTimeout(this.actionTimer);
    }

    if (
      delta < this.settings.doubletapInterval &&
      delta > 100 &&
      this.firstTap &&
      getElementIndex(event.target as Element | null) === this.firstTap.index
    ) {
      this.doubletapped = true;
      window.clearTimeout(this.tapTimer);
      const lastTap = this.getTouchData(
        event,
        true,
        TouchType.CHANGED,
        TouchType.CHANGED,
      );
      const touchData: TouchEventData = {
        firstTap: this.firstTap,
        secondTap: lastTap,
        interval: lastTap.time - this.firstTap.time,
      };
      if (!this.cooling) {
        this.triggerCustomEvent("doubletap", event, touchData);
        this.firstTap = null;
      }
      this.cooling = true;
      window.setTimeout(() => {
        this.cooling = false;
      }, this.settings.doubletapInterval);
    } else {
      this.actionTimer = window.setTimeout(
        () => {
          this.firstTap = null;
          window.clearTimeout(this.actionTimer);
        },
        this.settings.doubletapInterval,
        [event],
      );
    }
    this.lastTouch = now;
  }

  /**
   * singletap Event
   * This is used in conjunction with doubletap when both events are needed on the same element
   */
  protected singletap(event: TouchEvent | MouseEvent) {
    this.tapTimer = window.setTimeout(() => {
      const diffPosition: Position = {
        x: this.startPosition.x - this.endPosition.x,
        y: this.startPosition.y - this.endPosition.y,
      };
      if (
        !this.doubletapped &&
        !this.tapheld &&
        ((this.startPosition.x === this.endPosition.x &&
          this.startPosition.y === this.endPosition.y) ||
          (diffPosition.x >= -this.settings.tapPixelRange &&
            diffPosition.x <= this.settings.tapPixelRange &&
            diffPosition.y >= -this.settings.tapPixelRange &&
            diffPosition.y <= this.settings.tapPixelRange))
      ) {
        const touchData = this.getTouchData(
          event,
          false,
          TouchType.CHANGED,
          TouchType.CHANGED,
        );

        // Was it a taphold?
        if (touchData.time - this.startTime < this.settings.tapholdThreshold) {
          this.triggerCustomEvent("singletap", event, touchData);
        }
      }
    }, this.settings.doubletapInterval);
  }

  /** tap Event */
  protected tap(event: TouchEvent | MouseEvent) {
    const diffPosition: Position = {
      x: this.startPosition.x - this.endPosition.x,
      y: this.startPosition.y - this.endPosition.y,
    };

    if (
      this.tapStarted &&
      Date.now() - this.startTime < this.settings.tapholdThreshold &&
      ((this.startPosition.x === this.endPosition.x &&
        this.startPosition.y === this.endPosition.y) ||
        (diffPosition.x >= -this.settings.tapPixelRange &&
          diffPosition.x <= this.settings.tapPixelRange &&
          diffPosition.y >= -this.settings.tapPixelRange &&
          diffPosition.y <= this.settings.tapPixelRange))
    ) {
      const touchesLength: number = (event as TouchEvent).targetTouches
        ? (event as TouchEvent).targetTouches.length
        : 1;
      const touches = new Array<Partial<TouchData>>();

      for (let i = 0; i < touchesLength; i++) {
        const elOffset = (this.el as HTMLElement).getBoundingClientRect();
        const touch = {
          position: {
            x: this.settings.touchCapable
              ? (event as TouchEvent).changedTouches[i].pageX
              : (event as MouseEvent).pageX,
            y: this.settings.touchCapable
              ? (event as TouchEvent).changedTouches[i].pageY
              : (event as MouseEvent).pageY,
          },
          offset: {
            x: this.settings.touchCapable
              ? Math.round(
                  (event as TouchEvent).changedTouches[i].pageX -
                    (elOffset ? elOffset.left : 0),
                )
              : Math.round(
                  (event as MouseEvent).pageX - (elOffset ? elOffset.left : 0),
                ),
            y: this.settings.touchCapable
              ? Math.round(
                  (event as TouchEvent).changedTouches[i].pageY -
                    (elOffset ? elOffset.top : 0),
                )
              : Math.round(
                  (event as MouseEvent).pageY - (elOffset ? elOffset.top : 0),
                ),
          },
        };

        touches.push(touch);
      }

      const touchData = {
        touches,
        time: Date.now(),
      };

      const eventName = touchesLength > 1 ? "tap" + touchesLength : "tap";
      this.triggerCustomEvent(eventName, event, touchData);
    }
  }

  /**
   * swipe Event
   * (also handles swipeup, swiperight, swipedown and swipeleft)
   *
   * (similar to `touchMove` method in jquery touch events)
   */
  protected swipe(event: TouchEvent | MouseEvent) {
    const swipeDir = this.getSwipeDir(this.originalCoord, this.finalCoord);

    if (swipeDir && this.swipeStarted && this.startEvnt) {
      this.originalCoord.x = 0;
      this.originalCoord.y = 0;
      this.finalCoord.x = 0;
      this.finalCoord.y = 0;
      this.swipeStarted = false;

      const endEvnt: TouchData = this.getTouchData(
        event,
        false,
        TouchType.DEFAULT,
        TouchType.CHANGED,
      );

      // Calculate the swipe amount (normalized):
      const xAmount = Math.abs(this.startEvnt.position.x - endEvnt.position.x);
      const yAmount = Math.abs(this.startEvnt.position.y - endEvnt.position.y);

      const touchData: TouchSwipeData = {
        startEvnt: this.startEvnt,
        endEvnt,
        direction: swipeDir.replace("swipe", "") as TouchDirection,
        xAmount,
        yAmount,
        duration: endEvnt.time - this.startEvnt.time,
      };
      this.hasSwiped = true;
      this.triggerCustomEvent("swipe", event, touchData);
      this.triggerCustomEvent(swipeDir, event, touchData);
    }
  }

  /**
   * swipeend Event
   * (similar `touchEnd` method in jquery touch events)
   */
  protected swipeend(event: TouchEvent | MouseEvent) {
    const endEvnt: TouchData = this.getTouchData(
      event,
      false,
      TouchType.CHANGED,
      TouchType.CHANGED,
    );
    if (this.hasSwiped && this.startEvnt) {
      const swipeDir = this.getSwipeDir(
        this.startEvnt.position,
        endEvnt.position,
      );

      // Calculate the swipe amount (normalized):
      const xAmount = Math.abs(this.startEvnt.position.x - endEvnt.position.x);
      const yAmount = Math.abs(this.startEvnt.position.y - endEvnt.position.y);

      const touchData: TouchSwipeData = {
        startEvnt: this.startEvnt,
        endEvnt,
        direction: swipeDir.replace("swipe", "") as TouchDirection,
        xAmount,
        yAmount,
        duration: endEvnt.time - this.startEvnt.time,
      };
      this.triggerCustomEvent("swipeend", event, touchData);
    }
  }
}
