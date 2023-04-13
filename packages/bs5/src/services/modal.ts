import { Modal as _Modal } from "bootstrap";

const DATA_KEY = "bs.modal";
const DATA_API_KEY = ".data-api";
const EVENT_KEY = `.${DATA_KEY}`;

/**
 * @see https://github.com/twbs/bootstrap/blob/main/js/src/modal.js
 */
export class Modal extends _Modal {
  static get DATA_KEY() {
    return DATA_KEY;
  }

  static get DATA_API_KEY() {
    return DATA_API_KEY;
  }

  static get EVENT_KEY() {
    return EVENT_KEY;
  }

  // static NAME = "modal";

  static ESCAPE_KEY = "Escape";

  static EVENT_HIDE = `hide${EVENT_KEY}`;
  static EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
  static EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  static EVENT_SHOW = `show${EVENT_KEY}`;
  static EVENT_SHOWN = `shown${EVENT_KEY}`;
  static EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
  static EVENT_RESIZE = `resize${EVENT_KEY}`;
  static EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
  static EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
  static EVENT_MOUSEUP_DISMISS = `mouseup.dismiss${EVENT_KEY}`;
  static EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY}`;
  static EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;

  static CLASS_NAME_SCROLLBAR_MEASURER = "modal-scrollbar-measure";
  static CLASS_NAME_BACKDROP = "modal-backdrop";
  static CLASS_NAME_OPEN = "modal-open";
  static CLASS_NAME_FADE = "fade";
  static CLASS_NAME_SHOW = "show";
  static CLASS_NAME_STATIC = "modal-static";

  static SELECTOR_DIALOG = ".modal-dialog";
  static SELECTOR_MODAL_BODY = ".modal-body";
  static SELECTOR_DATA_TOGGLE = '[data-bs-toggle="modal"]';
  static SELECTOR_DATA_DISMISS = '[data-bs-dismiss="modal"]';
  static SELECTOR_FIXED_CONTENT =
    ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top";
  static SELECTOR_STICKY_CONTENT = ".sticky-top";
}
