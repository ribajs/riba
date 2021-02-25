import { Toast as _Toast } from "bootstrap";

const DATA_KEY = "bs.toast";
const EVENT_KEY = `.${DATA_KEY}`;

/**
 * @see https://github.com/twbs/bootstrap/blob/main/js/src/toast.js
 */
export class Toast extends _Toast {
  static NAME = "toast";
  static get DATA_KEY() {
    return DATA_KEY;
  }
  static get EVENT_KEY() {
    return EVENT_KEY;
  }

  static EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
  static EVENT_HIDE = `hide${EVENT_KEY}`;
  static EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  static EVENT_SHOW = `show${EVENT_KEY}`;
  static EVENT_SHOWN = `shown${EVENT_KEY}`;

  static CLASS_NAME_FADE = "fade";
  static CLASS_NAME_HIDE = "hide";
  static CLASS_NAME_SHOW = "show";
  static CLASS_NAME_SHOWING = "showing";
}
