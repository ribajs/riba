import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import { debounce } from "@ribajs/utils/src/control.js";
import { TOGGLE_BUTTON } from "../../constants/index.js";
import { TwService } from "../../services/tw.service.js";

export type SidebarState =
  | "hidden"
  | "side-left"
  | "side-right"
  | "overlap-left"
  | "overlap-right";

export type SidebarPosition = "left" | "right";
export type SidebarMode = "side" | "overlap";

interface Scope extends ScopeBase {
  containerSelector?: string;
  state: SidebarState;
  oldState: SidebarState;
  id?: string;
  width: string;
  position: SidebarPosition;
  mode: SidebarMode;
  autoShow: boolean;
  autoHide: boolean;
  watchNewPageReadyEvent: boolean;
  forceHideOnLocationPathnames: string[];
  forceShowOnLocationPathnames: string[];
  preventScrollingOnOverlap: boolean;
  hide: TwSidebarComponent["hide"];
  show: TwSidebarComponent["show"];
  toggle: TwSidebarComponent["toggle"];
}

export class TwSidebarComponent extends Component {
  public static tagName = "tw-sidebar";

  public static states: SidebarState[] = [
    "hidden",
    "side-left",
    "side-right",
    "overlap-left",
    "overlap-right",
  ];

  protected autobind = true;

  protected tw: TwService;

  static get observedAttributes(): string[] {
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
      "prevent-scrolling-on-overlap",
    ];
  }

  public events?: EventDispatcher;
  protected routerEvents = new EventDispatcher("main");

  protected defaults: Scope = {
    containerSelector: undefined,
    state: "hidden",
    oldState: "hidden",
    id: undefined,
    width: "16rem",
    position: "left",
    mode: "overlap",
    autoShow: false,
    autoHide: false,
    watchNewPageReadyEvent: true,
    forceHideOnLocationPathnames: [],
    forceShowOnLocationPathnames: [],
    preventScrollingOnOverlap: true,
    hide: this.hide.bind(this),
    show: this.show.bind(this),
    toggle: this.toggle.bind(this),
  };

  public scope: Scope = { ...this.defaults };

  constructor() {
    super();
    this.tw = TwService.getSingleton();
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

  public getShowMode(): SidebarState {
    return `${this.scope.mode}-${this.scope.position}` as SidebarState;
  }

  public hide() {
    this.setState("hidden");
  }

  public show() {
    this.setState(this.getShowMode());
  }

  public toggle() {
    if (this.scope.state === "hidden") {
      this.show();
    } else {
      this.hide();
    }
  }

  protected preventScrolling(scrollEl = document.body) {
    scrollEl.style.overflow = "hidden";
  }

  protected allowScrolling(scrollEl = document.body) {
    if (scrollEl.style.overflow === "hidden") {
      scrollEl.style.overflow = "";
    }
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TwSidebarComponent.observedAttributes);
    this.addEventListeners();
    this.onEnvironmentChanges();
  }

  protected onBreakpoint() {
    this.onEnvironmentChanges();
  }

  protected addEventListeners() {
    this.tw.events.on("breakpoint:changed", this.onBreakpoint, this);
  }

  protected removeEventListeners() {
    this.events?.off(TOGGLE_BUTTON.eventNames.init, this.triggerState, this);
    this.events?.off(TOGGLE_BUTTON.eventNames.toggle, this.toggle, this);
    this.routerEvents.off("newPageReady", this.onEnvironmentChanges, this);
    this.tw.events.off("breakpoint:changed", this.onBreakpoint, this);
  }

  protected initToggleButtonEventDispatcher() {
    if (this.events) {
      this.events.off(TOGGLE_BUTTON.eventNames.toggle, this.toggle, this);
      this.events.off(TOGGLE_BUTTON.eventNames.init, this.triggerState, this);
    }
    const namespace = TOGGLE_BUTTON.nsPrefix + this.scope.id;
    this.events = new EventDispatcher(namespace);
    this.events.on(TOGGLE_BUTTON.eventNames.toggle, this.toggle, this);
    this.events.on(TOGGLE_BUTTON.eventNames.init, this.triggerState, this);
  }

  protected initRouterEventDispatcher() {
    if (this.scope.watchNewPageReadyEvent) {
      this.routerEvents.on("newPageReady", this.onEnvironmentChanges, this);
    }
  }

  protected onHidden() {
    const translateX = this.scope.position === "left" ? "-100%" : "100%";
    this.style.transform = `translateX(${translateX})`;
    this.style.width = this.scope.width;
    this.setContainersStyle(this.scope.state);
    if (this.scope.preventScrollingOnOverlap) {
      this.allowScrolling();
    }
  }

  protected onSide(state: SidebarState) {
    this.style.transform = "translateX(0)";
    this.style.width = this.scope.width;
    this.setContainersStyle(state);
    if (this.scope.preventScrollingOnOverlap) {
      this.allowScrolling();
    }
  }

  protected onOverlap(state: SidebarState) {
    this.style.transform = "translateX(0)";
    this.style.width = this.scope.width;
    this.setContainersStyle(state);
    if (this.scope.preventScrollingOnOverlap) {
      this.preventScrolling();
    }
  }

  protected triggerState() {
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
      default:
        this.onHidden();
        break;
    }

    // Remove all state classes, then add the current one
    this.classList.remove(...TwSidebarComponent.states);
    this.classList.add(this.scope.state);

    if (this.events) {
      this.events.trigger(TOGGLE_BUTTON.eventNames.toggled, this.scope.state);
    }
    this.dispatchEvent(
      new CustomEvent(TOGGLE_BUTTON.eventNames.toggled, {
        detail: this.scope.state,
      }),
    );
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

  protected _onEnvironmentChanges() {
    this.setStateByEnvironment();
  }

  protected onEnvironmentChanges = debounce(
    this._onEnvironmentChanges.bind(this),
  );

  protected getContainers() {
    return this.scope.containerSelector
      ? document.querySelectorAll<HTMLElement>(this.scope.containerSelector)
      : undefined;
  }

  protected setContainersStyle(state: SidebarState) {
    const containers = this.getContainers() || [];
    for (let i = 0; i < containers.length; i++) {
      this.setContainerStyle(containers[i], state);
    }
  }

  protected setContainerStyle(container: HTMLElement, state: SidebarState) {
    const currStyle = container.style;
    const width = this.scope.width;

    switch (state) {
      case "side-left":
        currStyle.marginLeft = width;
        currStyle.marginRight = "";
        break;
      case "side-right":
        currStyle.marginRight = width;
        currStyle.marginLeft = "";
        break;
      case "hidden":
        currStyle.marginLeft = "";
        currStyle.marginRight = "";
        break;
      default:
        // Overlap modes do not shift the container
        break;
    }

    currStyle.transition = "margin 0.3s ease";
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
    namespace: string | null,
  ) {
    super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace,
    );
    switch (attributeName) {
      case "containerSelector":
        this.setContainersStyle(this.scope.state);
        break;
      case "id":
        this.initToggleButtonEventDispatcher();
        break;
      case "width":
        this.style.width = newValue;
        this.onStateChange();
        this.setContainersStyle(this.scope.state);
        break;
      case "mode":
        this.onStateChange();
        this.setContainersStyle(this.scope.state);
        break;
      case "autoHide":
      case "autoShow":
        this.setStateByEnvironment();
        break;
      default:
        break;
    }
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListeners();
  }

  protected template(): ReturnType<TemplateFunction> {
    if (!hasChildNodesTrim(this)) {
      console.warn(
        "[tw-sidebar] No child elements found. Provide sidebar content as children.",
      );
    }
    return null;
  }
}
