import { Collapse as _Collapse } from "bootstrap";

/**
 * @see https://github.com/twbs/bootstrap/blob/main/js/src/collapse.js
 */
export class Collapse extends _Collapse {
  static CLASS_NAME_SHOW = "show";
  static CLASS_NAME_COLLAPSE = "collapse";
  static CLASS_NAME_COLLAPSING = "collapsing";
  static CLASS_NAME_COLLAPSED = "collapsed";
  static SELECTOR_ACTIVES = ".show, .collapsing";
  static SELECTOR_DATA_TOGGLE = '[data-bs-toggle="collapse"]';
}
