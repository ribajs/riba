import Popper from "popper.js"; // /dist/umd/popper
import { isElement, typeCheckConfig } from "./utils";
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.1.3): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * @see https://github.com/twbs/bootstrap/blob/main/js/src/dropdown.js
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

export const NAME = "dropdown";
export const VERSION = "4.1.3";
export const DATA_KEY = "bs.dropdown";
export const EVENT_KEY = `.${DATA_KEY}`;
export const DATA_API_KEY = ".data-api";
export const ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
export const SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key
export const TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key
export const ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
export const ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
export const RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)
export const REGEXP_KEYDOWN = new RegExp(
  `${ARROW_UP_KEYCODE}|${ARROW_DOWN_KEYCODE}|${ESCAPE_KEYCODE}`
);

export const EVENT = {
  HIDE: `hide${EVENT_KEY}`,
  HIDDEN: `hidden${EVENT_KEY}`,
  SHOW: `show${EVENT_KEY}`,
  SHOWN: `shown${EVENT_KEY}`,
  CLICK: `click${EVENT_KEY}`,
  CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`,
  KEYDOWN_DATA_API: `keydown${EVENT_KEY}${DATA_API_KEY}`,
  KEYUP_DATA_API: `keyup${EVENT_KEY}${DATA_API_KEY}`,
};

export const CLASSNAME = {
  DISABLED: "disabled",
  SHOW: "show",
  DROPUP: "dropup",
  DROPRIGHT: "dropright",
  DROPLEFT: "dropleft",
  MENURIGHT: "dropdown-menu-right",
  MENULEFT: "dropdown-menu-left",
  POSITION_STATIC: "position-static",
};

export const SELECTOR = {
  DATA_TOGGLE: ".dropdown-toggle",
  FORM_CHILD: ".dropdown form",
  MENU: ".dropdown-menu",
  NAVBAR_NAV: ".navbar-nav",
  VISIBLE_ITEMS: ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
};

export const ATTACHMENTMAP = {
  TOP: "top-start",
  TOPEND: "top-end",
  BOTTOM: "bottom-start",
  BOTTOMEND: "bottom-end",
  RIGHT: "right-start",
  RIGHTEND: "right-end",
  LEFT: "left-start",
  LEFTEND: "left-end",
};

export const DEFAULT = {
  offset: 0,
  flip: true,
  boundary: "scrollParent",
  reference: "toggle",
  display: "dynamic",
};

export const DEFAULTTYPE = {
  offset: "(number|string|function)",
  flip: "boolean",
  boundary: "(string|element)",
  reference: "(string|element)",
  display: "string",
};

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */
export class DropdownService {
  // Getters

  static get VERSION() {
    return VERSION;
  }

  static get Default() {
    return DEFAULT;
  }

  static get DefaultType() {
    return DEFAULTTYPE;
  }

  // Static

  public static closeAll() {
    const buttons = document.querySelectorAll(SELECTOR.DATA_TOGGLE);
    buttons.forEach((button) => {
      if (button.parentElement) {
        const menu =
          button.parentElement.querySelector(
            SELECTOR.MENU + "." + CLASSNAME.SHOW
          ) || undefined;
        if (menu) {
          return this.close(button, menu, button);
        }
      }
      this.close(button, button);
    });
  }

  public static close(
    triggerCloseElement: Element,
    menu: Element,
    dropdown?: Element
  ) {
    const relatedTarget = {
      relatedTarget: triggerCloseElement,
    };

    if (menu && menu.classList.contains(CLASSNAME.SHOW)) {
      menu.classList.remove(CLASSNAME.SHOW);
    }

    if (dropdown && dropdown.classList.contains(CLASSNAME.SHOW)) {
      dropdown.classList.remove(CLASSNAME.SHOW);
      dropdown.dispatchEvent(
        new CustomEvent(EVENT.HIDDEN, { detail: relatedTarget })
      );
    }

    const parent = triggerCloseElement.parentElement;

    if (parent && parent.classList.contains(CLASSNAME.SHOW)) {
      parent.classList.remove(CLASSNAME.SHOW);
      parent.dispatchEvent(
        new CustomEvent(EVENT.HIDDEN, { detail: relatedTarget })
      );
    }
  }

  public static _clearMenus() {
    return this.closeAll();
  }

  private _element: HTMLButtonElement | HTMLAnchorElement;
  private _popper: any | /* Popper */ null; // TODO Popper namcespace error
  private _config: any; // TODO
  private _menu: Element;
  private _inNavbar: boolean;

  constructor(elements: HTMLButtonElement | HTMLAnchorElement, config?: any) {
    this._element = elements;
    this._popper = null;
    this._config = this._getConfig(config);
    this._menu = this._getMenuElement();
    this._inNavbar = this._detectNavbar();
    this.outsideClickListener = this.outsideClickListener.bind(this);
    this.closeOnClickOutside();
  }

  // Public

  public close() {
    return DropdownService.close(this._element, this._menu);
  }

  public show() {
    const relatedTarget = {
      relatedTarget: this._element,
    };

    const parent = this._element.parentElement;

    if (!this._menu.classList.contains(CLASSNAME.SHOW)) {
      this._menu.classList.add(CLASSNAME.SHOW);
    }

    if (parent && !parent.classList.contains(CLASSNAME.SHOW)) {
      parent.classList.add(CLASSNAME.SHOW);
      parent.dispatchEvent(
        new CustomEvent(EVENT.SHOWN, { detail: relatedTarget })
      );
    }
  }

  public toggle() {
    if (
      (this._element as HTMLButtonElement).disabled ||
      this._element.classList.contains(CLASSNAME.DISABLED)
    ) {
      return;
    }

    const parent = this._element.parentElement;
    const isActive = this._menu.classList.contains(CLASSNAME.SHOW);

    DropdownService._clearMenus();

    if (isActive) {
      this.close();
      return;
    }

    const relatedTarget = {
      relatedTarget: this._element,
    };
    const showEvent = new CustomEvent(EVENT.SHOW, { detail: relatedTarget });

    if (parent) {
      parent.dispatchEvent(showEvent);
      if (showEvent.defaultPrevented) {
        return;
      }
    }

    // Disable totally Popper.js for Dropdown in Navbar
    if (!this._inNavbar) {
      /**
       * Check for Popper dependency
       * Popper - https://popper.js.org
       */
      if (typeof Popper === "undefined") {
        throw new TypeError(
          "Bootstrap dropdown require Popper.js (https://popper.js.org)"
        );
      }

      let referenceElement = this._element as HTMLElement;

      if (this._config.reference === "parent") {
        referenceElement = parent as HTMLElement;
      } else if (isElement(this._config.reference)) {
        referenceElement = this._config.reference;

        // Check if it's jQuery element
        if (typeof this._config.reference.jquery !== "undefined") {
          referenceElement = this._config.reference[0];
        }
      }

      // If boundary is not `scrollParent`, then set position to `static`
      // to allow the menu to "escape" the scroll parent's boundaries
      // https://github.com/twbs/bootstrap/issues/24251
      if (parent && this._config.boundary !== "scrollParent") {
        parent.classList.add(CLASSNAME.POSITION_STATIC);
      }
      this._popper = new Popper(
        referenceElement,
        this._menu as HTMLElement,
        this._getPopperConfig()
      );
    }

    this._element.focus();
    this._element.setAttribute("aria-expanded", "true");

    if (this._menu.classList.contains(CLASSNAME.SHOW)) {
      this._menu.classList.remove(CLASSNAME.SHOW);
    } else {
      this._menu.classList.add(CLASSNAME.SHOW);
    }
    this._menu.dispatchEvent(
      new CustomEvent(EVENT.SHOWN, { detail: relatedTarget })
    );
  }

  public dispose() {
    this._element.removeAttribute("data-" + DATA_KEY);
    // delete this._element;
    // delete this._menu;
    if (this._popper !== null) {
      this._popper.destroy();
      this._popper = null;
    }
    document.removeEventListener("click", this.outsideClickListener);
  }

  public update() {
    this._inNavbar = this._detectNavbar();
    if (this._popper !== null) {
      this._popper.scheduleUpdate();
    }
  }

  // Private

  private outsideClickListener(event: Event) {
    const target = event.target || event.srcElement || event.currentTarget;
    const parent = this._element.parentElement as Element;
    if (target && !parent.contains(target as Node)) {
      this.close();
      document.removeEventListener("click", this.outsideClickListener);
    }
  }

  /**
   * @see https://stackoverflow.com/questions/152975/how-do-i-detect-a-click-outside-an-element
   * @param selector
   */
  private closeOnClickOutside() {
    if (this._element.parentElement) {
      document.addEventListener("click", this.outsideClickListener);
    }
  }

  private _getConfig(config?: any) {
    config = {
      ...DropdownService.Default,
      ...this._element.dataset,
      ...config,
    };

    typeCheckConfig(NAME, config, DropdownService.DefaultType);

    return config;
  }

  private _getMenuElement() {
    if (!this._menu) {
      const parent = this._element.parentElement;
      if (parent) {
        const menu = parent.querySelector(SELECTOR.MENU);
        if (!menu) {
          throw new Error("Menu not found!");
        }
        this._menu = menu;
      }
    }
    return this._menu;
  }

  private _getPlacement() {
    const parentDropdown = this._element.parentElement;
    let placement = ATTACHMENTMAP.BOTTOM;

    if (!parentDropdown) {
      throw new Error("Parent of element not found!");
    }

    // Handle dropup
    if (parentDropdown.classList.contains(CLASSNAME.DROPUP)) {
      placement = ATTACHMENTMAP.TOP;
      if (this._menu.classList.contains(CLASSNAME.MENURIGHT)) {
        placement = ATTACHMENTMAP.TOPEND;
      }
    } else if (parentDropdown.classList.contains(CLASSNAME.DROPRIGHT)) {
      placement = ATTACHMENTMAP.RIGHT;
    } else if (parentDropdown.classList.contains(CLASSNAME.DROPLEFT)) {
      placement = ATTACHMENTMAP.LEFT;
    } else if (this._menu.classList.contains(CLASSNAME.MENURIGHT)) {
      placement = ATTACHMENTMAP.BOTTOMEND;
    }
    return placement;
  }

  private _detectNavbar() {
    return this._element.closest && this._element.closest(".navbar") !== null;
  }

  private _getPopperConfig() {
    const offsetConf: any = {};
    if (typeof this._config.offset === "function") {
      offsetConf.fn = (data: any) => {
        data.offsets = {
          ...data.offsets,
          ...(this._config.offset(data.offsets) || {}),
        };
        return data;
      };
    } else {
      offsetConf.offset = this._config.offset;
    }

    const popperConfig = {
      placement: this._getPlacement() as any,
      modifiers: {
        offset: offsetConf,
        flip: {
          enabled: this._config.flip,
        },
        preventOverflow: {
          boundariesElement: this._config.boundary,
        },
      } as any,
    };

    // Disable Popper.js if we have a static display
    if (this._config.display === "static") {
      popperConfig.modifiers.applyStyle = {
        enabled: false,
      };
    }
    return popperConfig;
  }
}
