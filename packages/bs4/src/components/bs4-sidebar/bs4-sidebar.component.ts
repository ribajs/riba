import {
  Component,
  Debug,
  EventDispatcher,
  Utils,
} from '@ribajs/core';

import template from './bs4-sidebar.component.html';

type State = 'overlay-left' | 'overlay-right' | 'side-left' | 'side-right' | 'hidden';

interface IScope {
  containerSelector?: string;
  state: State;
  id?: string;
  width: number;

  // Options
  position: 'left' | 'right';
  autoShowOnWiderThan: number;
  autoHideOnSlimmerThan: number;
  forceHideOnLocationPathnames: Array<string>;
  overlayOnSlimmerThan: number;

  // Template methods
  hide: Bs4SidebarComponent['hide'];
  show: Bs4SidebarComponent['show'];
  toggle: Bs4SidebarComponent['toggle'];
}

export class Bs4SidebarComponent extends Component {

  public static tagName: string = 'bs4-sidebar';

  protected style: CSSStyleDeclaration;

  protected autobind = true;

  static get observedAttributes() {
    return ['id', 'container-selector', 'position', 'width', 'auto-show-in-wider-than', 'auto-hide-on-slimmer-than', 'force-hide-on-location-pathnames', 'overlay-on-slimmer-than'];
  }

  protected toggleButtonEvents?: EventDispatcher;

  protected routerEvents = new EventDispatcher('main');

  protected debug = Debug('component:' + Bs4SidebarComponent.tagName);

  protected scope: IScope = {

    // template properties
    containerSelector: undefined,
    state: 'hidden',
    id: undefined,
    width: 250,

    // Options
    position: 'left',
    autoShowOnWiderThan: 1199,
    autoHideOnSlimmerThan: 1200,
    forceHideOnLocationPathnames: [],
    overlayOnSlimmerThan: 1200,

    // template methods
    hide: this.hide,
    show: this.show,
    toggle: this.toggle,
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.debug('constructor', this);
    this.init(Bs4SidebarComponent.observedAttributes);
    this.style = window.getComputedStyle(this.el);
    window.addEventListener('resize', this.onResize.bind(this), false);
  }

  public setState(state: State) {
    this.scope.state = state;
  }

  public getState() {
    return this.scope.state;
  }

  public hide() {
    this.scope.state = 'hidden';
    this.onStateChange();
  }

  public show() {
    const vw = Utils.getViewportDimensions().w;
    if (vw < this.scope.overlayOnSlimmerThan) {
      this.scope.state = 'overlay-' + this.scope.position as State;
    } else {
      this.scope.state = 'side-' + this.scope.position as State;
    }
    this.onStateChange();
  }

  public toggle() {
    if (this.scope.state === 'hidden') {
      this.show();
    } else {
      this.hide();
    }
  }

  protected onToggle(targetId: string) {
    this.debug('toggle targetId', targetId);
    this.toggle();
  }

  protected initToggleButtonEventDispatcher() {
    if (this.toggleButtonEvents) {
      this.toggleButtonEvents.off('toggle', this.onToggle);
    }
    this.toggleButtonEvents = new EventDispatcher('bs4-toggle-button:' + this.scope.id);
    this.toggleButtonEvents.on('toggle', this.onToggle.bind(this));
  }

  protected initRouterEventDispatcher() {
    this.routerEvents.on('newPageReady', this.setStateByEnviroment.bind(this));
  }

  protected onHidden() {
    this.setContainersStyle();
    const translateX = this.scope.position === 'left' ? '-100%' : '100%';
    this.el.setAttribute('style', `transform:translateX(${translateX});width:${this.scope.width}px;`);
  }

  protected onSide(directon: State) {
    this.setContainersStyle(undefined, '', directon);
    this.el.setAttribute('style', `transform:translateX(0);width:${this.scope.width}px;`);
  }

  protected onOverlay(directon: State) {
    this.setContainersStyle(undefined, '', directon);
    this.el.setAttribute('style', `transform:translateX(0);width:${this.scope.width}px;`);
  }

  protected onStateChange() {
    this.debug('state changed: ' + this.scope.state);
    switch (this.scope.state) {
      case 'side-left':
      case 'side-right':
        this.onSide(this.scope.state);
        break;
        case 'overlay-left':
        case 'overlay-right':
          this.onOverlay(this.scope.state);
          break;
      default:
        this.onHidden();
        break;
    }
    if (this.toggleButtonEvents) {
      this.toggleButtonEvents.trigger('toggled', this.scope.state);
    }
  }

  protected get width() {
    return this.el.offsetWidth || this.scope.width;
  }

  protected setStateByEnviroment() {
    if (this.scope.forceHideOnLocationPathnames.includes(window.location.pathname)) {
      return this.hide();
    }
    const vw = Utils.getViewportDimensions().w;
    if (vw < this.scope.autoHideOnSlimmerThan) {
      return this.hide();
    }
    if (vw < this.scope.autoHideOnSlimmerThan) {
      return this.hide();
    }
    if (vw > this.scope.autoShowOnWiderThan) {
      return this.show();
    }
  }

  protected onResize() {
    this.setStateByEnviroment();
  }

  protected getContainers() {
    return this.scope.containerSelector ? document.querySelectorAll<HTMLUnknownElement>(this.scope.containerSelector) : undefined;
  }

  protected initContainers() {
    this.debug('initContainers', this.scope.containerSelector);
    const containers = this.getContainers();
    this.setContainersStyle(containers);
  }

  protected setContainersStyle(containers?: NodeListOf<HTMLUnknownElement>, style?: string, move?: State) {
    if (!containers) {
      containers = this.getContainers();
    }
    if (containers) {
      for (const container of containers) {
        this.setContainerStyle(container, style, move);
      }
    }
  }

  /**
   * Sets the container style, takes overs always the transition style of this sidebar
   * @param container
   * @param style
   * @param move
   */
  protected setContainerStyle(container: HTMLUnknownElement, style: string = '', move?: State) {
    if (move) {
      const width = this.width;
      const conStyle = window.getComputedStyle(container);
      switch (move) {
        case 'side-left':
          switch (conStyle.position) {
            case 'fixed':
              style += 'left:' + width + 'px';
              break;
            default:
              style += 'margin-left:' + width + 'px';
              break;
          }
          break;
        case 'side-right':
          switch (conStyle.position) {
            case 'fixed':
              style += 'right:' + width + 'px';
              break;
            default:
              style += 'margin-right:' + width + 'px';
              break;
          }
          break;
        default:
          break;
      }
    }
    return container.setAttribute('style', `transition:${this.style.transition};${style}`);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes)
    .then((view) => {
      return view;
    });
  }

  protected async beforeBind() {
    this.debug('beforeBind');
    this.setStateByEnviroment();
  }

  protected async afterBind() {
    this.debug('afterBind', this.scope);
    this.initRouterEventDispatcher();
  }

  protected requiredAttributes() {
    return ['id'];
  }

  protected parsedAttributeChangedCallback(attributeName: string, oldValue: any, newValue: any, namespace: string | null) {
    super.parsedAttributeChangedCallback(attributeName, oldValue, newValue, namespace);
    if (attributeName === 'containerSelector') {
      this.initContainers();
    }
    if (attributeName === 'id') {
      this.initToggleButtonEventDispatcher();
    }
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    // Only set the component template if there no childs already
    if (this.el.hasChildNodes()) {
      this.debug('Do not use template, because element has child nodes');
      return null;
    } else {
      this.debug('Use template', template);
      return template;
    }
  }
}
