/**
 *
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/collapse.js
 */
export class CollapseService {

  public static DATA_KEY            = 'bs.collapse';
  public static EVENT_KEY           = `.${CollapseService.DATA_KEY}`;
  public static DATA_API_KEY        = '.data-api';

  public static EVENT = {
    SHOW           : `show${CollapseService.EVENT_KEY}`,
    SHOWN          : `shown${CollapseService.EVENT_KEY}`,
    HIDE           : `hide${CollapseService.EVENT_KEY}`,
    HIDDEN         : `hidden${CollapseService.EVENT_KEY}`,
    CLICK_DATA_API : `click${CollapseService.EVENT_KEY}${CollapseService.DATA_API_KEY}`,
  };

  public static CLASSNAME = {
    SHOW       : 'show',
    COLLAPSE   : 'collapse', // hidden
    COLLAPSING : 'collapsing', // TODO
    COLLAPSED  : 'collapsed', // TODO
  };

  public static show(element: Element) {
    element.classList.remove(CollapseService.CLASSNAME.COLLAPSE);
    element.classList.add(CollapseService.CLASSNAME.SHOW);
    element.dispatchEvent(new Event(CollapseService.EVENT.SHOWN));
  }

  public static hide(element: Element) {
    element.classList.remove(CollapseService.CLASSNAME.SHOW);
    element.classList.add(CollapseService.CLASSNAME.COLLAPSE);
    element.dispatchEvent(new Event(CollapseService.EVENT.HIDDEN));
  }

  public static hideAll(elements: NodeListOf<Element> | Array<Element>) {
    elements.forEach((element: Element) => {
      this.hide(element);
    });
  }

  public static isExpanded(element: Element) {
    return element.classList.contains(CollapseService.CLASSNAME.SHOW);
  }

  public static isCollapsed(element: Element) {
    return !this.isExpanded(element);
  }

  public static toggle(element: Element) {
    if (this.isCollapsed(element)) {
      this.show(element);
    } else {
      this.hide(element);
    }
  }

  protected targets: NodeListOf<Element> | Array<Element>;

  constructor(targets: NodeListOf<Element> | Array<Element>) {
    this.targets = targets;
  }

  /**
   * Show all
   */
  public show() {
    this.targets.forEach((target: Element) => {
      CollapseService.show(target);
    });
  }

  /**
   * Collapse / hide all
   */
  public hide() {
    this.targets.forEach((target: Element) => {
      CollapseService.hide(target);
    });
  }

  public isExpanded() {
    return CollapseService.isExpanded(this.targets[0]);
  }

  public isCollapsed() {
    return !this.isExpanded();
  }

  public toggle() {
    if (this.isCollapsed()) {
      this.show();
    } else {
      this.hide();
    }
  }
}
