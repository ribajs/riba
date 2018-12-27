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

  private $target: JQuery<HTMLElement>;

  constructor($target: JQuery<HTMLElement>) {
    this.$target = $target;
  }

  public show() {
    this.$target
    .removeClass(CollapseService.CLASSNAME.COLLAPSE)
    .addClass(CollapseService.CLASSNAME.SHOW)
    .trigger(CollapseService.EVENT.SHOWN);
  }

  public hide() {
    this.$target
    .removeClass(CollapseService.CLASSNAME.SHOW)
    .addClass(CollapseService.CLASSNAME.COLLAPSE)
    .trigger(CollapseService.EVENT.HIDDEN);
  }

  public isExpanded() {
    return this.$target.hasClass(CollapseService.CLASSNAME.SHOW);
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
