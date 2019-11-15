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
    COLLAPSE   : 'collapse',
    COLLAPSING : 'collapsing',
    COLLAPSED  : 'collapsed',
  };

  private targets: NodeListOf<Element> | Array<Element>;

  constructor(targets: NodeListOf<Element> | Array<Element>) {
    this.targets = targets;
  }

  public show() {
    this.targets.forEach((target: Element) => {
      target.classList.remove(CollapseService.CLASSNAME.COLLAPSE);
      target.classList.add(CollapseService.CLASSNAME.SHOW);
      target.dispatchEvent(new Event(CollapseService.EVENT.SHOWN));
    });
  }

  public hide() {
    this.targets.forEach((target: Element) => {
      target.classList.remove(CollapseService.CLASSNAME.SHOW);
      target.classList.add(CollapseService.CLASSNAME.COLLAPSE);
      target.dispatchEvent(new Event(CollapseService.EVENT.HIDDEN));
    });
  }

  public isExpanded() {
    if (this.targets.length > 0 && this.targets[0]) {
      return this.targets[0].classList.contains(CollapseService.CLASSNAME.SHOW);
    }
    return false;
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
