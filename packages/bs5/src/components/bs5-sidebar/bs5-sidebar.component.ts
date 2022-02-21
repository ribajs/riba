import { Component, TemplateFunction } from "@ribajs/core";
import { TouchEventsService, TouchSwipeData } from "@ribajs/extras";
import { EventDispatcher } from "@ribajs/events";
import { TOGGLE_BUTTON } from "../../constants";
import { Bs5Service } from "../../services";
import { JsxBs5SidebarProps, Bs5SidebarComponentScope, SidebarState } from "../../types";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import { debounce } from "@ribajs/utils/src/control";

export class Bs5SidebarComponent extends Component {
  public static tagName = "bs5-sidebar";

  protected computedStyle?: CSSStyleDeclaration;

  protected autobind = true;

  public _debug = false;

  protected bs5: Bs5Service;

  protected touch: TouchEventsService = new TouchEventsService(this);

  static get observedAttributes(): (keyof JsxBs5SidebarProps)[] {
    return [
      "id",
      "container-selector",
      "position",
      "mode",
      "width",
      "auto-show",
      "auto-hide",
      "force-hide-on-location-pathnames",
      "force-show-on-location-pathnames",
      "watch-new-page-ready-event",
      "close-on-swipe",
    ];
  }

  public events?: EventDispatcher;

  protected routerEvents = new EventDispatcher("main");

  public defaults: Bs5SidebarComponentScope = {
    // Template properties
    containerSelector: undefined,
    state: "hidden",
    oldState: "hidden",
    id: undefined,
    width: "250px",

    // Options
    position: "left",
    mode: "overlap",
    autoShow: false,
    autoHide: false,
    watchNewPageReadyEvent: true,
    forceHideOnLocationPathnames: [],
    forceShowOnLocationPathnames: [],
    closeOnSwipe: true,

    // Template methods
    hide: this.hide,
    show: this.show,
    toggle: this.toggle,
  };

  public scope: Bs5SidebarComponentScope = {
    ...this.defaults,
  };

  constructor() {
    super();
    this.bs5 = Bs5Service.getSingleton();
    // assign this to bound version, so we can remove window EventListener later without problem
    this.onEnvironmentChanges = this.onEnvironmentChanges.bind(this);
  }

  public setState(state: SidebarState) {
    this.scope.oldState = this.scope.state;
    this.scope.state = state;
    this.onStateChange();
  }

  public getState() {
    return this.scope.state;
  }

  public getShowMode() {
    const mode: SidebarState =
      `${this.scope.mode}-${this.scope.position}` as SidebarState;
    return mode;
  }

  public hide() {
    this.setState("hidden");
  }

  public show() {
    const state = this.getShowMode();
    this.setState(state);
  }

