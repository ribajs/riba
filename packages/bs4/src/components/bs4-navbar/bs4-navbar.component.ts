import { Component, EventDispatcher, Binder } from '@ribajs/core';
import { CollapseService } from '../../services/collapse.service';

export class Bs4NavbarComponent extends Component {

  public static tagName: string = 'bs4-navbar';

  protected scope: any = {
    toggle: this.toggle,
    show: this.show,
    hide: this.hide,
    isCollapsed: true,
    collapseSelector: '.navbar-collapse',
    animated: true,
  };

  protected collapse?: NodeListOf<HTMLElement>;
  protected collapseService?: CollapseService;
  protected router?: EventDispatcher;

  static get observedAttributes() {
    return ['collapse-selector', 'animated'];
  }

  constructor(element?: HTMLElement) {
    super(element);
  }

  public toggle(context?: Binder<any>, event?: Event) {
    if (this.collapseService) {
      this.collapseService.toggle(this.scope.animated);
    }
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  public show(context?: Binder<any>, event?: Event) {
    if (this.collapseService) {
      this.collapseService.show(this.scope.animated);
    }
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  public hide(context?: Binder<any>, event?: Event) {
    if (this.collapseService) {
      this.collapseService.hide(this.scope.animated);
    }
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.router = new EventDispatcher('main');
    this.router.on('newPageReady', this.onNewPageReady.bind(this));

    this.setCollapseElement();

    this.onStateChange();

    this.init(Bs4NavbarComponent.observedAttributes);
  }

  protected setCollapseElement() {
    // Remove old event listeners
    this.removeCollapseEventListeners();

    this.collapse = this.el.querySelectorAll(this.scope.collapseSelector) || undefined;

    // Add new event listeners
    this.addCollapseEventListeners();

    if (this.collapse) {
      this.collapseService = new CollapseService(this.collapse);
    }
  }

  protected addCollapseEventListeners() {
    if (this.collapse) {
      this.collapse.forEach((collapse) => {
        collapse.addEventListener(CollapseService.EVENT.SHOWN, this.onStateChange.bind(this));
        collapse.addEventListener(CollapseService.EVENT.HIDDEN, this.onStateChange.bind(this));
      });
    }
  }

  protected removeCollapseEventListeners() {
    if (this.collapse) {
      this.collapse.forEach((collapse) => {
        collapse.removeEventListener(CollapseService.EVENT.SHOWN, this.onStateChange.bind(this));
        collapse.removeEventListener(CollapseService.EVENT.HIDDEN, this.onStateChange.bind(this));
      });
    }
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
    this.removeCollapseEventListeners();
    if (this.router) {
      this.router.off('newPageReady', this.onNewPageReady);
    }
  }

  protected onStateChange() {

    if (this.collapseService) {
      this.scope.isCollapsed = this.collapseService.isCollapsed();
    }

    if (this.scope.isCollapsed) {
      this.el.classList.add(CollapseService.CLASSNAME.COLLAPSED);
      this.el.setAttribute('aria-expanded', 'false');
    } else {
      this.el.classList.remove(CollapseService.CLASSNAME.COLLAPSED);
      this.el.setAttribute('aria-expanded', 'true');
    }
  }

  protected onNewPageReady() {
    if (this.collapseService) {
      this.collapseService.hide(this.scope.animated);
    }
  }

  protected parsedAttributeChangedCallback(attributeName: string | string[], oldValue: any, newValue: any, namespace: string | null) {
    super.parsedAttributeChangedCallback(attributeName, oldValue, newValue, namespace);
    if (attributeName === 'collapseSelector') {
      this.setCollapseElement();
    }
  }

  protected template() {
    return null;
  }
}
