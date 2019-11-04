import Popper from 'popper.js'; // /dist/umd/popper
import { JQuery as $ } from '@ribajs/jquery';

import { Utils } from './utils.service';
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.1.3): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * @see https://raw.githubusercontent.com/twbs/bootstrap/v4-dev/js/src/dropdown.js
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

export const NAME                     = 'dropdown';
export const VERSION                  = '4.1.3';
export const DATA_KEY                 = 'bs.dropdown';
export const EVENT_KEY                = `.${DATA_KEY}`;
export const DATA_API_KEY             = '.data-api';
export const ESCAPE_KEYCODE           = 27; // KeyboardEvent.which value for Escape (Esc) key
export const SPACE_KEYCODE            = 32; // KeyboardEvent.which value for space key
export const TAB_KEYCODE              = 9; // KeyboardEvent.which value for tab key
export const ARROW_UP_KEYCODE         = 38; // KeyboardEvent.which value for up arrow key
export const ARROW_DOWN_KEYCODE       = 40; // KeyboardEvent.which value for down arrow key
export const RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)
export const REGEXP_KEYDOWN           = new RegExp(`${ARROW_UP_KEYCODE}|${ARROW_DOWN_KEYCODE}|${ESCAPE_KEYCODE}`);

export const EVENT = {
  HIDE             : `hide${EVENT_KEY}`,
  HIDDEN           : `hidden${EVENT_KEY}`,
  SHOW             : `show${EVENT_KEY}`,
  SHOWN            : `shown${EVENT_KEY}`,
  CLICK            : `click${EVENT_KEY}`,
  CLICK_DATA_API   : `click${EVENT_KEY}${DATA_API_KEY}`,
  KEYDOWN_DATA_API : `keydown${EVENT_KEY}${DATA_API_KEY}`,
  KEYUP_DATA_API   : `keyup${EVENT_KEY}${DATA_API_KEY}`,
};

export const CLASSNAME = {
  DISABLED  : 'disabled',
  SHOW      : 'show',
  DROPUP    : 'dropup',
  DROPRIGHT : 'dropright',
  DROPLEFT  : 'dropleft',
  MENURIGHT : 'dropdown-menu-right',
  MENULEFT  : 'dropdown-menu-left',
  POSITION_STATIC : 'position-static',
};

export const SELECTOR = {
  DATA_TOGGLE   : 'bs4-dropdown .dropdown-toggle',
  FORM_CHILD    : '.dropdown form',
  MENU          : '.dropdown-menu',
  NAVBAR_NAV    : '.navbar-nav',
  VISIBLE_ITEMS : '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)',
};

export const ATTACHMENTMAP = {
  TOP       : 'top-start',
  TOPEND    : 'top-end',
  BOTTOM    : 'bottom-start',
  BOTTOMEND : 'bottom-end',
  RIGHT     : 'right-start',
  RIGHTEND  : 'right-end',
  LEFT      : 'left-start',
  LEFTEND   : 'left-end',
};

export const DEFAULT = {
  offset      : 0,
  flip        : true,
  boundary    : 'scrollParent',
  reference   : 'toggle',
  display     : 'dynamic',
};

