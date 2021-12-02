/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.3.1): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */
import { TRANSITION_END } from "../constants";
import {
  getTransitionDurationFromElement,
  emulateTransitionEnd,
  reflow,
  getElementFromSelector,
  typeCheckConfig,
  isElement,
} from "../helper/utils";
import { one, trigger } from "../helper/dom/event-handler";
import * as SelectorEngine from "../helper/dom/selector-engine";
import { setData, getData, removeData } from "../helper/dom/data";

export interface Config {
  toggle: boolean;
  parent: string | HTMLElement;
}

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

export const NAME = "collapse";
export const VERSION = "4.3.1";
export const DATA_KEY = "bs.collapse";
export const EVENT_KEY = `.${DATA_KEY}`;

export const Default = {
  toggle: true,
  parent: "",
};

export const DefaultType = {
  toggle: "boolean",
  parent: "(string|element)",
};

export const EVENT_SHOW = `show${EVENT_KEY}`;
export const EVENT_SHOWN = `shown${EVENT_KEY}`;
export const EVENT_HIDE = `hide${EVENT_KEY}`;
export const EVENT_HIDDEN = `hidden${EVENT_KEY}`;

export const CLASS_NAME_SHOW = "show";
export const CLASS_NAME_COLLAPSE = "collapse";
export const CLASS_NAME_COLLAPSING = "collapsing";
export const CLASS_NAME_COLLAPSED = "collapsed";

export const WIDTH = "width";
export const HEIGHT = "height";

export const SELECTOR_ACTIVES = ".show, .collapsing";
// export const SELECTOR_DATA_TOGGLE = '[data-toggle="collapse"]'

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

export class CollapseService {
  _isTransitioning: boolean;
  _element: HTMLElement | null = null;
  _config: any;
  _triggerArray: HTMLElement[] | null = null;
  _selector: string | null = null;
  _parent: HTMLElement | null = null;

  constructor(
    element: HTMLElement,
    triggerList: NodeListOf<HTMLElement> | HTMLElement[],
    config: Partial<Config> = {}
  ) {
    this._isTransitioning = false;
    this._element = element;
    this._config = this._getConfig(config);
    this._triggerArray = Array.from(triggerList);
    // this._triggerArray = Array.from(SelectorEngine.find(
    //   `${SELECTOR_DATA_TOGGLE}[href="#${element.id}"],` +
    //   `${SELECTOR_DATA_TOGGLE}[data-target="#${element.id}"]`
    // )) as HTMLElement[];

    // const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE) as NodeListOf<HTMLElement>;

    // for (let i = 0, len = toggleList.length; i < len; i++) {
    //   const elem = toggleList[i]
    //   const selector = getSelectorFromElement(elem)
    //   const filterElement = !selector ? [] : Array.from(SelectorEngine.find(selector))
    //     .filter(foundElem => foundElem === element)

    //   if (selector !== null && filterElement.length) {
    //     this._selector = selector
    //     // this._triggerArray.push(elem)
    //   }
    // }

    this._parent = this._config.parent ? this._getParent() : null;

    if (!this._config.parent) {
      this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      // this._addAriaAndCollapsedClass(this._element, [])
    }

    if (this._config.toggle) {
      this.toggle();
    }

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

  public isExpanded() {
    return !!this._element?.classList.contains(CLASS_NAME_SHOW);
  }

  public isCollapsed() {
    return !this.isExpanded();
  }

  toggle() {
    if (this.isExpanded()) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    if (!this._element) {
      console.warn("this._element not set!");
      return;
    }

    if (
      this._isTransitioning ||
      this._element.classList.contains(CLASS_NAME_SHOW)
    ) {
      return;
    }

    let actives: HTMLElement[] | null = null;
    let activesData: any;

    if (this._parent) {
      actives = Array.from(
        SelectorEngine.find(SELECTOR_ACTIVES, this._parent)
      ).filter((elem) => {
        if (typeof this._config.parent === "string") {
          return elem.getAttribute("data-parent") === this._config.parent;
        }

        return elem.classList.contains(CLASS_NAME_COLLAPSE);
      }) as HTMLElement[];

      if (actives.length === 0) {
        actives = null;
      }
    }

    const container = this._selector
      ? SelectorEngine.findOne(this._selector)
      : null;
    if (actives) {
      const tempActiveData = actives.filter((elem) => container !== elem);
      activesData = tempActiveData[0]
        ? getData(tempActiveData[0], DATA_KEY)
        : null;

      if (activesData && activesData._isTransitioning) {
        return;
      }
    }

    const startEvent = trigger(this._element, EVENT_SHOW);
    if (startEvent.defaultPrevented) {
      return;
    }

    if (actives) {
      actives.forEach((elemActive) => {
        if (container !== elemActive) {
          CollapseService.collapseInterface(elemActive, "hide");
        }

        if (!activesData) {
          setData(elemActive, DATA_KEY, null);
        }
      });
    }

    const dimension = this._getDimension();

    this._element.classList.remove(CLASS_NAME_COLLAPSE);
    this._element.classList.add(CLASS_NAME_COLLAPSING);

    this._element.style[dimension] = "0";

    if (this._triggerArray?.length) {
      this._triggerArray.forEach((element) => {
        element.classList.remove(CLASS_NAME_COLLAPSED);
        element.setAttribute("aria-expanded", "true");
      });
    }

    this.setTransitioning(true);

    const complete = () => {
      if (!this._element) {
        console.warn("this._element not set!");
        return;
      }

      this._element.classList.remove(CLASS_NAME_COLLAPSING);
      this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);

      this._element.style[dimension] = "";

      this.setTransitioning(false);

      trigger(this._element, EVENT_SHOWN);
    };

    const capitalizedDimension =
      dimension[0].toUpperCase() + dimension.slice(1);
    const scrollSize = `scroll${capitalizedDimension}` as
      | "scrollWidth"
      | "scrollHeight";
    const transitionDuration = getTransitionDurationFromElement(this._element);

    one(this._element, TRANSITION_END, complete);

    emulateTransitionEnd(this._element, transitionDuration);
    this._element.style[dimension] = `${this._element[scrollSize]}px`;

    if (!this._config.parent && this._triggerArray) {
      this._addAriaAndCollapsedClass(this._element, this._triggerArray, true);
      // this._addAriaAndCollapsedClass(this._element, [])
    }
  }

