import { RibaComponent, Debug, JQuery as $, Binder } from '@ribajs/core';
import { DropdownService } from '../../services/dropdown.service';

export class DropdownComponent extends RibaComponent {

  public static tagName: string = 'bs4-dropdown';

  protected debug = Debug('component:bs4-dropdown');
  protected scope: any = {
    toggle: this.toggle,
  };

  protected dropdownService: DropdownService;

  static get observedAttributes() {
    return [];
  }

  constructor(element?: HTMLElement) {
    super(element);
    const self = this;
    const $el = $(this.el);
    this.dropdownService = new DropdownService($el.find('.dropdown-toggle')[0] as HTMLButtonElement);
    this.init(DropdownComponent.observedAttributes);
  }

  public toggle(context: Binder<any>, event: Event) {
    this.debug('toggle');
    event.preventDefault();
    event.stopPropagation();
    return this.dropdownService.toggle();
  }

  protected template() {
    return null;
  }
}
