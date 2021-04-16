// Fork of https://github.com/twbs/bootstrap/blob/main/js/src/toast.js

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0-alpha1): toast.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
import { TRANSITION_END } from "../constants";
import {
  reflow,
  getTransitionDurationFromElement,
  emulateTransitionEnd,
  typeCheckConfig,
} from "../helper/utils";
import { setData, getData, removeData } from "../helper/dom/data";
import { on, one, trigger } from "../helper/dom/event-handler";

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = "toast";
const VERSION = "5.0.0-alpha1-riba";
const DATA_KEY = "bs.toast";
const EVENT_KEY = `.${DATA_KEY}`;

export const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
export const EVENT_HIDE = `hide${EVENT_KEY}`;
export const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
export const EVENT_SHOW = `show${EVENT_KEY}`;
export const EVENT_SHOWN = `shown${EVENT_KEY}`;

export const CLASS_NAME_FADE = "fade";
export const CLASS_NAME_HIDE = "hide";
export const CLASS_NAME_SHOW = "show";
export const CLASS_NAME_SHOWING = "showing";

export interface Config {
  animation?: boolean;
  autohide?: boolean;
  delay?: number;
}

export const DefaultType = {
  animation: "boolean",
  autohide: "boolean",
  delay: "number",
};

export const Default = {
  animation: true,
  autohide: true,
  delay: 2000,
};

// const SELECTOR_DATA_DISMISS = '[data-dismiss="toast"]';

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

export class ToastService {
  protected _element: HTMLElement;
  protected _config: Config = {};
  protected _timeout: number | null = null;

  constructor(element: HTMLElement, config: Config) {
    this._element = element;
    this._config = this._getConfig(config);
    this._timeout = null;
    this._setListeners();
    setData(element, DATA_KEY, this);
  }

  // Getters

  static get VERSION() {
    return VERSION;
  }

  static get DefaultType() {
    return DefaultType;
  }

  static get Default() {
    return Default;
  }

  // Public

  public show() {
    const showEvent = trigger(this._element, EVENT_SHOW);

    if (showEvent.defaultPrevented) {
      return;
    }

    if (this._config.animation) {
      this._element.classList.add(CLASS_NAME_FADE);
    }

    const complete = () => {
      if (!this._element) {
        return;
      }
      this._element.classList.remove(CLASS_NAME_SHOWING);
      this._element.classList.add(CLASS_NAME_SHOW);

      trigger(this._element, EVENT_SHOWN);

      if (this._config.autohide) {
        this._timeout = Number(
          setTimeout(() => {
            this.hide();
          }, this._config.delay)
        );
      }
    };

    this._element.classList.remove(CLASS_NAME_HIDE);
    reflow(this._element);
    this._element.classList.add(CLASS_NAME_SHOWING);
    if (this._config.animation) {
      const transitionDuration = getTransitionDurationFromElement(
        this._element
      );

      one(this._element, TRANSITION_END, complete);
      emulateTransitionEnd(this._element, transitionDuration);
    } else {
      complete();
    }
  }

  public hide() {
    if (!this._element.classList.contains(CLASS_NAME_SHOW)) {
      return;
    }

    const hideEvent = trigger(this._element, EVENT_HIDE);

    if (hideEvent.defaultPrevented) {
      return;
    }

    const complete = () => {
      if (!this._element) {
        return;
      }
      this._element.classList.add(CLASS_NAME_HIDE);
      trigger(this._element, EVENT_HIDDEN);
    };

    this._element.classList.remove(CLASS_NAME_SHOW);
    if (this._config.animation) {
      const transitionDuration = getTransitionDurationFromElement(
        this._element
      );

      one(this._element, TRANSITION_END, complete);
      emulateTransitionEnd(this._element, transitionDuration);
    } else {
      complete();
    }
  }

  public dispose() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this._timeout = null;

    if (this._element.classList.contains(CLASS_NAME_SHOW)) {
      this._element.classList.remove(CLASS_NAME_SHOW);
    }

    // off(this._element, EVENT_CLICK_DISMISS);
    removeData(this._element, DATA_KEY);

    // this._element = null;
    // this._config = null;
  }

  // Private

  protected _getConfig(config: Config): Config {
    config = {
      ...Default,
      ...(this._element?.dataset || {}),
      ...(typeof config === "object" && config ? config : {}),
    };

    typeCheckConfig(NAME, config, ToastService.DefaultType);

    return config;
  }

  protected _setListeners() {
    if (!this._element) {
      return;
    }
    on(
      this._element,
      EVENT_CLICK_DISMISS,
      // SELECTOR_DATA_DISMISS,
      () => {
        // const SELECTOR_DATA_DISMISS = '[data-dismiss="toast"]';
        if (this._element?.dataset.dismiss === "toast") {
          this.hide();
        }
      }
    );
  }

  // Static

  static getInstance(element: HTMLElement) {
    return getData(element, DATA_KEY);
  }
}

export default ToastService;
