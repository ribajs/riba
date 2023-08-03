/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0-alpha1): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * @see https://github.com/twbs/bootstrap/blob/main/js/src/popover.js
 * --------------------------------------------------------------------------
 */

import { getData } from "../helper/dom/data.js";
import { findOne } from "../helper/dom/selector-engine.js";
import { TooltipService } from "./tooltip.service.js";
import {
  TooltipContentFn,
  PopoverOptions,
  TooltipOptions,
} from "../interfaces/index.js";

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = "popover";
const VERSION = "5.0.0-alpha1";
const DATA_KEY = "bs.popover";
const EVENT_KEY = `.${DATA_KEY}`;
const CLASS_PREFIX = "bs-popover";
const BSCLS_PREFIX_REGEX = new RegExp(`(^|\\s)${CLASS_PREFIX}\\S+`, "g");

const Default: PopoverOptions = {
  ...TooltipService.Default,
  placement: "right",
  trigger: "click",
  content: "",
  template:
    '<div class="popover" role="tooltip">' +
    '<div class="popover-arrow arrow"></div>' +
    '<h3 class="popover-header"></h3>' +
    '<div class="popover-body"></div></div>',
};

const DefaultType = {
  ...TooltipService.DefaultType,
  content: "(string|element|function)",
};

const Event = {
  HIDE: `hide${EVENT_KEY}`,
  HIDDEN: `hidden${EVENT_KEY}`,
  SHOW: `show${EVENT_KEY}`,
  SHOWN: `shown${EVENT_KEY}`,
  INSERTED: `inserted${EVENT_KEY}`,
  CLICK: `click${EVENT_KEY}`,
  FOCUSIN: `focusin${EVENT_KEY}`,
  FOCUSOUT: `focusout${EVENT_KEY}`,
  MOUSEENTER: `mouseenter${EVENT_KEY}`,
  MOUSELEAVE: `mouseleave${EVENT_KEY}`,
};

const CLASS_NAME_FADE = "fade";
const CLASS_NAME_SHOW = "show";

const SELECTOR_TITLE = ".popover-header";
const SELECTOR_CONTENT = ".popover-body";

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

export class PopoverService extends TooltipService {
  // Export constants defined above as static members of the service class, to avoid name collisions in the global namespace.
  static readonly CONSTANTS: { [key: string]: any } = {
    NAME,
    VERSION,
    DATA_KEY,
    EVENT_KEY,
    CLASS_PREFIX,
    BSCLS_PREFIX_REGEX,

    Default,
    DefaultType,
    Event,

    CLASS_NAME_FADE,
    CLASS_NAME_SHOW,

    SELECTOR_TITLE,
    SELECTOR_CONTENT,
  };

  // Getters

  static get VERSION() {
    return VERSION;
  }

  static get Default(): PopoverOptions {
    return Default;
  }

  static get NAME() {
    return NAME;
  }

  static get DATA_KEY() {
    return DATA_KEY;
  }

  static get Event() {
    return Event;
  }

  static get EVENT_KEY() {
    return EVENT_KEY;
  }

  static get DefaultType() {
    return DefaultType;
  }

  // Overrides
  constructor(
    element: HTMLElement | HTMLUnknownElement,
    config: Partial<PopoverOptions>,
  ) {
    super(element, config as TooltipOptions);
    element.style.backgroundColor = "#ffff00";
  }

  isWithContent() {
    return Boolean(this.getTitle() || this._getContent());
  }

  setContent(content?: string | TooltipContentFn) {
    const tip = this.getTipElement();

    // we use append for html objects to maintain js events
    this.setElementContent(findOne(SELECTOR_TITLE, tip), this.getTitle());
    if (!content) {
      content = this._getContent();
    }
    if (typeof content === "function") {
      content = (content as TooltipContentFn)(this.element);
    }

    if (content) {
      this.setElementContent(findOne(SELECTOR_CONTENT, tip), content);
    }

    tip.classList.remove(CLASS_NAME_FADE, CLASS_NAME_SHOW);
  }

  // Private

  _addAttachmentClass(attachment: string) {
    this.getTipElement().classList.add(`${CLASS_PREFIX}-${attachment}`);
  }

  _getContent() {
    return this.element.getAttribute("data-content") || this.config.content;
  }

  _cleanTipClass() {
    const tip = this.getTipElement();
    const tabClass = tip?.getAttribute("class")?.match(BSCLS_PREFIX_REGEX);
    if (tabClass && tabClass.length > 0) {
      tabClass
        .map((token) => token.trim())
        .forEach((tClass) => tip.classList.remove(tClass));
    }
  }

  _getPopperConfig(attachment: string) {
    const config = super._getPopperConfig(attachment);
    config.modifiers.arrow.element = `.${PopoverService.NAME}-arrow`;
    return config;
  }

  // Static
  static getInstance(element: HTMLElement) {
    return getData(element, DATA_KEY);
  }
}

export default PopoverService;
