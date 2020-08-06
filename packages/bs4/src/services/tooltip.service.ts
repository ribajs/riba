/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0-alpha1): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * @see https://github.com/twbs/bootstrap/blob/main/js/src/tooltip.js
 * --------------------------------------------------------------------------
 */

import {
  TRANSITION_END,
  emulateTransitionEnd,
  findShadowRoot,
  getTransitionDurationFromElement,
  isElement,
  noop,
  typeCheckConfig,
} from "./utils.service";
import { getUID, getElementFromEvent } from "@ribajs/utils/src/dom";
import { DefaultAllowlist, AllowList, sanitizeHtml } from "./sanitizer";
import Data from "./dom/data";
import EventHandler from "./dom/event-handler";
import Manipulator from "./dom/manipulator";
import Popper from "popper.js";
import { findOne } from "./dom/selector-engine";

export type ConfigOffsetFn = (
  offsets: any /*TODO*/,
  el: HTMLElement
) => number[];
export type ConfigPlacementFn = (el1: HTMLElement, el2: HTMLElement) => string;
export type ConfigTitleFn = (el: HTMLElement) => string;
export type ConfigContentFn = (el: HTMLElement) => string;

export interface Config {
  animation: boolean;
  template: string;
  trigger: string;
  title?: string | ConfigTitleFn;
  delay: number | { show: number; hide: number };
  html?: string;
  selector?: string;
  placement: string | ConfigPlacementFn;
  offset: number | ConfigOffsetFn;
  container?: Element; // TODO,
  fallbackPlacement: "flip";
  boundary: "scrollParent";
  sanitize: boolean;
  sanitizeFn: null;
  allowList: AllowList;
  popperConfig: null | any; // TODO
  content?: string | ConfigContentFn;
}

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = "tooltip";
const VERSION = "5.0.0-alpha1";
export const DATA_KEY = "bs.tooltip";
export const EVENT_KEY = `.${DATA_KEY}`;
export const CLASS_PREFIX = "bs-tooltip";
export const BSCLS_PREFIX_REGEX = new RegExp(`(^|\\s)${CLASS_PREFIX}\\S+`, "g");
export const DISALLOWED_ATTRIBUTES = ["sanitize", "allowList", "sanitizeFn"];

export const DefaultType = {
  animation: "boolean",
  template: "string",
  title: "(string|element|function)",
  trigger: "string",
  delay: "(number|object)",
  html: "boolean",
  selector: "(string|boolean)",
  placement: "(string|function)",
  offset: "(number|string|function)",
  container: "(string|element|boolean)",
  fallbackPlacement: "(string|array)",
  boundary: "(string|element)",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  allowList: "object",
  popperConfig: "(null|object)",
};

export const AttachmentMap = {
  AUTO: "auto",
  TOP: "top",
  RIGHT: "right",
  BOTTOM: "bottom",
  LEFT: "left",
};

export const Default: Config = {
  animation: true,
  template:
    '<div class="tooltip" role="tooltip">' +
    '<div class="tooltip-arrow"></div>' +
    '<div class="tooltip-inner"></div></div>',
  trigger: "hover focus",
  title: undefined,
  delay: 0,
  html: undefined,
  selector: undefined,
  placement: "top",
  offset: 0,
  container: undefined,
  fallbackPlacement: "flip",
  boundary: "scrollParent",
  sanitize: true,
  sanitizeFn: null,
  allowList: DefaultAllowlist,
  popperConfig: null,
};

