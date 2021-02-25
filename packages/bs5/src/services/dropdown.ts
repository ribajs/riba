import { Dropdown as _Dropdown } from "bootstrap";
import { Bs5DropdownComponent } from "../components/bs5-dropdown/bs5-dropdown.component";

const DATA_KEY = "bs.dropdown";
const EVENT_KEY = `.${DATA_KEY}`;
const DATA_API_KEY = ".data-api";

const ARROW_DOWN_KEY = "ArrowDown";
const ARROW_UP_KEY = "ArrowUp";
const ESCAPE_KEY = "Escape";

/**
 * @see https://github.com/twbs/bootstrap/blob/main/js/src/dropdown.js
 */
export class Dropdown extends _Dropdown {
  public static hideAll() {
    (this as any).clearMenus(); // TODO type
  }

  public static getAllComponents() {
    const dropdownEls = document.querySelectorAll<Bs5DropdownComponent>(
      Bs5DropdownComponent.tagName
    );
    return Array.from(dropdownEls);
  }

  public static hideAllComponents() {
    const dropdownEls = this.getAllComponents();

    for (const dropdownEl of Array.from(dropdownEls)) {
      dropdownEl.dropdown?.hide();
    }
  }

  static NAME = "dropdown";
  static get DATA_KEY() {
    return DATA_KEY;
  }
  static EVENT_KEY = EVENT_KEY;
  static DATA_API_KEY = DATA_API_KEY;

  static ESCAPE_KEY = ESCAPE_KEY;
  static SPACE_KEY = "Space";
  static TAB_KEY = "Tab";
  static ARROW_UP_KEY = ARROW_UP_KEY;
  static ARROW_DOWN_KEY = ARROW_DOWN_KEY;
  static RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

  static REGEXP_KEYDOWN = new RegExp(
    `${ARROW_UP_KEY}|${ARROW_DOWN_KEY}|${ESCAPE_KEY}`
  );

  static EVENT_HIDE = `hide${EVENT_KEY}`;
  static EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  static EVENT_SHOW = `show${EVENT_KEY}`;
  static EVENT_SHOWN = `shown${EVENT_KEY}`;
  static EVENT_CLICK = `click${EVENT_KEY}`;
  static EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
  static EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY}${DATA_API_KEY}`;
  static EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY}${DATA_API_KEY}`;

  static CLASS_NAME_DISABLED = "disabled";
  static CLASS_NAME_SHOW = "show";
  static CLASS_NAME_DROPUP = "dropup";
  static CLASS_NAME_DROPEND = "dropend";
  static CLASS_NAME_DROPSTART = "dropstart";
  static CLASS_NAME_NAVBAR = "navbar";

  static SELECTOR_DATA_TOGGLE = '[data-bs-toggle="dropdown"]';
  static SELECTOR_FORM_CHILD = ".dropdown form";
  static SELECTOR_MENU = ".dropdown-menu";
  static SELECTOR_NAVBAR_NAV = ".navbar-nav";
  static SELECTOR_VISIBLE_ITEMS =
    ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)";
}
