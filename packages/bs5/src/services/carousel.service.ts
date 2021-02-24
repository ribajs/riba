import { Carousel } from "bootstrap";
import { CarouselOption } from "../interfaces";

/**
 * @see https://github.com/twbs/bootstrap/blob/main/js/src/carousel.js
 */
export class CarouselService extends Carousel {}

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

export const NAME = "carousel";
export const DATA_KEY = "bs.carousel";
export const EVENT_KEY = `.${DATA_KEY}`;
export const DATA_API_KEY = ".data-api";

export const ARROW_LEFT_KEY = "ArrowLeft";
export const ARROW_RIGHT_KEY = "ArrowRight";
export const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch
export const SWIPE_THRESHOLD = 40;

export const Default: CarouselOption = {
  interval: 5000,
  keyboard: true,
  slide: false,
  pause: "hover",
  wrap: true,
  touch: true,
};

export const DefaultType = {
  interval: "(number|boolean)",
  keyboard: "boolean",
  slide: "(boolean|string)",
  pause: "(string|boolean)",
  wrap: "boolean",
  touch: "boolean",
};

export const DIRECTION_NEXT = "next";
export const DIRECTION_PREV = "prev";
export const DIRECTION_LEFT = "left";
export const DIRECTION_RIGHT = "right";

export const EVENT_SLIDE = `slide${EVENT_KEY}`;
export const EVENT_SLID = `slid${EVENT_KEY}`;
export const EVENT_KEYDOWN = `keydown${EVENT_KEY}`;
export const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY}`;
export const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY}`;
export const EVENT_TOUCHSTART = `touchstart${EVENT_KEY}`;
export const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY}`;
export const EVENT_TOUCHEND = `touchend${EVENT_KEY}`;
export const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY}`;
export const EVENT_POINTERUP = `pointerup${EVENT_KEY}`;
export const EVENT_DRAG_START = `dragstart${EVENT_KEY}`;
export const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
export const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;

export const CLASS_NAME_CAROUSEL = "carousel";
export const CLASS_NAME_ACTIVE = "active";
export const CLASS_NAME_SLIDE = "slide";
export const CLASS_NAME_END = "carousel-item-end";
export const CLASS_NAME_START = "carousel-item-start";
export const CLASS_NAME_NEXT = "carousel-item-next";
export const CLASS_NAME_PREV = "carousel-item-prev";
export const CLASS_NAME_POINTER_EVENT = "pointer-event";

export const SELECTOR_ACTIVE = ".active";
export const SELECTOR_ACTIVE_ITEM = ".active.carousel-item";
export const SELECTOR_ITEM = ".carousel-item";
export const SELECTOR_ITEM_IMG = ".carousel-item img";
export const SELECTOR_NEXT_PREV = ".carousel-item-next, .carousel-item-prev";
export const SELECTOR_INDICATORS = ".carousel-indicators";
export const SELECTOR_INDICATOR = "[data-bs-target]";
export const SELECTOR_DATA_SLIDE = "[data-bs-slide], [data-bs-slide-to]";
export const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';

export const POINTER_TYPE_TOUCH = "touch";
export const POINTER_TYPE_PEN = "pen";
