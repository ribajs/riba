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

  _isShown(element?: HTMLElement): boolean {
    // @ts-expect-error Undocumented, see https://github.com/twbs/bootstrap/blob/2f7184e125099c01ddfc513ba5291c085b74521a/js/src/collapse.js#L207
    return super._isShown(element);
  }

  isCollapsed(element?: HTMLElement): boolean {
    return !this._isShown(element);
  }
}
