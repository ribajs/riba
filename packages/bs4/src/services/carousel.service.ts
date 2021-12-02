import { CarouselOption } from "../interfaces/carousel-option";
import { CarouselDirection } from "../interfaces/carousel-direction";
import { CarouselClassName } from "../interfaces/carousel-class-name";
import { TRANSITION_END } from "../constants";

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.3.1): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

import {
  typeCheckConfig,
  makeArray,
  reflow,
  getTransitionDurationFromElement,
  emulateTransitionEnd,
  isVisible,
  triggerTransitionEnd,
} from "../helper/utils";
import { on, one, off, trigger } from "../helper/dom/event-handler";
import { findOne, find } from "../helper/dom/selector-engine";

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = "carousel";
const DATA_KEY = "bs.carousel";
const EVENT_KEY = `.${DATA_KEY}`;
const DATA_API_KEY = ".data-api";
const ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key
const ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key
const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch
const SWIPE_THRESHOLD = 40;

const Default: CarouselOption = {
  interval: 5000,
  keyboard: true,
  slide: false,
  pause: "hover",
  wrap: true,
  touch: true,
};

const DefaultType = {
  interval: "(number|boolean)",
  keyboard: "boolean",
  slide: "(boolean|string)",
  pause: "(string|boolean)",
  wrap: "boolean",
  touch: "boolean",
};

const Direction = {
  NEXT: "next" as CarouselDirection,
  PREV: "prev" as CarouselDirection,
  LEFT: "left" as CarouselDirection,
  RIGHT: "right" as CarouselDirection,
};

