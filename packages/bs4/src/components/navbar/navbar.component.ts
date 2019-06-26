import { AbstractRibaComponent, Debug, JQuery as $, EventDispatcher, IBinder } from '@ribajs/core';
import { CollapseService } from '../../services/collapse.service';

export class NavbarComponent extends AbstractRibaComponent {

  public static tagName: string = 'bs4-navbar';

  protected debug = Debug('component:bs4-navbar');
  protected scope: any = {
    toggle: this.toggle,
    isCollapsed: true,
  };

  protected collapseService: CollapseService;

  static get observedAttributes() {
    return [];
  }

  constructor(element?: HTMLElement) {
    super(element);
    const self = this;
    const $el = $(this.el);
    const $collapse = $el.find('.navbar-collapse');
    const dispatcher = new EventDispatcher('main');

    this.collapseService = new CollapseService($collapse);

    const onStateChange = () => {
      if ( this.collapseService.isCollapsed()) {
        $el
        .addClass(CollapseService.CLASSNAME.COLLAPSED)
        .attr('aria-expanded', 'false');
      } else {
        $el
        .removeClass(CollapseService.CLASSNAME.COLLAPSED)
        .attr('aria-expanded', 'true');
      }

      this.scope.isCollapsed = this.collapseService.isCollapsed();
    };

    $collapse.on(CollapseService.EVENT.SHOWN, onStateChange);
    $collapse.on(CollapseService.EVENT.HIDDEN, onStateChange);

    dispatcher.on('newPageReady', () => {
      this.collapseService.hide();
    });

    onStateChange();

    this.init(NavbarComponent.observedAttributes);
  }

  public toggle(context: IBinder<any>, event: Event) {
    this.debug('toggle');
    this.collapseService.toggle();
    event.preventDefault();
    event.stopPropagation();
  }

  protected template() {
    return null;
  }
}