  hide() {
    if (!this._element) {
      console.warn("this._element not set!");
      return;
    }

    if (
      this._isTransitioning ||
      !this._element.classList.contains(CLASS_NAME_SHOW)
    ) {
      return;
    }

    const startEvent = trigger(this._element, EVENT_HIDE);
    if (startEvent.defaultPrevented) {
      return;
    }

    const dimension = this._getDimension();

    this._element.style[dimension] = `${
      this._element.getBoundingClientRect()[dimension]
    }px`;

    reflow(this._element);

    this._element.classList.add(CLASS_NAME_COLLAPSING);
    this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);

    const triggerArrayLength = this._triggerArray?.length;
    if (triggerArrayLength && this._triggerArray && triggerArrayLength > 0) {
      for (let i = 0; i < triggerArrayLength; i++) {
        const trigger = this._triggerArray[i];
        const elem = getElementFromSelector(trigger);

        if (elem && !elem.classList.contains(CLASS_NAME_SHOW)) {
          trigger.classList.add(CLASS_NAME_COLLAPSED);
          trigger.setAttribute("aria-expanded", "false");
        }
      }
    }

    this.setTransitioning(true);

    const complete = () => {
      this.setTransitioning(false);
      if (!this._element) {
        console.warn("this._element not set!");
        return;
      }
      this._element.classList.remove(CLASS_NAME_COLLAPSING);
      this._element.classList.add(CLASS_NAME_COLLAPSE);
      trigger(this._element, EVENT_HIDDEN);
    };

    this._element.style[dimension] = "";
    const transitionDuration = getTransitionDurationFromElement(this._element);

    one(this._element, TRANSITION_END, complete);
    emulateTransitionEnd(this._element, transitionDuration);

    if (!this._config.parent && this._triggerArray) {
      this._addAriaAndCollapsedClass(this._element, this._triggerArray, false);
      // this._addAriaAndCollapsedClass(this._element, [])
    }
  }

  setTransitioning(isTransitioning: boolean) {
    this._isTransitioning = isTransitioning;
  }

  dispose() {
    if (this._element) {
      removeData(this._element, DATA_KEY);
    }

    this._config = null;
    this._parent = null;
    this._element = null;
    // this._triggerArray = null
    this._isTransitioning = false;
  }

  // Private

  _getConfig(config: Partial<Config>): Config {
    config = {
      ...Default,
      ...config,
    };
    config.toggle = Boolean(config.toggle); // Coerce string values
    typeCheckConfig(NAME, config, DefaultType);
    return config as Config;
  }

  _getDimension() {
    const hasWidth = this._element
      ? this._element.classList.contains(WIDTH)
      : false;
    return hasWidth ? WIDTH : HEIGHT;
  }

  _getParent() {
    let { parent } = this._config;

    if (isElement(parent)) {
      // it's a jQuery object
      if (
        typeof parent.jquery !== "undefined" ||
        typeof parent[0] !== "undefined"
      ) {
        parent = parent[0];
      }
    } else {
      parent = SelectorEngine.findOne(parent);
    }

    // const selector = `${SELECTOR_DATA_TOGGLE}[data-parent="${parent}"]`
    const selector = `[data-parent="${parent}"]`;

    SelectorEngine.find(selector, parent).forEach((element) => {
      const selected = getElementFromSelector(element);

      if (selected) {
        this._addAriaAndCollapsedClass(selected, [element]);
      } else {
        console.warn();
      }
    });

    return parent;
  }

  _addAriaAndCollapsedClass(
    element: HTMLElement,
    triggerArray: HTMLElement[],
    isOpen?: boolean
  ) {
    if (element) {
      if (typeof isOpen !== "boolean") {
        isOpen = element.classList.contains(CLASS_NAME_SHOW);
      }

      if (triggerArray.length) {
        triggerArray.forEach((elem) => {
          if (isOpen) {
            elem.classList.remove(CLASS_NAME_COLLAPSED);
          } else {
            elem.classList.add(CLASS_NAME_COLLAPSED);
          }

          elem.setAttribute("aria-expanded", (!!isOpen).toString());
        });
      }
    }
  }

  // Static

  static collapseInterface(element: HTMLElement, config: string) {
    let data = getData(element, DATA_KEY);
    const _config: Config = {
      ...Default,
      ...element.dataset,
      ...(typeof config === "object" && config ? config : {}),
    };

    if (!data && _config.toggle && /show|hide/.test(config)) {
      _config.toggle = false;
    }

    if (!data) {
      data = new CollapseService(element, [], _config);
    }

    if (typeof config === "string") {
      if (typeof data[config] === "undefined") {
        throw new TypeError(`No method named "${config}"`);
      }

      data[config]();
    }
  }

  static getInstance(element: HTMLElement) {
    return getData(element, DATA_KEY);
  }
}