const Event = {
  SLIDE: `slide${EVENT_KEY}`,
  SLID: `slid${EVENT_KEY}`,
  KEYDOWN: `keydown${EVENT_KEY}`,
  MOUSEENTER: `mouseenter${EVENT_KEY}`,
  MOUSELEAVE: `mouseleave${EVENT_KEY}`,
  TOUCHSTART: `touchstart${EVENT_KEY}`,
  TOUCHMOVE: `touchmove${EVENT_KEY}`,
  TOUCHEND: `touchend${EVENT_KEY}`,
  POINTERDOWN: `pointerdown${EVENT_KEY}`,
  POINTERUP: `pointerup${EVENT_KEY}`,
  DRAG_START: `dragstart${EVENT_KEY}`,
  LOAD_DATA_API: `load${EVENT_KEY}${DATA_API_KEY}`,
  CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`,
};

const ClassName = {
  CAROUSEL: "carousel" as CarouselClassName,
  ACTIVE: "active" as CarouselClassName,
  SLIDE: "slide" as CarouselClassName,
  RIGHT: "carousel-item-right" as CarouselClassName,
  LEFT: "carousel-item-left" as CarouselClassName,
  NEXT: "carousel-item-next" as CarouselClassName,
  PREV: "carousel-item-prev" as CarouselClassName,
  ITEM: "carousel-item" as CarouselClassName,
  POINTER_EVENT: "pointer-event" as CarouselClassName,
};

const Selector = {
  ACTIVE: ".active",
  ACTIVE_ITEM: ".active.carousel-item",
  ITEM: ".carousel-item",
  ITEM_IMG: ".carousel-item img",
  NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
  INDICATORS: ".carousel-indicators",
};

const PointerType = {
  TOUCH: "touch",
  PEN: "pen",
};

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */
class CarouselService {
  private items: HTMLElement[] | null = null;
  private interval: number | null = null;
  private activeElement: HTMLElement | null = null;
  private isPaused = false;
  private isSliding = false;

  private config: CarouselOption;
  private element: HTMLElement;
  private indicatorsElement: HTMLElement | null;
  private touchSupported: boolean;
  private pointerEvent: boolean;

  public touchTimeout: number | null = null;
  public touchStartX = 0;
  public touchDeltaX = 0;

  constructor(element: HTMLElement, config: CarouselOption) {
    this.config = this.getConfig(config);
    this.element = element;
    this.indicatorsElement =
      (findOne(Selector.INDICATORS, this.element) as HTMLElement) || null;
    this.touchSupported =
      "ontouchstart" in document.documentElement ||
      navigator.maxTouchPoints > 0;
    this.pointerEvent = !!(
      window.PointerEvent || (window as any).MSPointerEvent
    );

    this.addEventListeners();
  }

  // Getters

  static get Default() {
    return Default;
  }

  // Public

  next() {
    if (!this.isSliding) {
      this.slide(Direction.NEXT);
    }
  }

  nextWhenVisible() {
    // Don't call next when the page isn't visible
    // or the carousel or its parent isn't visible
    if (!document.hidden && isVisible(this.element)) {
      this.next();
    }
  }

  prev() {
    if (!this.isSliding) {
      this.slide(Direction.PREV);
    }
  }

  pause(event?: Event) {
    if (!event) {
      this.isPaused = true;
    }

    if (findOne(Selector.NEXT_PREV, this.element)) {
      triggerTransitionEnd(this.element);
      this.cycle(true);
    }

    clearInterval(this.interval || undefined);
    this.interval = null;
  }

  cycle(event?: Event | (TouchEvent & MouseEvent & PointerEvent) | boolean) {
    if (!event) {
      this.isPaused = false;
    }

    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }

    if (this.config && this.config.interval && !this.isPaused) {
      this.interval = window.setInterval(
        (document.visibilityState ? this.nextWhenVisible : this.next).bind(
          this
        ),
        this.config.interval
      );
    }
  }

  to(index: number) {
    if (this.items === null) {
      throw new Error("No items found!");
    }
    this.activeElement =
      (findOne(Selector.ACTIVE_ITEM, this.element) as HTMLElement) || null;
    if (this.activeElement === null) {
      throw new Error("Active element not found!");
    }
    const activeIndex = this.getItemIndex(this.activeElement);

    if (index > this.items.length - 1 || index < 0) {
      return;
    }

    if (this.isSliding) {
      one(this.element, Event.SLID, () => this.to(index));
      return;
    }

    if (activeIndex === index) {
      this.pause();
      this.cycle();
      return;
    }

    const direction: CarouselDirection =
      index > activeIndex ? Direction.NEXT : Direction.PREV;

    this.slide(direction, this.items[index]);
  }

  dispose() {
    this.removeEventListeners();
    clearTimeout(this.touchTimeout || undefined);
    clearInterval(this.interval || undefined);
  }

  // Private

  private getConfig(config: CarouselOption) {
    config = {
      ...Default,
      ...config,
    } as CarouselOption;
    typeCheckConfig(NAME, config, DefaultType);
    return config;
  }

  private handleSwipe() {
    const absDeltax = Math.abs(this.touchDeltaX);

    if (absDeltax <= SWIPE_THRESHOLD) {
      return;
    }

    const direction = absDeltax / this.touchDeltaX;

    this.touchDeltaX = 0;

    // swipe left
    if (direction > 0) {
      this.prev();
    }

    // swipe right
    if (direction < 0) {
      this.next();
    }
  }

  private addEventListeners() {
    this.keydown = this.keydown.bind(this);
    this.pause = this.pause.bind(this);
    this.cycle = this.cycle.bind(this);
    if (this.config.keyboard) {
      on(this.element, Event.KEYDOWN, this.keydown);
    }

    if (this.config.pause === "hover") {
      on(this.element, Event.MOUSEENTER, this.pause);
      on(this.element, Event.MOUSELEAVE, this.cycle);
    }

    if (this.config.touch && this.touchSupported) {
      this.addTouchEventListeners();
    }
  }

  private addTouchEventListeners() {
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    makeArray(find(Selector.ITEM_IMG, this.element)).forEach((itemImg) => {
      on(itemImg, Event.DRAG_START, this.preventDrag);
    });

    if (this.pointerEvent) {
      on(this.element, Event.POINTERDOWN, this.onTouchStart);
      on(this.element, Event.POINTERUP, this.onTouchEnd);

      this.element.classList.add(ClassName.POINTER_EVENT);
    } else {
      on(this.element, Event.TOUCHSTART, this.onTouchStart);
      on(this.element, Event.TOUCHMOVE, this.onTouchMove);
      on(this.element, Event.TOUCHEND, this.onTouchEnd);
    }
  }

  private removeEventListeners() {
    if (this.config.keyboard) {
      off(this.element, Event.KEYDOWN, this.keydown);
    }

    if (this.config.pause === "hover") {
      off(this.element, Event.MOUSEENTER, this.pause);
      off(this.element, Event.MOUSELEAVE, this.cycle);
    }

    this.removeTouchEventListeners();
  }

  private removeTouchEventListeners() {
    makeArray(find(Selector.ITEM_IMG, this.element)).forEach((itemImg) => {
      off(itemImg, Event.DRAG_START, this.preventDrag);
    });
    if (this.pointerEvent) {
      off(this.element, Event.POINTERDOWN, this.onTouchStart);
      off(this.element, Event.POINTERUP, this.onTouchEnd);

      this.element.classList.add(ClassName.POINTER_EVENT);
    } else {
      off(this.element, Event.TOUCHSTART, this.onTouchStart);
      off(this.element, Event.TOUCHMOVE, this.onTouchMove);
      off(this.element, Event.TOUCHEND, this.onTouchEnd);
    }
  }

  private onTouchStart(e: Event) {
    const event = e as TouchEvent & MouseEvent & PointerEvent;
    if (
      this.pointerEvent &&
      PointerType[event.pointerType.toUpperCase() as "TOUCH" | "PEN"]
    ) {
      this.touchStartX = event.clientX;
    } else if (!this.pointerEvent) {
      this.touchStartX = event.touches[0].clientX;
    }
  }

  private onTouchMove(e: Event) {
    const event = e as TouchEvent & MouseEvent & PointerEvent;
    // ensure swiping with one touch and not pinching
    if (event.touches && event.touches.length > 1) {
      this.touchDeltaX = 0;
    } else {
      this.touchDeltaX = event.touches[0].clientX - this.touchStartX;
    }
  }

  private onTouchEnd(e: Event) {
    const event = e as TouchEvent & MouseEvent & PointerEvent;
    if (
      this.pointerEvent &&
      PointerType[event.pointerType.toUpperCase() as "TOUCH" | "PEN"]
    ) {
      this.touchDeltaX = event.clientX - this.touchStartX;
    }

    this.handleSwipe();
    if (this.config.pause === "hover") {
      // If it's a touch-enabled device, mouseenter/leave are fired as
      // part of the mouse compatibility events on first tap - the carousel
      // would stop cycling until user tapped out of it;
      // here, we listen for touchend, explicitly pause the carousel
      // (as if it's the second time we tap on it, mouseenter compat event
      // is NOT fired) and after a timeout (to allow for mouse compatibility
      // events to fire) we explicitly restart cycling

      this.pause();
      if (this.touchTimeout) {
        clearTimeout(this.touchTimeout);
      }

      this.touchTimeout = Number(
        setTimeout(
          (event: TouchEvent & MouseEvent & PointerEvent) => this.cycle(event),
          TOUCHEVENT_COMPAT_WAIT + (this.config.interval || 0)
        )
      );
    }
  }

  private preventDrag(event: Event) {
    event.preventDefault();
  }

  private keydown(e: Event) {
    const event = e as KeyboardEvent;
    if (
      (event.target as any)?.tagName &&
      /input|textarea/i.test((event.target as any).tagName)
    ) {
      return;
    }

    switch (event.which) {
      case ARROW_LEFT_KEYCODE:
        event.preventDefault();
        this.prev();
        break;
      case ARROW_RIGHT_KEYCODE:
        event.preventDefault();
        this.next();
        break;
      default:
    }
  }

  private getItemIndex(element?: HTMLElement) {
    if (!element) {
      return -1;
    }
    this.items =
      element && element.parentNode
        ? makeArray(find(Selector.ITEM, element.parentNode as HTMLElement))
        : [];

    return this.items.indexOf(element);
  }

  private getItemByDirection(
    direction: CarouselDirection,
    activeElement: HTMLElement
  ) {
    if (this.items === null) {
      throw new Error("No items found!");
    }
    const isNextDirection = direction === Direction.NEXT;
    const isPrevDirection = direction === Direction.PREV;
    const activeIndex = this.getItemIndex(activeElement);
    const lastItemIndex = this.items.length - 1;
    const isGoingToWrap =
      (isPrevDirection && activeIndex === 0) ||
      (isNextDirection && activeIndex === lastItemIndex);

    if (isGoingToWrap && !this.config.wrap) {
      return activeElement;
    }

    const delta = direction === Direction.PREV ? -1 : 1;
    const itemIndex = (activeIndex + delta) % this.items.length;

    return itemIndex === -1
      ? this.items[this.items.length - 1]
      : this.items[itemIndex];
  }

  private triggerSlideEvent(
    relatedTarget: HTMLElement,
    eventDirectionName: CarouselDirection
  ) {
    const targetIndex = this.getItemIndex(relatedTarget);
    const fromIndex = this.getItemIndex(
      (findOne(Selector.ACTIVE_ITEM, this.element) as HTMLElement) || null
    );

    return trigger(this.element, Event.SLIDE, {
      relatedTarget,
      direction: eventDirectionName,
      from: fromIndex,
      to: targetIndex,
    });
  }

  private setActiveIndicatorElement(element: HTMLElement) {
    if (this.indicatorsElement) {
      const indicators = find(Selector.ACTIVE, this.indicatorsElement);
      for (let i = 0; i < indicators.length; i++) {
        indicators[i].classList.remove(ClassName.ACTIVE);
      }

      const nextIndicator =
        this.indicatorsElement.children[this.getItemIndex(element)];

      if (nextIndicator) {
        nextIndicator.classList.add(ClassName.ACTIVE);
      }
    }
  }

  private slide(direction: CarouselDirection, element?: HTMLElement) {
    const activeElement = findOne(Selector.ACTIVE_ITEM, this.element) as
      | HTMLElement
      | undefined;
    const activeElementIndex = this.getItemIndex(activeElement);
    const nextElement =
      element ||
      (activeElement && this.getItemByDirection(direction, activeElement));

    if (!nextElement) {
      throw new Error("Next element not found!");
    }

    const nextElementIndex = this.getItemIndex(nextElement);
    const isCycling = Boolean(this.interval);

    let directionalClassName: CarouselClassName;
    let orderClassName: CarouselClassName;
    let eventDirectionName: CarouselDirection;

    if (direction === Direction.NEXT) {
      directionalClassName = ClassName.LEFT;
      orderClassName = ClassName.NEXT;
      eventDirectionName = Direction.LEFT;
    } else {
      directionalClassName = ClassName.RIGHT;
      orderClassName = ClassName.PREV;
      eventDirectionName = Direction.RIGHT;
    }

    if (nextElement && nextElement.classList.contains(ClassName.ACTIVE)) {
      this.isSliding = false;
      return;
    }

    const slideEvent = this.triggerSlideEvent(nextElement, eventDirectionName);
    if (slideEvent.defaultPrevented) {
      return;
    }

    if (!activeElement || !nextElement) {
      // Some weirdness is happening, so we bail
      return;
    }

    this.isSliding = true;

    if (isCycling) {
      this.pause();
    }

    this.setActiveIndicatorElement(nextElement);

    if (this.element.classList.contains(ClassName.SLIDE)) {
      nextElement.classList.add(orderClassName);

      reflow(nextElement);

      activeElement.classList.add(directionalClassName);
      nextElement.classList.add(directionalClassName);

      const nextElementInterval = parseInt(
        nextElement.getAttribute("data-interval") || "0",
        10
      );
      if (nextElementInterval) {
        this.config.defaultInterval =
          this.config.defaultInterval || this.config.interval;
        this.config.interval = nextElementInterval;
      } else {
        this.config.interval =
          this.config.defaultInterval || this.config.interval;
      }

      const transitionDuration =
        getTransitionDurationFromElement(activeElement);

      one(activeElement, TRANSITION_END, () => {
        nextElement.classList.remove(directionalClassName);
        nextElement.classList.remove(orderClassName);
        nextElement.classList.add(ClassName.ACTIVE);

        activeElement.classList.remove(ClassName.ACTIVE);
        activeElement.classList.remove(orderClassName);
        activeElement.classList.remove(directionalClassName);

        this.isSliding = false;

        setTimeout(() => {
          trigger(this.element, Event.SLID, {
            relatedTarget: nextElement,
            direction: eventDirectionName,
            from: activeElementIndex,
            to: nextElementIndex,
          });
        }, 0);
      });

      emulateTransitionEnd(activeElement, transitionDuration);
    } else {
      activeElement.classList.remove(ClassName.ACTIVE);
      nextElement.classList.add(ClassName.ACTIVE);

      this.isSliding = false;
      trigger(this.element, Event.SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex,
      });
    }

    if (isCycling) {
      this.cycle();
    }
  }
}

export default CarouselService;