export const Event = {
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

export const CLASS_NAME_FADE = "fade";
export const CLASS_NAME_MODAL = "modal";
export const CLASS_NAME_SHOW = "show";

export const HOVER_STATE_SHOW = "show";
export const HOVER_STATE_OUT = "out";

export const SELECTOR_TOOLTIP_INNER = ".tooltip-inner";

export const TRIGGER_HOVER = "hover";
export const TRIGGER_FOCUS = "focus";
export const TRIGGER_CLICK = "click";
export const TRIGGER_MANUAL = "manual";

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

export class TooltipService {
  private _isEnabled = true;
  private _timeout = 0;
  private _hoverState = "";
  private _activeTrigger: { [key: string]: boolean } = {};
  private _popper: null | Popper = null;

  protected element: HTMLElement | HTMLUnknownElement;
  protected config: Config;
  protected tip: null | HTMLElement = null;

  constructor(element: HTMLElement | HTMLUnknownElement, config: Config) {
    if (typeof Popper === "undefined") {
      throw new TypeError(
        "Bootstrap's tooltips require Popper.js (https://popper.js.org)"
      );
    }

    this.element = element;
    this.config = this._getConfig(config);
    this._setListeners();
    Data.setData(element, TooltipService.DATA_KEY, this);
  }

  // Getters

  static get VERSION() {
    return VERSION;
  }

  static get Default() {
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

  // Public

  enable() {
    this._isEnabled = true;
  }

  disable() {
    this._isEnabled = false;
  }

  toggleEnabled() {
    this._isEnabled = !this._isEnabled;
  }

  toggle(event: Event) {
    if (!this._isEnabled) {
      return;
    }

    if (event) {
      const dataKey = TooltipService.DATA_KEY;
      const element = getElementFromEvent(event);
      let context = Data.getData(element, dataKey);

      if (!context) {
        context = new TooltipService(element, this._getDelegateConfig());
        Data.setData(element, dataKey, context);
      }

      context._activeTrigger.click = !context._activeTrigger.click;

      if (context._isWithActiveTrigger()) {
        context._enter(null, context);
      } else {
        context._leave(null, context);
      }
    } else {
      if (this.getTipElement().classList.contains(CLASS_NAME_SHOW)) {
        this._leave(undefined, this);
        return;
      }

      this._enter(undefined, this);
    }
  }

  dispose() {
    clearTimeout(this._timeout);

    Data.removeData(this.element, TooltipService.DATA_KEY);

    // EventHandler.off(this.element, TooltipService.EVENT_KEY);
    const modalElement = this.element.closest(`.${CLASS_NAME_MODAL}`);
    if (modalElement) {
      EventHandler.off(modalElement, "hide.bs.modal", this._hideModalHandler);
    }

    if (this.tip) {
      this.tip.parentNode?.removeChild(this.tip);
    }

    // this._isEnabled = null;
    // this._timeout = null;
    // this._hoverState = null;
    // this._activeTrigger = null;
    if (this._popper) {
      this._popper.destroy();
    }

    // this._popper = null;
    // this.element = null;
    // this.config = null;
    // this.tip = null;
  }

  show() {
    if (this.element.style.display === "none") {
      throw new Error("Please use show on visible elements");
    }

    if (this.isWithContent() && this._isEnabled) {
      const showEvent = EventHandler.trigger(
        this.element,
        TooltipService.Event.SHOW
      );
      const shadowRoot = findShadowRoot(this.element);
      const isInTheDom =
        shadowRoot === null
          ? this.element.ownerDocument.documentElement.contains(this.element)
          : shadowRoot.contains(this.element);

      if (showEvent.defaultPrevented || !isInTheDom) {
        return;
      }

      const tip = this.getTipElement();
      const tipId = getUID(TooltipService.NAME);

      tip.setAttribute("id", tipId);
      this.element.setAttribute("aria-describedby", tipId);

      this.setContent();

      if (this.config.animation) {
        tip.classList.add(CLASS_NAME_FADE);
      }

      const placement =
        typeof this.config.placement === "function"
          ? this.config.placement.call(this, tip, this.element)
          : this.config.placement;

      const attachment = this._getAttachment(placement || undefined);
      this._addAttachmentClass(attachment);

      const container = this._getContainer();
      Data.setData(tip, TooltipService.DATA_KEY, this);

      if (!this.element.ownerDocument.documentElement.contains(this.tip)) {
        container?.appendChild(tip);
      }

      EventHandler.trigger(this.element, TooltipService.Event.INSERTED);

      this._popper = new Popper(
        this.element,
        tip,
        this._getPopperConfig(attachment)
      );

      tip.classList.add(CLASS_NAME_SHOW);

      // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ("ontouchstart" in document.documentElement) {
        Array.from(document.body.children).forEach((element) => {
          EventHandler.on(element, "mouseover", noop());
        });
      }

      const complete = () => {
        if (this.config.animation) {
          this._fixTransition();
        }

        const prevHoverState = this._hoverState;
        this._hoverState = "";

        EventHandler.trigger(this.element, TooltipService.Event.SHOWN);

        if (prevHoverState === HOVER_STATE_OUT) {
          this._leave(undefined, this);
        }
      };

      if (this.tip?.classList.contains(CLASS_NAME_FADE)) {
        const transitionDuration = getTransitionDurationFromElement(this.tip);
        EventHandler.one(this.tip, TRANSITION_END, complete);
        emulateTransitionEnd(this.tip, transitionDuration);
      } else {
        complete();
      }
    }
  }

  hide() {
    const tip = this.getTipElement();
    const complete = () => {
      if (this._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {
        tip.parentNode.removeChild(tip);
      }

      this._cleanTipClass();
      this.element.removeAttribute("aria-describedby");
      EventHandler.trigger(this.element, TooltipService.Event.HIDDEN);
      this._popper?.destroy();
    };

    const hideEvent = EventHandler.trigger(
      this.element,
      TooltipService.Event.HIDE
    );
    if (hideEvent.defaultPrevented) {
      return;
    }

    tip.classList.remove(CLASS_NAME_SHOW);

    // If this is a touch-enabled device we remove the extra
    // empty mouseover listeners we added for iOS support
    if ("ontouchstart" in document.documentElement) {
      Array.from(document.body.children).forEach((element) =>
        EventHandler.off(element, "mouseover", noop)
      );
    }

    this._activeTrigger[TRIGGER_CLICK] = false;
    this._activeTrigger[TRIGGER_FOCUS] = false;
    this._activeTrigger[TRIGGER_HOVER] = false;

    if (this.tip?.classList.contains(CLASS_NAME_FADE)) {
      const transitionDuration = getTransitionDurationFromElement(tip);

      EventHandler.one(tip, TRANSITION_END, complete);
      emulateTransitionEnd(tip, transitionDuration);
    } else {
      complete();
    }

    this._hoverState = "";
  }

  update() {
    if (this._popper !== null) {
      this._popper.scheduleUpdate();
    }
  }

  // Protected

  isWithContent() {
    return Boolean(this.getTitle());
  }

  getTipElement() {
    if (this.tip) {
      return this.tip;
    }

    const element = document.createElement("div");
    element.innerHTML = this.config.template;

    this.tip = element.children[0] as HTMLElement;

    if (!this.tip) {
      throw new Error("Tooltip not found!");
    }

    return this.tip;
  }

  setContent() {
    const tip = this.getTipElement();
    this.setElementContent(
      findOne(SELECTOR_TOOLTIP_INNER, tip),
      this.getTitle()
    );
    tip.classList.remove(CLASS_NAME_FADE, CLASS_NAME_SHOW);
  }

  setElementContent(
    element: HTMLElement | null,
    content: Element | null | string
  ) {
    if (element === null) {
      return;
    }

    if (content && typeof content !== "string" && isElement(content)) {
      if ((content as any).jquery) {
        content = (content as any)[0];
      }

      // content is a DOM node or a jQuery
      if (this.config.html) {
        if ((content as Element | null)?.parentNode !== element) {
          element.innerHTML = "";
          element.appendChild(content as Node);
        }
      } else if (content && (content as Element).textContent) {
        element.textContent = (content as Element).textContent;
      }

      return;
    }

    if (this.config.html) {
      if (this.config.sanitize && typeof content === "string") {
        content =
          sanitizeHtml(
            content,
            this.config.allowList,
            this.config.sanitizeFn || undefined
          ) || null;
      }
      if (element?.innerHTML && typeof content === "string") {
        (element as Element).innerHTML = content;
      }
    } else {
      if (element?.innerHTML && typeof content === "string") {
        (element as Element).innerHTML = content;
      }
    }
  }

  getTitle() {
    let title = this.element.getAttribute("data-original-title");

    if (!title) {
      title =
        typeof this.config.title === "function"
          ? (this.config.title as ConfigTitleFn)(this.element)
          : this.config.title || null;
    }

    return title;
  }

  // Private

  _getPopperConfig(attachment: string) {
    const defaultBsConfig = {
      placement: attachment,
      modifiers: {
        offset: this._getOffset(),
        flip: {
          behavior: this.config.fallbackPlacement,
        },
        arrow: {
          element: `.${TooltipService.NAME}-arrow`,
        },
        preventOverflow: {
          boundariesElement: this.config.boundary,
        },
      },
      onCreate: (data: any) => {
        if (data.originalPlacement !== data.placement) {
          this._handlePopperPlacementChange(data);
        }
      },
      onUpdate: (data: any) => this._handlePopperPlacementChange(data),
    };

    return {
      ...defaultBsConfig,
      ...this.config.popperConfig,
    };
  }

  _addAttachmentClass(attachment: string) {
    this.getTipElement().classList.add(`${CLASS_PREFIX}-${attachment}`);
  }

  _getOffset() {
    const offset: any = {};

    if (this.config.offset && typeof this.config.offset === "function") {
      offset.fn = (data: any) => {
        data.offsets = {
          ...data.offsets,
          ...((this.config.offset as ConfigOffsetFn)(
            data.offsets,
            this.element
          ) || {}),
        };

        return data;
      };
    } else {
      offset.offset = this.config.offset;
    }

    return offset;
  }

  _getContainer() {
    if (!this.config.container) {
      return document.body;
    }

    if (isElement(this.config.container)) {
      return this.config.container;
    }

    if (typeof this.config.container === "string") {
      return findOne(this.config.container);
    }

    return null;
  }

  _getAttachment(placement = "AUTO") {
    return AttachmentMap[
      (placement.toUpperCase() as "AUTO" | "TOP" | "RIGHT") ||
        "BOTTOM" ||
        "LEFT"
    ];
  }

  _setListeners() {
    const triggers = this.config.trigger.split(" ");

    triggers.forEach((trigger) => {
      if (trigger === "click") {
        EventHandler.on(
          this.element,
          TooltipService.Event.CLICK,
          // this.config.selector,
          (event: Event) => this.toggle(event)
        );
      } else if (trigger !== TRIGGER_MANUAL) {
        const eventIn =
          trigger === TRIGGER_HOVER
            ? TooltipService.Event.MOUSEENTER
            : TooltipService.Event.FOCUSIN;
        const eventOut =
          trigger === TRIGGER_HOVER
            ? TooltipService.Event.MOUSELEAVE
            : TooltipService.Event.FOCUSOUT;

        EventHandler.on(
          this.element,
          eventIn /*, this.config.selector*/,
          (event) => this._enter(event)
        );
        EventHandler.on(
          this.element,
          eventOut /*, this.config.selector*/,
          (event) => this._leave(event)
        );
      }
    });

    // this._hideModalHandler = () => {
    //   if (this.element) {
    //     this.hide();
    //   }
    // };
    const closestModalEl = this.element.closest(`.${CLASS_NAME_MODAL}`);
    if (closestModalEl) {
      EventHandler.on(closestModalEl, "hide.bs.modal", this._hideModalHandler);
    }

    if (this.config.selector) {
      this.config = {
        ...this.config,
        trigger: "manual",
        selector: "",
      };
    } else {
      this._fixTitle();
    }
  }

  _hideModalHandler() {
    if (this.element) {
      this.hide();
    }
  }

  _fixTitle() {
    const titleType = typeof this.element.getAttribute("data-original-title");

    if (this.element.getAttribute("title") || titleType !== "string") {
      this.element.setAttribute(
        "data-original-title",
        this.element.getAttribute("title") || ""
      );

      this.element.setAttribute("title", "");
    }
  }

  _enter(event?: Event, context?: any) {
    const dataKey = TooltipService.DATA_KEY;
    if (event) {
      const el = (event as any).delegateTarget || getElementFromEvent(event);
      context = context || Data.getData(el, dataKey);

      if (!context) {
        context = new TooltipService(el, this._getDelegateConfig());
        Data.setData(el, dataKey, context);
      }

      context._activeTrigger[
        event.type === "focusin" ? TRIGGER_FOCUS : TRIGGER_HOVER
      ] = true;
    }

    if (
      context.getTipElement().classList.contains(CLASS_NAME_SHOW) ||
      context._hoverState === HOVER_STATE_SHOW
    ) {
      context._hoverState = HOVER_STATE_SHOW;
      return;
    }

    clearTimeout(context._timeout);

    context._hoverState = HOVER_STATE_SHOW;

    if (!context.config.delay || !context.config.delay.show) {
      context.show();
      return;
    }

    context._timeout = setTimeout(() => {
      if (context._hoverState === HOVER_STATE_SHOW) {
        context.show();
      }
    }, context.config.delay.show);
  }

  _leave(event?: Event, context?: any) {
    const dataKey = TooltipService.DATA_KEY;
    if (event) {
      const el = (event as any).delegateTarget || getElementFromEvent(event);
      context = context || Data.getData(el, dataKey);

      if (!context) {
        context = new TooltipService(el, this._getDelegateConfig());
        Data.setData(el, dataKey, context);
      }
    }

    if (event) {
      context._activeTrigger[
        event.type === "focusout" ? TRIGGER_FOCUS : TRIGGER_HOVER
      ] = false;
    }

    if (context._isWithActiveTrigger()) {
      return;
    }

    clearTimeout(context._timeout);

    context._hoverState = HOVER_STATE_OUT;

    if (!context.config.delay || !context.config.delay.hide) {
      context.hide();
      return;
    }

    context._timeout = setTimeout(() => {
      if (context._hoverState === HOVER_STATE_OUT) {
        context.hide();
      }
    }, context.config.delay.hide);
  }

  _isWithActiveTrigger() {
    for (const trigger in this._activeTrigger) {
      if (this._activeTrigger[trigger]) {
        return true;
      }
    }

    return false;
  }

  _getConfig(config: Config) {
    const dataAttributes = Manipulator.getDataAttributes(this.element);

    Object.keys(dataAttributes).forEach((dataAttr) => {
      if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
        delete dataAttributes[dataAttr];
      }
    });

    if (
      config &&
      typeof config.container === "object" &&
      (config.container as any).jquery // TODO?
    ) {
      config.container = (config.container as any)[0]; // TODO?
    }

    config = {
      ...TooltipService.Default,
      ...dataAttributes,
      ...(typeof config === "object" && config ? config : {}),
    };

    if (typeof config.delay === "number") {
      config.delay = {
        show: config.delay,
        hide: config.delay,
      };
    }

    if (config.title && typeof config.title === "number") {
      config.title = (config.title as number).toString();
    }

    if (config.content && typeof config.content === "number") {
      config.content = (config.content as number).toString();
    }

    typeCheckConfig(NAME, config, TooltipService.DefaultType);

    if (config.sanitize) {
      config.template =
        sanitizeHtml(
          config.template,
          config.allowList,
          config.sanitizeFn || undefined
        ) || "";
    }

    return config;
  }

  _getDelegateConfig(): Config {
    const config: Partial<Config> = {};

    if (this.config) {
      for (const key in this.config) {
        // TODO fix types
        if (
          (this.config as any)[key] !== (TooltipService.Default as any)[key]
        ) {
          (config as any)[key] = (this.config as any)[key]; // TODO fix types
        }
      }
    }

    return config as Config;
  }

  _cleanTipClass() {
    const tip = this.getTipElement();
    const tabClass = tip.getAttribute("class")?.match(BSCLS_PREFIX_REGEX);
    if (tabClass && tabClass.length > 0) {
      tabClass
        .map((token) => token.trim())
        .forEach((tClass) => tip.classList.remove(tClass));
    }
  }

  _handlePopperPlacementChange(popperData: any) {
    this.tip = popperData.instance.popper;
    this._cleanTipClass();
    this._addAttachmentClass(this._getAttachment(popperData.placement));
  }

  _fixTransition() {
    const tip = this.getTipElement();
    const initConfigAnimation = this.config.animation;
    if (tip.getAttribute("x-placement") !== null) {
      return;
    }

    tip.classList.remove(CLASS_NAME_FADE);
    this.config.animation = false;
    this.hide();
    this.show();
    this.config.animation = initConfigAnimation;
  }

  // Static

  static getInstance(element: HTMLElement) {
    return Data.getData(element, DATA_KEY);
  }
}

export default TooltipService;