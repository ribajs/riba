/// <reference types="jquery" />
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
export declare const NAME = "dropdown";
export declare const VERSION = "4.1.3";
export declare const DATA_KEY = "bs.dropdown";
export declare const EVENT_KEY: string;
export declare const DATA_API_KEY = ".data-api";
export declare const ESCAPE_KEYCODE = 27;
export declare const SPACE_KEYCODE = 32;
export declare const TAB_KEYCODE = 9;
export declare const ARROW_UP_KEYCODE = 38;
export declare const ARROW_DOWN_KEYCODE = 40;
export declare const RIGHT_MOUSE_BUTTON_WHICH = 3;
export declare const REGEXP_KEYDOWN: RegExp;
export declare const EVENT: {
    HIDE: string;
    HIDDEN: string;
    SHOW: string;
    SHOWN: string;
    CLICK: string;
    CLICK_DATA_API: string;
    KEYDOWN_DATA_API: string;
    KEYUP_DATA_API: string;
};
export declare const CLASSNAME: {
    DISABLED: string;
    SHOW: string;
    DROPUP: string;
    DROPRIGHT: string;
    DROPLEFT: string;
    MENURIGHT: string;
    MENULEFT: string;
    POSITION_STATIC: string;
};
export declare const SELECTOR: {
    DATA_TOGGLE: string;
    FORM_CHILD: string;
    MENU: string;
    NAVBAR_NAV: string;
    VISIBLE_ITEMS: string;
};
export declare const ATTACHMENTMAP: {
    TOP: string;
    TOPEND: string;
    BOTTOM: string;
    BOTTOMEND: string;
    RIGHT: string;
    RIGHTEND: string;
    LEFT: string;
    LEFTEND: string;
};
export declare const DEFAULT: {
    offset: number;
    flip: boolean;
    boundary: string;
    reference: string;
    display: string;
};
export declare const DEFAULTTYPE: {
    offset: string;
    flip: string;
    boundary: string;
    reference: string;
    display: string;
};
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */
export declare class DropdownService {
    static readonly VERSION: string;
    static readonly Default: {
        offset: number;
        flip: boolean;
        boundary: string;
        reference: string;
        display: string;
    };
    static readonly DefaultType: {
        offset: string;
        flip: string;
        boundary: string;
        reference: string;
        display: string;
    };
    static closeAll(): void;
    static close(triggerCloseElement: Element, $menu: JQuery<Element>, $dropdown?: JQuery<Element>): void;
    static _clearMenus(event?: JQuery.Event): void;
    static _getParentFromElement(element: Element): JQuery<Element>;
    private _element;
    private _popper;
    private _config;
    private _menu;
    private _inNavbar;
    private debug;
    constructor(element: HTMLButtonElement | HTMLAnchorElement, config?: any);
    close(): void;
    show(): void;
    toggle(): void;
    dispose(): void;
    update(): void;
    /**
     * @see https://stackoverflow.com/questions/152975/how-do-i-detect-a-click-outside-an-element
     * @param selector
     */
    private clouseOnClickOutsite;
    private _getConfig;
    private _getMenuElement;
    private _getPlacement;
    private _detectNavbar;
    private _getPopperConfig;
}
