import { Component, Binder } from '@ribajs/core';
import { DropdownService } from '../../services/dropdown.service';

export class Bs4DropdownComponent extends Component {

  public static tagName = 'bs4-dropdown';

  protected scope: any = {
    toggle: this.toggle,
  };

  protected dropdownService?: DropdownService;

  static get observedAttributes() {
    return [];
  }

  constructor(element?: HTMLElement) {
    super(element);
  }

  public toggle(context: Binder<any>, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.dropdownService) {
      throw new Error('DropdownService not ready!');
    }
    return this.dropdownService.toggle();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.dropdownService = new DropdownService(this.el.querySelector('.dropdown-toggle') as HTMLButtonElement | HTMLAnchorElement);
    this.init(Bs4DropdownComponent.observedAttributes);
  }

  protected template() {
    return null;
  }
}