  public toggle() {
    this.debug("toggle state: " + this.scope.state);
    if (this.scope.state === "hidden") {
      this.show();
    } else {
      this.hide();
    }
    this.debug("toggled state: " + this.scope.state);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs5SidebarComponent.observedAttributes);
    this.computedStyle = window.getComputedStyle(this);
    this.addEventListeners();
    // initial
    this.onEnvironmentChanges();
  }

  protected addEventListeners() {
    window.addEventListener("resize", this.onEnvironmentChanges, {
      passive: true,
    });
    this.addEventListener("swipe" as any, this.onSwipe);
  }

  protected removeEventListeners() {
    this.events?.off(TOGGLE_BUTTON.eventNames.init, this.triggerState, this);
    this.events?.off(TOGGLE_BUTTON.eventNames.toggle, this.toggle, this);
    this.routerEvents.off("newPageReady", this.onEnvironmentChanges, this);
    window.removeEventListener("resize", this.onEnvironmentChanges);
  }

  protected initToggleButtonEventDispatcher() {
    if (this.events) {
      this.events.off(TOGGLE_BUTTON.eventNames.toggle, this.toggle, this);
      this.events.off(TOGGLE_BUTTON.eventNames.init, this.triggerState, this);
    }
    const namespace = TOGGLE_BUTTON.nsPrefix + this.scope.id;
    this.debug(`Init event dispatcher for namespace  ${namespace}`);
    this.events = new EventDispatcher(namespace);
    this.events.on(TOGGLE_BUTTON.eventNames.toggle, this.toggle, this);
    this.events.on(TOGGLE_BUTTON.eventNames.init, this.triggerState, this);
  }

  protected initRouterEventDispatcher() {
    if (this.scope.watchNewPageReadyEvent) {
      this.routerEvents.on("newPageReady", this.onEnvironmentChanges, this);
    }
  }

  protected _onSwipe(event: CustomEvent<TouchSwipeData>) {
    if (!this.scope.closeOnSwipe) {
      return;
    }
    if (this.scope.state === "side-left" || this.scope.state === "side-right") {
      return;
    }
    if (this.scope.position === "left" && event.detail.direction === "left") {
      this.hide();
    }

    if (this.scope.position === "right" && event.detail.direction === "right") {
      this.hide();
    }
  }

  protected onSwipe = this._onSwipe.bind(this);

  protected onHidden() {
    const translateX = this.scope.position === "left" ? "-100%" : "100%";
    this.style.transform = `translateX(${translateX})`;
    this.width = this.scope.width;
    this.setContainersStyle(this.scope.state);
  }

  protected onMove(state: SidebarState) {
    this.style.transform = `translateX(0)`;
    this.style.width = this.scope.width;
    this.width = this.scope.width;
    this.setContainersStyle(state);
  }

  protected onSide(state: SidebarState) {
    this.style.transform = `translateX(0)`;
    this.style.width = this.scope.width;
    this.width = this.scope.width;
    this.setContainersStyle(state);
  }

  protected onOverlap(state: SidebarState) {
    this.style.transform = `translateX(0)`;
    this.width = this.scope.width;
    this.setContainersStyle(state);
  }

  protected triggerState() {
    // Global event
    this.events?.trigger("state", this.scope.state);
  }

  protected onStateChange() {
    switch (this.scope.state) {
      case "side-left":
      case "side-right":
        this.onSide(this.scope.state);
        break;
      case "overlap-left":
      case "overlap-right":
        this.onOverlap(this.scope.state);
        break;
      case "move-left":
      case "move-right":
        this.onMove(this.scope.state);
        break;
      default:
        this.onHidden();
        break;
    }
    if (this.events) {
      this.events.trigger(TOGGLE_BUTTON.eventNames.toggled, this.scope.state);
    }
    this.dispatchEvent(
      new CustomEvent(TOGGLE_BUTTON.eventNames.toggled, {
        detail: this.scope.state,
      })
    );
  }

  protected get width() {
    if (this.scope.width === this.defaults.width) {
      return this.offsetWidth + "px";
    }
    return this.scope.width;
  }

  protected set width(width: string) {
    this.scope.width = width;
    this.style.width = width;
  }

  protected setStateByEnvironment() {
    if (
      this.scope.forceHideOnLocationPathnames.includes(window.location.pathname)
    ) {
      return this.hide();
    }
    if (
      this.scope.forceShowOnLocationPathnames.includes(window.location.pathname)
    ) {
      return this.show();
    }
    if (this.scope.autoHide) {
      return this.hide();
    }
    if (this.scope.autoShow) {
      return this.show();
    }
  }

  /**
   * Internal (not debounced) version of `onEnvironmentChanges`.
   */
  protected _onEnvironmentChanges() {
    this.setStateByEnvironment();
  }

  /**
   * If viewport size changes, location url changes or something else.
   */
  protected onEnvironmentChanges = debounce(
    this._onEnvironmentChanges.bind(this)
  );

  protected getContainers() {
    return this.scope.containerSelector
      ? document.querySelectorAll<HTMLUnknownElement>(
          this.scope.containerSelector
        )
      : undefined;
  }

  protected initContainers(state: SidebarState) {
    this.setContainersStyle(state);
  }

  protected setContainersStyle(state: SidebarState) {
    const containers:
      | NodeListOf<HTMLUnknownElement>
      | Array<HTMLUnknownElement> = this.getContainers() || [];

    if (containers) {
      for (let i = 0; i < containers.length; i++) {
        const container = containers[i];
        this.setContainerStyle(container, state);
      }
    }
  }

  /**
   * Sets the container style, takes overs always the transition style of this sidebar
   * @param container
   * @param style
   * @param state
   */
  protected setContainerStyle(
    container: HTMLUnknownElement,
    state: SidebarState
  ) {
    const currStyle = container.style;
    if (state) {
      const width = this.width;
      const conStyle = window.getComputedStyle(container);

      if (this.scope.mode === "move" && state.startsWith("overlap-")) {
        switch (conStyle.position) {
          case "fixed":
          case "absolute":
            currStyle.left = "0";
            currStyle.right = "0";
            break;
          default:
            currStyle.marginLeft = "0";
            currStyle.marginRight = "0";
            break;
        }
      }

      switch (state) {
        case "side-left":
          switch (conStyle.position) {
            case "fixed":
            case "absolute":
              currStyle.left = width;
              break;
            default:
              currStyle.marginLeft = width;
              break;
          }
          break;
        case "side-right":
          switch (conStyle.position) {
            case "fixed":
            case "absolute":
              currStyle.right = width;
              break;
            default:
              currStyle.marginRight = width;
              break;
          }
          break;
        case "move-left":
          switch (conStyle.position) {
            case "fixed":
            case "absolute":
              currStyle.left = width;
              currStyle.right = `-${width}`;
              break;
            default:
              currStyle.marginLeft = width;
              currStyle.marginRight = `-${width}`;
              break;
          }
          break;
        case "move-right":
          switch (conStyle.position) {
            case "fixed":
            case "absolute":
              currStyle.right = width;
              currStyle.left = `-${width}`;
              break;
            default:
              currStyle.marginRight = width;
              currStyle.marginLeft = `-${width}`;
              break;
          }
          break;
        case "hidden":
          switch (this.scope.oldState) {
            case "side-left":
              switch (conStyle.position) {
                case "fixed":
                case "absolute":
                  currStyle.left = "0";
                  break;
                default:
                  currStyle.marginLeft = "0";
                  break;
              }
              break;
            case "side-right":
              switch (conStyle.position) {
                case "fixed":
                case "absolute":
                  currStyle.right = "0";
                  break;
                default:
                  currStyle.marginRight = "0";
                  break;
              }
              break;
            case "move-left":
              switch (conStyle.position) {
                case "fixed":
                case "absolute":
                  currStyle.left = "0";
                  currStyle.right = "0";
                  break;
                default:
                  currStyle.marginRight = "0";
                  currStyle.marginLeft = "0";
                  break;
              }
              break;
            case "move-right":
              switch (conStyle.position) {
                case "fixed":
                case "absolute":
                  currStyle.right = "0";
                  currStyle.left = "0";
                  break;
                default:
                  currStyle.marginRight = "0";
                  currStyle.marginLeft = "0";
                  break;
              }
              break;
            default:
              break;
          }

        default:
          break;
      }
    }
    container.style.transition = this.computedStyle
      ? this.computedStyle.transition
      : "";
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.scope.oldState = this.getShowMode();
    this.initRouterEventDispatcher();
    return this.onEnvironmentChanges();
  }

  protected async afterBind() {
    this.onEnvironmentChanges();
    await super.afterBind();
  }

  protected requiredAttributes(): string[] {
    return ["id"];
  }

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace
    );
    if (attributeName === "containerSelector") {
    }
    if (attributeName === "id") {
      this.initToggleButtonEventDispatcher();
    }
    switch (attributeName) {
      case "containerSelector":
        this.initContainers(this.scope.state);
        break;
      case "id":
        this.initToggleButtonEventDispatcher();
        break;
      case "width":
        this.width = newValue;
      case "mode":
        this.onStateChange();
        this.initContainers(this.scope.state);
        break;
      case "autoHide":
      case "autoShow":
        this.setStateByEnvironment();
        break;
      default:
        break;
    }
  }

  // deconstruction
  protected disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListeners();
  }

  protected template(): ReturnType<TemplateFunction> {
    if (!hasChildNodesTrim(this)) {
      console.warn(
        "No child elements found, this component as no template so you need to define your own as child of this component."
      );
    }
    return null;
  }
}