export const DEFAULTTYPE = {
  offset      : '(number|string|function)',
  flip        : 'boolean',
  boundary    : '(string|element)',
  reference   : '(string|element)',
  display     : 'string',
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
    const $menus = $('.dropdown-menu.show');
    $menus.each((index, menu) => {
      const $menu = $(menu);
      const $dropdown = $menu.closest('dropdown-menu.show');
      this.close($menu[0], $menu, $dropdown);
    });
  }

  public static close(triggerCloseElement: Element, $menu: JQuery<Element>, $dropdown?: JQuery<Element>) {
    const relatedTarget = {
      relatedTarget: triggerCloseElement,
    };

    const $parent = DropdownService._getParentFromElement(triggerCloseElement);

    if ($menu && $menu.hasClass(CLASSNAME.SHOW)) {
      $menu.removeClass(CLASSNAME.SHOW);
    }

    if ($dropdown && $dropdown.hasClass(CLASSNAME.SHOW)) {
      $dropdown.removeClass(CLASSNAME.SHOW)
      .removeClass(CLASSNAME.SHOW)
      .trigger($.Event(EVENT.HIDDEN, relatedTarget));
    }

    if ($parent.hasClass(CLASSNAME.SHOW)) {
      $parent
      .removeClass(CLASSNAME.SHOW)
      .trigger($.Event(EVENT.HIDDEN, relatedTarget));
    }
  }

  public static _clearMenus(event?: JQuery.Event) {
    if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH ||
      event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
      return;
    }

    const toggles = [].slice.call($(SELECTOR.DATA_TOGGLE).get()) as Element[];

    $(SELECTOR.DATA_TOGGLE).each((i, element) => {
    // for (let i = 0, len = toggles.length; i < len; i++) {
      const parent = DropdownService._getParentFromElement(element);
      const context = $(toggles[i]).data(DATA_KEY);
      // console.warn('_clearMenus parent', parent, context);
      const relatedTarget: any = {
        relatedTarget: toggles[i],
      };

      if (event && event.type === 'click') {
        relatedTarget.clickEvent = event;
      }

      if (!context) {
        // continue;
        return;
      }

      const dropdownMenu = parent.find(SELECTOR.MENU);
      if (!$(parent).hasClass(CLASSNAME.SHOW)) {
        // continue;
        return;
      }

      if (event && (event.type === 'click' &&
          /input|textarea/i.test(((event as unknown as Event).target as Element).tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) &&
          $.contains(parent.get(0), (event as unknown as Event).target as Element)) {
        // continue;
        return;
      }

      const hideEvent = $.Event(EVENT.HIDE, relatedTarget);
      $(parent).trigger(hideEvent);
      if (hideEvent.isDefaultPrevented()) {
        // continue;
        return;
      }

      // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support
      if (document.documentElement && 'ontouchstart' in document.documentElement) {
        $(document.body).children().off('mouseover', 'null', $.noop);
      }

      toggles[i].setAttribute('aria-expanded', 'false');

      dropdownMenu.removeClass(CLASSNAME.SHOW);
      parent
        .removeClass(CLASSNAME.SHOW)
        .trigger($.Event(EVENT.HIDDEN, relatedTarget));
    });
  }

  public static _getParentFromElement(element: Element) {
    return $(element).parent();
    // let parent;
    // const selector = Utils.getSelectorFromElement(element);

    // if (selector) {
    //   parent = document.querySelector(selector);
    // }

    // return parent || element.parentNode;
  }

  private _element: HTMLButtonElement | HTMLAnchorElement;
  private _popper: any /* Popper */ | null; // TODO Popper namcespace error
  private _config: any; // TODO
  private _menu: Element;
  private _inNavbar: boolean;

  constructor(element: HTMLButtonElement | HTMLAnchorElement, config?: any) {
    this._element  = element;
    this._popper   = null;
    this._config   = this._getConfig(config);
    this._menu     = this._getMenuElement();
    this._inNavbar = this._detectNavbar();

    $(this._element).data(DATA_KEY, this._config);

    this.clouseOnClickOutsite(DropdownService._getParentFromElement(this._element));
  }

  // Public

  public close() {
    return DropdownService.close(this._element, $(this._menu));
  }

  public show() {
    const relatedTarget = {
      relatedTarget: this._element,
    };

    const $parent = DropdownService._getParentFromElement(this._element);

    if (!$(this._menu).hasClass(CLASSNAME.SHOW)) {
      $(this._menu).addClass(CLASSNAME.SHOW);
    }

    if (!$parent.hasClass(CLASSNAME.SHOW)) {
      $parent
      .addClass(CLASSNAME.SHOW)
      .trigger($.Event(EVENT.SHOWN, relatedTarget));
    }
  }

  public toggle() {
    if ((this._element as HTMLButtonElement).disabled || $(this._element).hasClass(CLASSNAME.DISABLED)) {
      return;
    }

    const parent   = DropdownService._getParentFromElement(this._element);
    const isActive = $(this._menu).hasClass(CLASSNAME.SHOW);

    DropdownService._clearMenus();

    if (isActive) {
      this.close();
      return;
    }

    const relatedTarget = {
      relatedTarget: this._element,
    };
    const showEvent = $.Event(EVENT.SHOW, relatedTarget);

    $(parent).trigger(showEvent);

    if (showEvent.isDefaultPrevented()) {
      return;
    }

    this.clouseOnClickOutsite(DropdownService._getParentFromElement(this._element));

    // Disable totally Popper.js for Dropdown in Navbar
    if (!this._inNavbar) {
      /**
       * Check for Popper dependency
       * Popper - https://popper.js.org
       */
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap dropdown require Popper.js (https://popper.js.org)');
      }

      let referenceElement = this._element as HTMLElement;

      if (this._config.reference === 'parent') {
        referenceElement = parent.get(0) as HTMLElement;
      } else if (Utils.isElement(this._config.reference)) {
        referenceElement = this._config.reference;

        // Check if it's jQuery element
        if (typeof this._config.reference.jquery !== 'undefined') {
          referenceElement = this._config.reference[0];
        }
      }

      // If boundary is not `scrollParent`, then set position to `static`
      // to allow the menu to "escape" the scroll parent's boundaries
      // https://github.com/twbs/bootstrap/issues/24251
      if (this._config.boundary !== 'scrollParent') {
        $(parent).addClass(CLASSNAME.POSITION_STATIC);
      }
      this._popper = new Popper(referenceElement, this._menu as HTMLElement, this._getPopperConfig());
    }

    // If this is a touch-enabled device we add extra
    // empty mouseover listeners to the body's immediate children;
    // only needed because of broken event delegation on iOS
    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
    if (document.documentElement && 'ontouchstart' in document.documentElement &&
        $(parent).closest(SELECTOR.NAVBAR_NAV).length === 0) {
      $(document.body).children().on('mouseover', null, $.noop);
    }

    this.clouseOnClickOutsite(DropdownService._getParentFromElement(this._element));

    this._element.focus();
    this._element.setAttribute('aria-expanded', 'true');

    $(this._menu).toggleClass(CLASSNAME.SHOW);
    $(parent)
      .toggleClass(CLASSNAME.SHOW)
      .trigger($.Event(EVENT.SHOWN, relatedTarget));
  }

  public dispose() {
    $.removeData(this._element, DATA_KEY);
    $(this._element).off(EVENT_KEY);
    delete this._element; // = null;
    delete this._menu; // = null;
    if (this._popper !== null) {
      this._popper.destroy();
      this._popper = null;
    }
  }

  public update() {
    this._inNavbar = this._detectNavbar();
    if (this._popper !== null) {
      this._popper.scheduleUpdate();
    }
  }

  // Private

  /**
   * @see https://stackoverflow.com/questions/152975/how-do-i-detect-a-click-outside-an-element
   * @param selector
   */
  private clouseOnClickOutsite($element: JQuery<Element>) {
    const outsideClickListener = (event: Event) => {
      if (!$(event.target as any).closest($element.get(0)).length) {
        this.close();
        removeClickListener();
      }
    };

    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
    };

    document.addEventListener('click', outsideClickListener);
  }

  private _getConfig(config?: any) {
    config = {
      ...DropdownService.Default,
      ...$(this._element).data(),
      ...config,
    };

    Utils.typeCheckConfig(
      NAME,
      config,
      DropdownService.DefaultType,
    );

    return config;
  }

  private _getMenuElement() {
    if (!this._menu) {
      const parent = DropdownService._getParentFromElement(this._element);
      if (parent) {
        this._menu = parent.find(SELECTOR.MENU).get(0);
      }
    }
    return this._menu;
  }

  private _getPlacement() {
    const $parentDropdown = $(this._element.parentNode as any);
    let placement = ATTACHMENTMAP.BOTTOM;

    // Handle dropup
    if ($parentDropdown.hasClass(CLASSNAME.DROPUP)) {
      placement = ATTACHMENTMAP.TOP;
      if ($(this._menu).hasClass(CLASSNAME.MENURIGHT)) {
        placement = ATTACHMENTMAP.TOPEND;
      }
    } else if ($parentDropdown.hasClass(CLASSNAME.DROPRIGHT)) {
      placement = ATTACHMENTMAP.RIGHT;
    } else if ($parentDropdown.hasClass(CLASSNAME.DROPLEFT)) {
      placement = ATTACHMENTMAP.LEFT;
    } else if ($(this._menu).hasClass(CLASSNAME.MENURIGHT)) {
      placement = ATTACHMENTMAP.BOTTOMEND;
    }
    return placement;
  }

  private _detectNavbar() {
    return $(this._element).closest('.navbar').length > 0;
  }

  private _getPopperConfig() {
    const offsetConf: any = {};
    if (typeof this._config.offset === 'function') {
      offsetConf.fn = (data: any) => {
        data.offsets = {
          ...data.offsets,
          ...this._config.offset(data.offsets) || {},
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
    if (this._config.display === 'static') {
      popperConfig.modifiers.applyStyle = {
        enabled: false,
      };
    }
    return popperConfig;
  }

}
