import { CarouselOption } from "../interfaces/carousel-option";
import { CarouselDirection } from "../interfaces/carousel-direction";
import { CarouselClassName } from "../interfaces/carousel-class-name";

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.3.1): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

import { TRANSITION_END, Utils } from "./utils.service";
import EventHandler from "./dom/event-handler";
import SelectorEngine from "./dom/selector-engine";

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
  private _items: HTMLElement[] | null = null;
  private _interval: number | null = null;
  private _activeElement: HTMLElement | null = null;
  private _isPaused = false;
  private _isSliding = false;

  private _config: CarouselOption;
  private _element: HTMLElement;
  private _indicatorsElement: HTMLElement | null;
  private _touchSupported: boolean;
  private _pointerEvent: boolean;

  public touchTimeout: number | null = null;
  public touchStartX = 0;
  public touchDeltaX = 0;

  constructor(element: HTMLElement, config: CarouselOption) {
    this._items = null;
    this._interval = null;
    this._activeElement = null;
    this._isPaused = false;
    this._isSliding = false;
    this.touchTimeout = null;
    this.touchStartX = 0;
    this.touchDeltaX = 0;

    this._config = this._getConfig(config);
    this._element = element;
    this._indicatorsElement =
      (SelectorEngine.findOne(
        Selector.INDICATORS,
        this._element
      ) as HTMLElement) || null;
    this._touchSupported =
      "ontouchstart" in document.documentElement ||
      navigator.maxTouchPoints > 0;
    this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

    console.debug("CarouselService", this);

    this._addEventListeners();
  }

  // Getters

  static get Default() {
    return Default;
  }

  // Public

  next() {
    if (!this._isSliding) {
      this._slide(Direction.NEXT);
    }
  }

  nextWhenVisible() {
    // Don't call next when the page isn't visible
    // or the carousel or its parent isn't visible
    if (!document.hidden && Utils.isVisible(this._element)) {
      this.next();
    }
  }

  prev() {
    if (!this._isSliding) {
      this._slide(Direction.PREV);
    }
  }

  pause(event?: (TouchEvent & MouseEvent & PointerEvent) | boolean) {
    if (!event) {
      this._isPaused = true;
    }

    if (SelectorEngine.findOne(Selector.NEXT_PREV, this._element)) {
      Utils.triggerTransitionEnd(this._element);
      this.cycle(true);
    }

    clearInterval(this._interval || undefined);
    this._interval = null;
  }

  cycle(event?: Event | (TouchEvent & MouseEvent & PointerEvent) | boolean) {
    if (!event) {
      this._isPaused = false;
    }

    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }

    if (this._config && this._config.interval && !this._isPaused) {
      this._interval = setInterval(
        (document.visibilityState ? this.nextWhenVisible : this.next).bind(
          this
        ),
        this._config.interval
      );
    }
  }

  to(index: number) {
    if (this._items === null) {
      throw new Error("No items found!");
    }
    this._activeElement =
      (SelectorEngine.findOne(
        Selector.ACTIVE_ITEM,
        this._element
      ) as HTMLElement) || null;
    if (this._activeElement === null) {
      throw new Error("Active element not found!");
    }
    const activeIndex = this._getItemIndex(this._activeElement);

    if (index > this._items.length - 1 || index < 0) {
      return;
    }

    if (this._isSliding) {
      EventHandler.one(this._element, Event.SLID, () => this.to(index));
      return;
    }

    if (activeIndex === index) {
      this.pause();
      this.cycle();
      return;
    }

    const direction: CarouselDirection =
      index > activeIndex ? Direction.NEXT : Direction.PREV;

    this._slide(direction, this._items[index]);
  }

  dispose() {
    // EventHandler.off(this._element, EVENT_KEY)
    // this._items = null
    // this._config = null
    // this._element = null
    // this._interval = null
    // this._isPaused = null
    // this._isSliding = null
    // this._activeElement = null
    // this._indicatorsElement = null
  }

  // Private

  _getConfig(config: CarouselOption) {
    config = {
      ...Default,
      ...config,
    } as CarouselOption;
    Utils.typeCheckConfig(NAME, config, DefaultType);
    return config;
  }

  _handleSwipe() {
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

  _addEventListeners() {
    if (this._config.keyboard) {
      EventHandler.on<KeyboardEvent>(this._element, Event.KEYDOWN, (event) =>
        this._keydown(event)
      );
    }

    if (this._config.pause === "hover") {
      EventHandler.on(
        this._element,
        Event.MOUSEENTER,
        (event: TouchEvent & MouseEvent & PointerEvent) => this.pause(event)
      );
      EventHandler.on(
        this._element,
        Event.MOUSELEAVE,
        (event: TouchEvent & MouseEvent & PointerEvent) => this.cycle(event)
      );
    }

    if (this._config.touch && this._touchSupported) {
      this._addTouchEventListeners();
    }
  }

  _addTouchEventListeners() {
    const start = (event: TouchEvent & MouseEvent & PointerEvent) => {
      if (
        this._pointerEvent &&
        PointerType[event.pointerType.toUpperCase() as "TOUCH" | "PEN"]
      ) {
        this.touchStartX = event.clientX;
      } else if (!this._pointerEvent) {
        this.touchStartX = event.touches[0].clientX;
      }
    };

    const move = (event: TouchEvent & MouseEvent & PointerEvent) => {
      // ensure swiping with one touch and not pinching
      if (event.touches && event.touches.length > 1) {
        this.touchDeltaX = 0;
      } else {
        this.touchDeltaX = event.touches[0].clientX - this.touchStartX;
      }
    };

    const end = (event: TouchEvent & MouseEvent & PointerEvent) => {
      if (
        this._pointerEvent &&
        PointerType[event.pointerType.toUpperCase() as "TOUCH" | "PEN"]
      ) {
        this.touchDeltaX = event.clientX - this.touchStartX;
      }

      this._handleSwipe();
      if (this._config.pause === "hover") {
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

        this.touchTimeout = setTimeout(
          (event: TouchEvent & MouseEvent & PointerEvent) => this.cycle(event),
          TOUCHEVENT_COMPAT_WAIT + (this._config.interval || 0)
        );
      }
    };

    Utils.makeArray(
      SelectorEngine.find(Selector.ITEM_IMG, this._element)
    ).forEach((itemImg) => {
      EventHandler.on(
        itemImg,
        Event.DRAG_START,
        (event: TouchEvent & MouseEvent & PointerEvent) =>
          event.preventDefault()
      );
    });

    if (this._pointerEvent) {
      EventHandler.on(
        this._element,
        Event.POINTERDOWN,
        (event: TouchEvent & MouseEvent & PointerEvent) => start(event)
      );
      EventHandler.on(
        this._element,
        Event.POINTERUP,
        (event: TouchEvent & MouseEvent & PointerEvent) => end(event)
      );

      this._element.classList.add(ClassName.POINTER_EVENT);
    } else {
      EventHandler.on(
        this._element,
        Event.TOUCHSTART,
        (event: TouchEvent & MouseEvent & PointerEvent) => start(event)
      );
      EventHandler.on(
        this._element,
        Event.TOUCHMOVE,
        (event: TouchEvent & MouseEvent & PointerEvent) => move(event)
      );
      EventHandler.on(
        this._element,
        Event.TOUCHEND,
        (event: TouchEvent & MouseEvent & PointerEvent) => end(event)
      );
    }
  }

  _keydown(event: KeyboardEvent) {
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

  _getItemIndex(element?: HTMLElement) {
    if (!element) {
      return -1;
    }
    this._items =
      element && element.parentNode
        ? Utils.makeArray(
            SelectorEngine.find(
              Selector.ITEM,
              element.parentNode as HTMLElement
            )
          )
        : [];

    return this._items.indexOf(element);
  }

  _getItemByDirection(
    direction: CarouselDirection,
    activeElement: HTMLElement
  ) {
    if (this._items === null) {
      throw new Error("No items found!");
    }
    const isNextDirection = direction === Direction.NEXT;
    const isPrevDirection = direction === Direction.PREV;
    const activeIndex = this._getItemIndex(activeElement);
    const lastItemIndex = this._items.length - 1;
    const isGoingToWrap =
      (isPrevDirection && activeIndex === 0) ||
      (isNextDirection && activeIndex === lastItemIndex);

    if (isGoingToWrap && !this._config.wrap) {
      return activeElement;
    }

    const delta = direction === Direction.PREV ? -1 : 1;
    const itemIndex = (activeIndex + delta) % this._items.length;

    return itemIndex === -1
      ? this._items[this._items.length - 1]
      : this._items[itemIndex];
  }

  _triggerSlideEvent(
    relatedTarget: HTMLElement,
    eventDirectionName: CarouselDirection
  ) {
    const targetIndex = this._getItemIndex(relatedTarget);
    const fromIndex = this._getItemIndex(
      (SelectorEngine.findOne(
        Selector.ACTIVE_ITEM,
        this._element
      ) as HTMLElement) || null
    );

    return EventHandler.trigger(this._element, Event.SLIDE, {
      relatedTarget,
      direction: eventDirectionName,
      from: fromIndex,
      to: targetIndex,
    });
  }

  _setActiveIndicatorElement(element: HTMLElement) {
    if (this._indicatorsElement) {
      const indicators = SelectorEngine.find(
        Selector.ACTIVE,
        this._indicatorsElement
      );
      for (let i = 0; i < indicators.length; i++) {
        indicators[i].classList.remove(ClassName.ACTIVE);
      }

      const nextIndicator = this._indicatorsElement.children[
        this._getItemIndex(element)
      ];

      if (nextIndicator) {
        nextIndicator.classList.add(ClassName.ACTIVE);
      }
    }
  }

  _slide(direction: CarouselDirection, element?: HTMLElement) {
    const activeElement = SelectorEngine.findOne(
      Selector.ACTIVE_ITEM,
      this._element
    ) as HTMLElement | undefined;
    const activeElementIndex = this._getItemIndex(activeElement);
    const nextElement =
      element ||
      (activeElement && this._getItemByDirection(direction, activeElement));

    if (!nextElement) {
      throw new Error("Next element not found!");
    }

    const nextElementIndex = this._getItemIndex(nextElement);
    const isCycling = Boolean(this._interval);

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
      this._isSliding = false;
      return;
    }

    const slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
    if (slideEvent.defaultPrevented) {
      return;
    }

    if (!activeElement || !nextElement) {
      // Some weirdness is happening, so we bail
      return;
    }

    this._isSliding = true;

    if (isCycling) {
      this.pause();
    }

    this._setActiveIndicatorElement(nextElement);

    if (this._element.classList.contains(ClassName.SLIDE)) {
      nextElement.classList.add(orderClassName);

      Utils.reflow(nextElement);

      activeElement.classList.add(directionalClassName);
      nextElement.classList.add(directionalClassName);

      const nextElementInterval = parseInt(
        nextElement.getAttribute("data-interval") || "0",
        10
      );
      if (nextElementInterval) {
        this._config.defaultInterval =
          this._config.defaultInterval || this._config.interval;
        this._config.interval = nextElementInterval;
      } else {
        this._config.interval =
          this._config.defaultInterval || this._config.interval;
      }

      const transitionDuration = Utils.getTransitionDurationFromElement(
        activeElement
      );

      EventHandler.one(activeElement, TRANSITION_END, () => {
        nextElement.classList.remove(directionalClassName);
        nextElement.classList.remove(orderClassName);
        nextElement.classList.add(ClassName.ACTIVE);

        activeElement.classList.remove(ClassName.ACTIVE);
        activeElement.classList.remove(orderClassName);
        activeElement.classList.remove(directionalClassName);

        this._isSliding = false;

        setTimeout(() => {
          EventHandler.trigger(this._element, Event.SLID, {
            relatedTarget: nextElement,
            direction: eventDirectionName,
            from: activeElementIndex,
            to: nextElementIndex,
          });
        }, 0);
      });

      Utils.emulateTransitionEnd(activeElement, transitionDuration);
    } else {
      activeElement.classList.remove(ClassName.ACTIVE);
      nextElement.classList.add(ClassName.ACTIVE);

      this._isSliding = false;
      EventHandler.trigger(this._element, Event.SLID, {
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
