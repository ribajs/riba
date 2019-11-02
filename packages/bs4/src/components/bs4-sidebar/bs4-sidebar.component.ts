import {
  Component,
  Debug,
  EventDispatcher,
  Utils,
} from '@ribajs/core';

import template from './bs4-sidebar.component.html';

type State = 'overlay-left' | 'overlay-right' | 'side-left' | 'side-right' | 'hidden';

interface IScope {
  /**
   * Selector string to get the container element from DOM
   */
  containerSelector?: string;
  /**
   * The current state of the sidebar, can be `'hidden'`, `'side-left'`, `'side-right'`, `'overlay-left'` or `'overlay-right'`
   */
  state: State;
  /**
   * The 'id' is required to react to events of the `bs4-toggle-button`, the `target-id` attribute of the `bs4-toggle-button` must be identical to this `id`
   */
  id?: string;
  /**
   * The width of the sidebar
   */
  width: number;

  // Options
  /**
   * The sidebar can be positioned `right` or `left`
   */
  position: 'left' | 'right';
  /**
   * Auto show the sidebar if the viewport width is wider than this value
   */
  autoShowOnWiderThan: number;
  /**
   * Auto hide the sidebar if the viewport width is slimmer than this value
   */
  autoHideOnSlimmerThan: number;
  /**
   * You can force to hide the sidebar on corresponding URL pathames e.g. you can hide the sidebar on home with `['/']`.
   */
  forceHideOnLocationPathnames: Array<string>;
  /**
   * Like `force-hide-on-location-pathnames`, but to force to open the sidebar
   */
  forceShowOnLocationPathnames: Array<string>;
  /**
   * If the viewport width is wider than this value the sidebar adds a margin to the container (detected with the `container-selector`) to reduce its content, if the viewport width is slimmer than this value the sidebar opens over the content
   */
  overlayOnSlimmerThan: number;

  // Template methods
  /**
   * Hides / closes the sidebar
   */
  hide: Bs4SidebarComponent['hide'];
  /**
   * Shows / opens the sidebar
   */
  show: Bs4SidebarComponent['show'];
  /**
   * Toggles (closes or opens) the sidebar
   */
  toggle: Bs4SidebarComponent['toggle'];
}

export class Bs4SidebarComponent extends Component {

  public static tagName: string = 'bs4-sidebar';

  protected style: CSSStyleDeclaration;

  protected autobind = true;

  static get observedAttributes() {
    return ['id', 'container-selector', 'position', 'width', 'auto-show-in-wider-than', 'auto-hide-on-slimmer-than', 'force-hide-on-location-pathnames', 'force-show-on-location-pathnames', 'overlay-on-slimmer-than'];
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
    forceShowOnLocationPathnames: [],
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
    window.addEventListener('resize', this.onEnviromentChanges.bind(this), false);
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
    this.routerEvents.on('newPageReady', this.onEnviromentChanges.bind(this));
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
    if (this.scope.forceShowOnLocationPathnames.includes(window.location.pathname)) {
      return this.show();
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

  /**
   * If vieport size changes, location url changes or something else
   */
  protected onEnviromentChanges() {
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
    this.initRouterEventDispatcher();
    this.onEnviromentChanges();
  }

  protected async afterBind() {
    this.debug('afterBind', this.scope);
    this.onEnviromentChanges();
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
