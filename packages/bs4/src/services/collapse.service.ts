
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
    COLLAPSING : 'collapsing', // animation
    COLLAPSED  : 'collapsed', // Button / trigger element class if collapse element is collapsed
  };

  public static show(element: HTMLElement, animated = true) {
    if (animated) {
      element.addEventListener('webkitTransitionEnd' as 'animationend', this.onShowTransitionEnd.bind(this, element), { once: true });
      element.addEventListener('transitionend', this.onShowTransitionEnd.bind(this, element), { once: true });
      element.classList.add(CollapseService.CLASSNAME.COLLAPSING);
      element.classList.remove(CollapseService.CLASSNAME.COLLAPSE);
      // Get and set height to start transition
      setTimeout(() => {
        // const duration = Utils.getTransitionDurationFromElement(element);
        if (element.firstElementChild) {
          const dimension = element.firstElementChild.getBoundingClientRect();
          element.style.height = dimension.height + 'px';
        } else {
          element.style.height = 'auto';
        }
      });
    } else {
      this.onShowTransitionEnd(element);
    }
  }

  public static hide(element: HTMLElement, animated = true) {
    if (animated) {
      element.addEventListener('webkitTransitionEnd' as 'animationend', this.onHideTransitionEnd.bind(this, element), { once: true });
      element.addEventListener('transitionend', this.onHideTransitionEnd.bind(this, element), { once: true });
      element.style.height = element.getBoundingClientRect().height + 'px' ;
      setTimeout(() => {
        element.classList.add(CollapseService.CLASSNAME.COLLAPSING);
        element.classList.remove(CollapseService.CLASSNAME.COLLAPSE);
        element.classList.remove(CollapseService.CLASSNAME.SHOW);
        element.style.height = '0' ;
      });
    } else {
      this.onHideTransitionEnd(element);
    }
  }

  public static hideAll(elements: NodeListOf<HTMLElement> | Array<HTMLElement>) {
    elements.forEach((element: HTMLElement) => {
      this.hide(element);
    });
  }

  public static isExpanded(element: HTMLElement) {
    return element.classList.contains(CollapseService.CLASSNAME.SHOW);
  }

  public static isCollapsed(element: HTMLElement) {
    return !this.isExpanded(element);
  }

  public static toggle(element: HTMLElement, animated = true) {
    if (this.isCollapsed(element)) {
      this.show(element, animated);
    } else {
      this.hide(element, animated);
    }
  }

  protected static onShowTransitionEnd(element: HTMLElement) {
    setTimeout(() => {
      element.classList.add(CollapseService.CLASSNAME.COLLAPSE);
      element.classList.add(CollapseService.CLASSNAME.SHOW);
      element.classList.remove(CollapseService.CLASSNAME.COLLAPSING);
      element.style.height = '';
      element.dispatchEvent(new Event(CollapseService.EVENT.SHOWN));
    });
  }

  protected static onHideTransitionEnd(element: HTMLElement) {
    setTimeout(() => {
      element.classList.add(CollapseService.CLASSNAME.COLLAPSE);
      element.classList.remove(CollapseService.CLASSNAME.COLLAPSING);
      element.classList.remove(CollapseService.CLASSNAME.SHOW);
      element.style.height = '';
      element.dispatchEvent(new Event(CollapseService.EVENT.HIDDEN));
    });
  }

  protected targets: NodeListOf<HTMLElement> | Array<HTMLElement>;

  constructor(targets: NodeListOf<HTMLElement> | Array<HTMLElement>) {
    this.targets = targets;
  }

  /**
   * Show all
   */
  public show(animated = true) {
    this.targets.forEach((target: HTMLElement) => {
      CollapseService.show(target, animated);
    });
  }

  /**
   * Collapse / hide all
   */
  public hide(animated = true) {
    this.targets.forEach((target: HTMLElement) => {
      CollapseService.hide(target, animated);
    });
  }

  public isExpanded() {
    return CollapseService.isExpanded(this.targets[0]);
  }

  public isCollapsed() {
    return !this.isExpanded();
  }

  public toggle(animated = true) {
    if (this.isCollapsed()) {
      this.show(animated);
    } else {
      this.hide(animated);
    }
  }
}
