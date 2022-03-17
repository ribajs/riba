// Fork of https://github.com/twbs/bootstrap/blob/main/js/src/modal.js

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0-alpha1): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
import { TRANSITION_END } from "../constants/index.js";
import {
  getTransitionDurationFromElement,
  emulateTransitionEnd,
  typeCheckConfig,
  reflow
} from "../helper/utils.js";
import { setData, getData, removeData } from "../helper/dom/data.js";
import { on, one, off, trigger } from "../helper/dom/event-handler.js";
// import Manipulator from "./dom/manipulator";
import * as SelectorEngine from "../helper/dom/selector-engine.js";

export interface Config {
  focus?: boolean;
  keyboard?: boolean;
  backdrop?: boolean | "static";
  show?: boolean;
}

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = "modal";
const VERSION = "5.0.0-alpha1";
const DATA_KEY = "bs.modal";
const EVENT_KEY = `.${DATA_KEY}`;
const ESCAPE_KEY = "Escape";

export const Default: Config = {
  backdrop: true,
  keyboard: true,
  focus: true,
  show: true
};

export const DefaultType = {
  backdrop: "(boolean|string)",
  keyboard: "boolean",
  focus: "boolean",
  show: "boolean"
};

export const EVENT_HIDE = `hide${EVENT_KEY}`;
export const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
export const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
export const EVENT_SHOW = `show${EVENT_KEY}`;
export const EVENT_SHOWN = `shown${EVENT_KEY}`;
export const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
export const EVENT_RESIZE = `resize${EVENT_KEY}`;
export const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
export const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
export const EVENT_MOUSEUP_DISMISS = `mouseup.dismiss${EVENT_KEY}`;
export const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY}`;

export const CLASS_NAME_SCROLLBAR_MEASURER = "modal-scrollbar-measure";
export const CLASS_NAME_BACKDROP = "modal-backdrop";
export const CLASS_NAME_OPEN = "modal-open";
export const CLASS_NAME_FADE = "fade";
export const CLASS_NAME_SHOW = "show";
export const CLASS_NAME_STATIC = "modal-static";

export const SELECTOR_DIALOG = ".modal-dialog";
export const SELECTOR_MODAL_BODY = ".modal-body";
export const SELECTOR_FIXED_CONTENT =
  ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top";
export const SELECTOR_STICKY_CONTENT = ".sticky-top";

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

export class ModalService {
  protected _config: Config;
  _element: HTMLElement;
  _dialog: HTMLElement | null;
  _backdrop: HTMLDivElement | null;
  _isShown: boolean;
  _isBodyOverflowing: boolean;
  _ignoreBackdropClick: boolean;
  _isTransitioning: boolean;
  _scrollbarWidth: number;
  constructor(element: HTMLElement, config: Config) {
    this._config = this._getConfig(config);
    this._element = element;
    this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, element);
    this._backdrop = null;
    this._isShown = false;
    this._isBodyOverflowing = false;
    this._ignoreBackdropClick = false;
    this._isTransitioning = false;
    this._scrollbarWidth = 0;
    setData(element, DATA_KEY, this);
  }

  // Getters

  static get VERSION() {
    return VERSION;
  }

  static get Default() {
    return Default;
  }

  // Public

  toggle(relatedTarget?: HTMLElement) {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  }

  show(relatedTarget?: HTMLElement) {
    if (this._isShown || this._isTransitioning) {
      return;
    }

    if (this._element.classList.contains(CLASS_NAME_FADE)) {
      this._isTransitioning = true;
    }

    const showEvent = trigger(this._element, EVENT_SHOW, {
      relatedTarget
    });

    if (this._isShown || showEvent.defaultPrevented) {
      return;
    }

    this._isShown = true;

    this._checkScrollbar();
    this._setScrollbar();

    this._adjustDialog();

    this._setEscapeEvent();
    this._setResizeEvent();

    on(
      this._element,
      EVENT_CLICK_DISMISS,
      // SELECTOR_DATA_DISMISS,
      (event: Event) => this.hide(event)
    );

    if (this._dialog) {
      on(this._dialog, EVENT_MOUSEDOWN_DISMISS, () => {
        one(this._element, EVENT_MOUSEUP_DISMISS, (event: Event) => {
          if (event.target === this._element) {
            this._ignoreBackdropClick = true;
          }
        });
      });
    }

    this._showBackdrop(() => this._showElement(relatedTarget));
  }

  hide(event?: Event) {
    if (event) {
      event.preventDefault();
    }

    if (!this._isShown || this._isTransitioning) {
      return;
    }

    const hideEvent = trigger(this._element, EVENT_HIDE);

    if (hideEvent.defaultPrevented) {
      return;
    }

    this._isShown = false;
    const transition = this._element.classList.contains(CLASS_NAME_FADE);

    if (transition) {
      this._isTransitioning = true;
    }

    this._setEscapeEvent();
    this._setResizeEvent();

    // off(document, EVENT_FOCUSIN); TODO

    this._element.classList.remove(CLASS_NAME_SHOW);

    // off(this._element, EVENT_CLICK_DISMISS); TODO
    // off(this._dialog, EVENT_MOUSEDOWN_DISMISS); TODO

    if (transition) {
      const transitionDuration = getTransitionDurationFromElement(
        this._element
      );

      one(this._element, TRANSITION_END, (/*event*/) =>
        this._hideModal(/*event*/));
      emulateTransitionEnd(this._element, transitionDuration);
    } else {
      this._hideModal();
    }
  }

  dispose() {
    // TODO
    // [window, this._element, this._dialog].forEach((htmlElement) =>
    //   off(htmlElement, EVENT_KEY)
    // );

    /**
     * `document` has 2 events `EVENT_FOCUSIN` and `EVENT_CLICK_DATA_API`
     * Do not move `document` in `htmlElements` array
     * It will remove `EVENT_CLICK_DATA_API` event that should remain
     */
    // off(document, EVENT_FOCUSIN); TODO

    removeData(this._element, DATA_KEY);

    // this._config = null;
    // this._element = null;
    // this._dialog = null;
    // this._backdrop = null;
    // this._isShown = null;
    // this._isBodyOverflowing = null;
    // this._ignoreBackdropClick = null;
    // this._isTransitioning = null;
    // this._scrollbarWidth = null;
  }

  handleUpdate() {
    this._adjustDialog();
  }

  // Private

  _getConfig(config: Config): Config {
    config = {
      ...Default,
      ...config
    };
    typeCheckConfig(NAME, config, DefaultType);
    return config;
  }

  _showElement(relatedTarget?: HTMLElement) {
    const transition = this._element.classList.contains(CLASS_NAME_FADE);
    const modalBody = this._dialog
      ? SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog)
      : null;

    if (
      !this._element.parentNode ||
      this._element.parentNode.nodeType !== Node.ELEMENT_NODE
    ) {
      // Don't move modal's DOM position
      document.body.appendChild(this._element);
    }

    this._element.style.display = "block";
    this._element.removeAttribute("aria-hidden");
    this._element.setAttribute("aria-modal", "true");
    this._element.setAttribute("role", "dialog");
    this._element.scrollTop = 0;

    if (modalBody) {
      modalBody.scrollTop = 0;
    }

    if (transition) {
      reflow(this._element);
    }

    this._element.classList.add(CLASS_NAME_SHOW);

    if (this._config.focus) {
      this._enforceFocus();
    }

    const transitionComplete = () => {
      if (this._config.focus) {
        this._element.focus();
      }

      this._isTransitioning = false;
      trigger(this._element, EVENT_SHOWN, {
        relatedTarget
      });
    };

    if (transition) {
      if (!this._dialog) {
        console.warn("Dialog element not found!");
        return;
      }

      const transitionDuration = getTransitionDurationFromElement(this._dialog);

      one(this._dialog, TRANSITION_END, transitionComplete);
      emulateTransitionEnd(this._dialog, transitionDuration);
    } else {
      transitionComplete();
    }
  }

  _enforceFocus() {
    const onFocusIn = (event: Event) => {
      if (
        event.target &&
        document !== event.target &&
        this._element !== event.target &&
        !this._element.contains(event.target as Node)
      ) {
        this._element.focus();
      }
    };
    off(document, EVENT_FOCUSIN, onFocusIn); // guard against infinite focus loou
    on(document, EVENT_FOCUSIN, onFocusIn);
  }

  _setEscapeEvent() {
    const onEscapeEvent = (event: KeyboardEvent | Event) => {
      if (
        this._config.keyboard &&
        (event as KeyboardEvent).key === ESCAPE_KEY
      ) {
        event.preventDefault();
        this.hide();
      } else if (
        !this._config.keyboard &&
        (event as KeyboardEvent).key === ESCAPE_KEY
      ) {
        this._triggerBackdropTransition();
      }
    };

    if (this._isShown) {
      on(this._element, EVENT_KEYDOWN_DISMISS, onEscapeEvent);
    } else {
      off(this._element, EVENT_KEYDOWN_DISMISS, onEscapeEvent);
    }
  }

  _setResizeEvent() {
    const onResizeEvent = () => this._adjustDialog();
    if (this._isShown) {
      on(window, EVENT_RESIZE, onResizeEvent);
    } else {
      off(window, EVENT_RESIZE, onResizeEvent);
    }
  }

  _hideModal(/*event?: Event*/) {
    this._element.style.display = "none";
    this._element.setAttribute("aria-hidden", "true");
    this._element.removeAttribute("aria-modal");
    this._element.removeAttribute("role");
    this._isTransitioning = false;
    this._showBackdrop(() => {
      document.body.classList.remove(CLASS_NAME_OPEN);
      this._resetAdjustments();
      this._resetScrollbar();
      trigger(this._element, EVENT_HIDDEN);
    });
  }

  _removeBackdrop() {
    this._backdrop?.parentNode?.removeChild(this._backdrop);
    this._backdrop = null;
  }

  _showBackdrop(callback: () => void) {
    const animate = this._element.classList.contains(CLASS_NAME_FADE)
      ? CLASS_NAME_FADE
      : "";

    if (this._isShown && this._config.backdrop) {
      this._backdrop = document.createElement("div");
      this._backdrop.className = CLASS_NAME_BACKDROP;

      if (animate) {
        this._backdrop.classList.add(animate);
      }

      document.body.appendChild(this._backdrop);

      on(this._element, EVENT_CLICK_DISMISS, (event) => {
        if (this._ignoreBackdropClick) {
          this._ignoreBackdropClick = false;
          return;
        }

        if (event.target !== event.currentTarget) {
          return;
        }

        this._triggerBackdropTransition();
      });

      if (animate) {
        reflow(this._backdrop);
      }

      this._backdrop.classList.add(CLASS_NAME_SHOW);

      if (!animate) {
        callback();
        return;
      }

      const backdropTransitionDuration = getTransitionDurationFromElement(
        this._backdrop
      );

      one(this._backdrop, TRANSITION_END, callback);
      emulateTransitionEnd(this._backdrop, backdropTransitionDuration);
    } else if (!this._isShown && this._backdrop) {
      this._backdrop.classList.remove(CLASS_NAME_SHOW);

      const callbackRemove = () => {
        this._removeBackdrop();
        callback();
      };

      if (this._element.classList.contains(CLASS_NAME_FADE)) {
        const backdropTransitionDuration = getTransitionDurationFromElement(
          this._backdrop
        );
        one(this._backdrop, TRANSITION_END, callbackRemove);
        emulateTransitionEnd(this._backdrop, backdropTransitionDuration);
      } else {
        callbackRemove();
      }
    } else {
      callback();
    }
  }

  _triggerBackdropTransition() {
    if (this._config.backdrop === "static") {
      if (!this._dialog) {
        console.error("Dialog element not found!");
        return;
      }

      const hideEvent = trigger(this._element, EVENT_HIDE_PREVENTED);
      if (hideEvent.defaultPrevented) {
        return;
      }

      const isModalOverflowing =
        this._element.scrollHeight > document.documentElement.clientHeight;

      if (!isModalOverflowing) {
        this._element.style.overflowY = "hidden";
      }

      this._element.classList.add(CLASS_NAME_STATIC);

      const modalTransitionDuration = getTransitionDurationFromElement(
        this._dialog
      );

      const onTransitionEnd = () => {
        this._element.classList.remove(CLASS_NAME_STATIC);
        if (!isModalOverflowing) {
          one(this._element, TRANSITION_END, () => {
            this._element.style.overflowY = "";
          });
          emulateTransitionEnd(this._element, modalTransitionDuration);
        }
      };

      off(this._element, TRANSITION_END, onTransitionEnd);
      one(this._element, TRANSITION_END, onTransitionEnd);
      emulateTransitionEnd(this._element, modalTransitionDuration);
      this._element.focus();
    } else {
      this.hide();
    }
  }

  // ----------------------------------------------------------------------
  // the following methods are used to handle overflowing modals
  // ----------------------------------------------------------------------

  _adjustDialog() {
    const isModalOverflowing =
      this._element.scrollHeight > document.documentElement.clientHeight;

    if (!this._isBodyOverflowing && isModalOverflowing) {
      this._element.style.paddingLeft = `${this._scrollbarWidth}px`;
    }

    if (this._isBodyOverflowing && !isModalOverflowing) {
      this._element.style.paddingRight = `${this._scrollbarWidth}px`;
    }
  }

  _resetAdjustments() {
    this._element.style.paddingLeft = "";
    this._element.style.paddingRight = "";
  }

  _checkScrollbar() {
    const rect = document.body.getBoundingClientRect();
    this._isBodyOverflowing =
      Math.round(rect.left + rect.right) < window.innerWidth;
    this._scrollbarWidth = this._getScrollbarWidth();
  }

  _setScrollbar() {
    if (this._isBodyOverflowing) {
      // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
      //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set

      // Adjust fixed content padding
      SelectorEngine.find(SELECTOR_FIXED_CONTENT).forEach((element) => {
        const actualPadding = element.style.paddingRight;
        const calculatedPadding: string =
          window.getComputedStyle(element)["padding-right" as any];
        // Manipulator.setDataAttribute(element, "padding-right", actualPadding);
        element.dataset.paddingRight = actualPadding;
        element.style.paddingRight = `${
          parseFloat(calculatedPadding) + this._scrollbarWidth
        }px`;
      });

      // Adjust sticky content margin
      SelectorEngine.find(SELECTOR_STICKY_CONTENT).forEach((element) => {
        const actualMargin = element.style.marginRight;
        const calculatedMargin =
          window.getComputedStyle(element)["margin-right" as any];
        // Manipulator.setDataAttribute(element, "margin-right", actualMargin);
        element.dataset.marginRight = actualMargin;
        element.style.marginRight = `${
          parseFloat(calculatedMargin) - this._scrollbarWidth
        }px`;
      });

      // Adjust body padding
      const actualPadding = document.body.style.paddingRight;
      const calculatedPadding = window.getComputedStyle(document.body)[
        "padding-right" as any
      ];

      // Manipulator.setDataAttribute(
      //   document.body,
      //   "padding-right",
      //   actualPadding
      // );
      document.body.dataset.paddingRight = actualPadding;
      document.body.style.paddingRight = `${
        parseFloat(calculatedPadding) + this._scrollbarWidth
      }px`;
    }

    document.body.classList.add(CLASS_NAME_OPEN);
  }

  _resetScrollbar() {
    // Restore fixed content padding
    SelectorEngine.find(SELECTOR_FIXED_CONTENT).forEach((element) => {
      // const padding = Manipulator.getDataAttribute(element, "padding-right");
      const padding = element.dataset.paddingRight;
      if (typeof padding !== "undefined") {
        // Manipulator.removeDataAttribute(element, "padding-right");
        delete element.dataset.paddingRight;
        element.style.paddingRight = padding;
      }
    });

    // Restore sticky content and navbar-toggler margin
    SelectorEngine.find(`${SELECTOR_STICKY_CONTENT}`).forEach((element) => {
      // const margin = Manipulator.getDataAttribute(element, "margin-right");
      const margin = element.dataset.marginRight;
      if (typeof margin !== "undefined") {
        // Manipulator.removeDataAttribute(element, "margin-right");
        delete element.dataset.marginRight;
        element.style.marginRight = margin;
      }
    });

    // Restore body padding
    // const padding = Manipulator.getDataAttribute(
    //   document.body,
    //   "padding-right"
    // );
    const padding = document.body.dataset.paddingRight;
    if (typeof padding === "undefined") {
      document.body.style.paddingRight = "";
    } else {
      // Manipulator.removeDataAttribute(document.body, "padding-right");
      delete document.body.dataset.paddingRight;
      document.body.style.paddingRight = padding;
    }
  }

  _getScrollbarWidth() {
    // thx d.walsh
    const scrollDiv = document.createElement("div");
    scrollDiv.className = CLASS_NAME_SCROLLBAR_MEASURER;
    document.body.appendChild(scrollDiv);
    const scrollbarWidth =
      scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  }

  // Static

  static getInstance(element: HTMLElement) {
    return getData(element, DATA_KEY);
  }
}

export default ModalService;
