import { Collapse } from "bootstrap";

/**
 * @see https://github.com/twbs/bootstrap/blob/main/js/src/collapse.js
 */
export class CollapseService extends Collapse {
  // TODO add to type definitions
  static get Default() {
    return {
      toggle: true,
      parent: "",
    };
  }
}

// TODO
export const CLASS_NAME_SHOW = "show";
export const CLASS_NAME_COLLAPSE = "collapse";
export const CLASS_NAME_COLLAPSING = "collapsing";
export const CLASS_NAME_COLLAPSED = "collapsed";

export const SELECTOR_ACTIVES = ".show, .collapsing";
export const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="collapse"]';
