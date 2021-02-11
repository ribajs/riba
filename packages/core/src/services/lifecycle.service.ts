import { EventDispatcher } from "@ribajs/events";
import type { State } from "@ribajs/history";
import type {
  ComponentLifecycleEventData,
  ComponentLifecycleObject,
} from "../interfaces";

/**
 * Component lifecycle control service.
 * Useful to check if all current components are bound and ready.
 */
export class LifecycleService {
  public events = EventDispatcher.getInstance("lifecycle");
  public timeoutDelay = 3000;
  protected debug = false;
  protected routerEvents = EventDispatcher.getInstance();
  protected timeout: number | null = null;
  protected static instance: LifecycleService;

  protected components: {
    [name: string]: ComponentLifecycleObject;
  } = {};

  protected constructor() {
    this.addEventListeners();
    this.reset();
    LifecycleService.instance = this;
  }

  public static getInstance() {
    if (LifecycleService.instance) {
      return LifecycleService.instance;
    }
    return new LifecycleService();
  }

  protected getEmpty(): ComponentLifecycleObject {
    return {
      connected: 0,
      bound: 0,
    };
  }

  protected addEventListeners() {
    this.events.on(
      "Component:connected",
      (data: ComponentLifecycleEventData) => {
        this.components[data.tagName] =
          this.components[data.tagName] || this.getEmpty();

        this.components[data.tagName].connected++;
        if (this.debug)
          console.debug(
            "[ComponentLifecycle] New component connected: " + data.tagName
          );
      }
    );

    this.events.on(
      "Component:afterBind",
      (data: ComponentLifecycleEventData) => {
        this.components[data.tagName] =
          this.components[data.tagName] || this.getEmpty();

        this.components[data.tagName].bound++;
        if (this.debug)
          console.debug(
            "[ComponentLifecycle] New component bound: " + data.tagName
          );
        this.checkState();
      }
    );

    // Router

    this.routerEvents.on(
      "newPageReady",
      (
        viewId: string,
        newStatus: State,
        oldStatus: State,
        container: HTMLElement,
        containerHtml: string,
        dataset: any,
        firstPageLoad: boolean
      ) => {
        if (this.debug)
          console.debug(
            "newPageReady",
            viewId,
            newStatus,
            oldStatus,
            "firstPageLoad",
            firstPageLoad
          );
        if (!firstPageLoad) {
          this.reset();
        }
      }
    );

    // this.routerEvents.on(
    //   "initStateChange",
    //   (viewId: string, newStatus: State, oldStatus: State) => {
    //     console.debug("initStateChange", viewId, newStatus, oldStatus);
    //   }
    // );

    // this.routerEvents.on("transitionCompleted", () => {
    //   console.debug("transitionCompleted");
    // });

    // this.routerEvents.on("newPageReady", () => {
    //   console.debug("newPageReady");
    // });
  }

  protected checkState() {
    let allBound = true;
    for (const tagName in this.components) {
      allBound =
        allBound &&
        this.components[tagName].connected === this.components[tagName].bound;
      if (!allBound) {
        break;
      }
    }
    if (allBound) {
      this.onAllBound();
    }
  }

  protected onAllBound() {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.events.trigger("ComponentLifecycle:allBound", this.components);
    if (this.debug) console.debug("[ComponentLifecycle] All components bound!");
  }

  protected onTimeout() {
    this.events.trigger("ComponentLifecycle:timeout", this.components);
    console.error(
      "[ComponentLifecycle] Timeout! Make sure you call the super.connectedCallback and super.afterBind methods exactly one time in all your components."
    );
  }

  protected reset() {
    if (this.debug) console.debug("[ComponentLifecycle] reset!");
    this.components = {};
    this.timeout = window.setTimeout(
      this.onTimeout.bind(this),
      this.timeoutDelay
    );
  }
}
