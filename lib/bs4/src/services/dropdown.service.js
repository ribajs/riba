"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const popper_js_1 = __importDefault(require("popper.js")); // /dist/umd/popper
const core_1 = require("@ribajs/core");
const utils_service_1 = require("./utils.service");
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
exports.NAME = 'dropdown';
exports.VERSION = '4.1.3';
exports.DATA_KEY = 'bs.dropdown';
exports.EVENT_KEY = `.${exports.DATA_KEY}`;
exports.DATA_API_KEY = '.data-api';
exports.ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
exports.SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key
exports.TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key
exports.ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
exports.ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
exports.RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)
exports.REGEXP_KEYDOWN = new RegExp(`${exports.ARROW_UP_KEYCODE}|${exports.ARROW_DOWN_KEYCODE}|${exports.ESCAPE_KEYCODE}`);
exports.EVENT = {
    HIDE: `hide${exports.EVENT_KEY}`,
    HIDDEN: `hidden${exports.EVENT_KEY}`,
    SHOW: `show${exports.EVENT_KEY}`,
    SHOWN: `shown${exports.EVENT_KEY}`,
    CLICK: `click${exports.EVENT_KEY}`,
    CLICK_DATA_API: `click${exports.EVENT_KEY}${exports.DATA_API_KEY}`,
    KEYDOWN_DATA_API: `keydown${exports.EVENT_KEY}${exports.DATA_API_KEY}`,
    KEYUP_DATA_API: `keyup${exports.EVENT_KEY}${exports.DATA_API_KEY}`,
};
exports.CLASSNAME = {
    DISABLED: 'disabled',
    SHOW: 'show',
    DROPUP: 'dropup',
    DROPRIGHT: 'dropright',
    DROPLEFT: 'dropleft',
    MENURIGHT: 'dropdown-menu-right',
    MENULEFT: 'dropdown-menu-left',
    POSITION_STATIC: 'position-static',
};
exports.SELECTOR = {
    DATA_TOGGLE: 'bs4-dropdown .dropdown-toggle',
    FORM_CHILD: '.dropdown form',
    MENU: '.dropdown-menu',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)',
};
exports.ATTACHMENTMAP = {
    TOP: 'top-start',
    TOPEND: 'top-end',
    BOTTOM: 'bottom-start',
    BOTTOMEND: 'bottom-end',
    RIGHT: 'right-start',
    RIGHTEND: 'right-end',
    LEFT: 'left-start',
    LEFTEND: 'left-end',
};
exports.DEFAULT = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic',
};
exports.DEFAULTTYPE = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string',
};
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */
class DropdownService {
    constructor(element, config) {
        this.debug = core_1.Debug('service:DropdownService');
        this._element = element;
        this._popper = null;
        this._config = this._getConfig(config);
        this._menu = this._getMenuElement();
        this._inNavbar = this._detectNavbar();
        core_1.JQuery(this._element).data(exports.DATA_KEY, this._config);
        this.clouseOnClickOutsite(DropdownService._getParentFromElement(this._element));
    }
    // Getters
    static get VERSION() {
        return exports.VERSION;
    }
    static get Default() {
        return exports.DEFAULT;
    }
    static get DefaultType() {
        return exports.DEFAULTTYPE;
    }
    // Static
    static closeAll() {
        const $menus = core_1.JQuery('.dropdown-menu.show');
        $menus.each((index, menu) => {
            const $menu = core_1.JQuery(menu);
            const $dropdown = $menu.closest('dropdown-menu.show');
            this.close($menu[0], $menu, $dropdown);
        });
    }
    static close(triggerCloseElement, $menu, $dropdown) {
        const relatedTarget = {
            relatedTarget: triggerCloseElement,
        };
        const $parent = DropdownService._getParentFromElement(triggerCloseElement);
        if ($menu && $menu.hasClass(exports.CLASSNAME.SHOW)) {
            $menu.removeClass(exports.CLASSNAME.SHOW);
        }
        if ($dropdown && $dropdown.hasClass(exports.CLASSNAME.SHOW)) {
            $dropdown.removeClass(exports.CLASSNAME.SHOW)
                .removeClass(exports.CLASSNAME.SHOW)
                .trigger(core_1.JQuery.Event(exports.EVENT.HIDDEN, relatedTarget));
        }
        if ($parent.hasClass(exports.CLASSNAME.SHOW)) {
            $parent
                .removeClass(exports.CLASSNAME.SHOW)
                .trigger(core_1.JQuery.Event(exports.EVENT.HIDDEN, relatedTarget));
        }
    }
    static _clearMenus(event) {
        if (event && (event.which === exports.RIGHT_MOUSE_BUTTON_WHICH ||
            event.type === 'keyup' && event.which !== exports.TAB_KEYCODE)) {
            return;
        }
        const toggles = [].slice.call(core_1.JQuery(exports.SELECTOR.DATA_TOGGLE).get());
        core_1.JQuery(exports.SELECTOR.DATA_TOGGLE).each((i, element) => {
            // for (let i = 0, len = toggles.length; i < len; i++) {
            const parent = DropdownService._getParentFromElement(element);
            const context = core_1.JQuery(toggles[i]).data(exports.DATA_KEY);
            // console.warn('_clearMenus parent', parent, context);
            const relatedTarget = {
                relatedTarget: toggles[i],
            };
            if (event && event.type === 'click') {
                relatedTarget.clickEvent = event;
            }
            if (!context) {
                // continue;
                return;
            }
            const dropdownMenu = parent.find(exports.SELECTOR.MENU);
            if (!core_1.JQuery(parent).hasClass(exports.CLASSNAME.SHOW)) {
                // continue;
                return;
            }
            if (event && (event.type === 'click' &&
                /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === exports.TAB_KEYCODE) &&
                core_1.JQuery.contains(parent.get(0), event.target)) {
                // continue;
                return;
            }
            const hideEvent = core_1.JQuery.Event(exports.EVENT.HIDE, relatedTarget);
            core_1.JQuery(parent).trigger(hideEvent);
            if (hideEvent.isDefaultPrevented()) {
                // continue;
                return;
            }
            // If this is a touch-enabled device we remove the extra
            // empty mouseover listeners we added for iOS support
            if (document.documentElement && 'ontouchstart' in document.documentElement) {
                core_1.JQuery(document.body).children().off('mouseover', 'null', core_1.JQuery.noop);
            }
            toggles[i].setAttribute('aria-expanded', 'false');
            dropdownMenu.removeClass(exports.CLASSNAME.SHOW);
            parent
                .removeClass(exports.CLASSNAME.SHOW)
                .trigger(core_1.JQuery.Event(exports.EVENT.HIDDEN, relatedTarget));
        });
    }
    static _getParentFromElement(element) {
        return core_1.JQuery(element).parent();
        // let parent;
        // const selector = Utils.getSelectorFromElement(element);
        // if (selector) {
        //   parent = document.querySelector(selector);
        // }
        // return parent || element.parentNode;
    }
    // Public
    close() {
        this.debug('close');
        return DropdownService.close(this._element, core_1.JQuery(this._menu));
    }
    show() {
        this.debug('show');
        const relatedTarget = {
            relatedTarget: this._element,
        };
        const $parent = DropdownService._getParentFromElement(this._element);
        if (!core_1.JQuery(this._menu).hasClass(exports.CLASSNAME.SHOW)) {
            core_1.JQuery(this._menu).addClass(exports.CLASSNAME.SHOW);
        }
        if (!$parent.hasClass(exports.CLASSNAME.SHOW)) {
            $parent
                .addClass(exports.CLASSNAME.SHOW)
                .trigger(core_1.JQuery.Event(exports.EVENT.SHOWN, relatedTarget));
        }
    }
    toggle() {
        if (this._element.disabled || core_1.JQuery(this._element).hasClass(exports.CLASSNAME.DISABLED)) {
            return;
        }
        this.debug('toggle');
        const parent = DropdownService._getParentFromElement(this._element);
        const isActive = core_1.JQuery(this._menu).hasClass(exports.CLASSNAME.SHOW);
        DropdownService._clearMenus();
        if (isActive) {
            this.close();
            return;
        }
        const relatedTarget = {
            relatedTarget: this._element,
        };
        const showEvent = core_1.JQuery.Event(exports.EVENT.SHOW, relatedTarget);
        core_1.JQuery(parent).trigger(showEvent);
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
            if (typeof popper_js_1.default === 'undefined') {
                throw new TypeError('Bootstrap dropdown require Popper.js (https://popper.js.org)');
            }
            let referenceElement = this._element;
            if (this._config.reference === 'parent') {
                referenceElement = parent.get(0);
            }
            else if (utils_service_1.Utils.isElement(this._config.reference)) {
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
                core_1.JQuery(parent).addClass(exports.CLASSNAME.POSITION_STATIC);
            }
            this._popper = new popper_js_1.default(referenceElement, this._menu, this._getPopperConfig());
        }
        // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
        if (document.documentElement && 'ontouchstart' in document.documentElement &&
            core_1.JQuery(parent).closest(exports.SELECTOR.NAVBAR_NAV).length === 0) {
            core_1.JQuery(document.body).children().on('mouseover', null, core_1.JQuery.noop);
        }
        this.clouseOnClickOutsite(DropdownService._getParentFromElement(this._element));
        this._element.focus();
        this._element.setAttribute('aria-expanded', 'true');
        core_1.JQuery(this._menu).toggleClass(exports.CLASSNAME.SHOW);
        core_1.JQuery(parent)
            .toggleClass(exports.CLASSNAME.SHOW)
            .trigger(core_1.JQuery.Event(exports.EVENT.SHOWN, relatedTarget));
    }
    dispose() {
        core_1.JQuery.removeData(this._element, exports.DATA_KEY);
        core_1.JQuery(this._element).off(exports.EVENT_KEY);
        delete this._element; // = null;
        delete this._menu; // = null;
        if (this._popper !== null) {
            this._popper.destroy();
            this._popper = null;
        }
    }
    update() {
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
    clouseOnClickOutsite($element) {
        const outsideClickListener = (event) => {
            if (!core_1.JQuery(event.target).closest($element.get(0)).length) {
                this.close();
                removeClickListener();
            }
        };
        const removeClickListener = () => {
            document.removeEventListener('click', outsideClickListener);
        };
        document.addEventListener('click', outsideClickListener);
    }
    _getConfig(config) {
        config = {
            ...DropdownService.Default,
            ...core_1.JQuery(this._element).data(),
            ...config,
        };
        utils_service_1.Utils.typeCheckConfig(exports.NAME, config, DropdownService.DefaultType);
        return config;
    }
    _getMenuElement() {
        if (!this._menu) {
            const parent = DropdownService._getParentFromElement(this._element);
            if (parent) {
                this._menu = parent.find(exports.SELECTOR.MENU).get(0);
            }
        }
        return this._menu;
    }
    _getPlacement() {
        const $parentDropdown = core_1.JQuery(this._element.parentNode);
        let placement = exports.ATTACHMENTMAP.BOTTOM;
        // Handle dropup
        if ($parentDropdown.hasClass(exports.CLASSNAME.DROPUP)) {
            placement = exports.ATTACHMENTMAP.TOP;
            if (core_1.JQuery(this._menu).hasClass(exports.CLASSNAME.MENURIGHT)) {
                placement = exports.ATTACHMENTMAP.TOPEND;
            }
        }
        else if ($parentDropdown.hasClass(exports.CLASSNAME.DROPRIGHT)) {
            placement = exports.ATTACHMENTMAP.RIGHT;
        }
        else if ($parentDropdown.hasClass(exports.CLASSNAME.DROPLEFT)) {
            placement = exports.ATTACHMENTMAP.LEFT;
        }
        else if (core_1.JQuery(this._menu).hasClass(exports.CLASSNAME.MENURIGHT)) {
            placement = exports.ATTACHMENTMAP.BOTTOMEND;
        }
        return placement;
    }
    _detectNavbar() {
        return core_1.JQuery(this._element).closest('.navbar').length > 0;
    }
    _getPopperConfig() {
        const offsetConf = {};
        if (typeof this._config.offset === 'function') {
            offsetConf.fn = (data) => {
                data.offsets = {
                    ...data.offsets,
                    ...this._config.offset(data.offsets) || {},
                };
                return data;
            };
        }
        else {
            offsetConf.offset = this._config.offset;
        }
        const popperConfig = {
            placement: this._getPlacement(),
            modifiers: {
                offset: offsetConf,
                flip: {
                    enabled: this._config.flip,
                },
                preventOverflow: {
                    boundariesElement: this._config.boundary,
                },
            },
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
exports.DropdownService = DropdownService;
