import { EventDispatcher } from "@ribajs/events";
import type { State } from "@ribajs/history";
import type {
  ComponentLifecycleEventData,
  ComponentLifecycleObject,
  ComponentLifecycleStates,
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
    LifecycleService.instance = new LifecycleService();
    return LifecycleService.instance;
  }

  protected getEmpty(): ComponentLifecycleObject {
    return {
      components: [],
    };
  }

  protected addEventListeners() {
    this.events.on(
      "Component:connected",
      (data: ComponentLifecycleEventData) => {
        this.resetTimeout();

        this.components[data.tagName] =
          this.components[data.tagName] || this.getEmpty();
        this.components[data.tagName].components.push(data.component);
      }
    );

    this.events.on("Component:disconnected", () => {
      this.resetTimeout();
      this.checkStates();
    });

    this.events.on("Component:afterBind", () => {
      this.resetTimeout();
      this.checkStates();
    });

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
          this.checkStates();
        }
      }
    );
  }

  protected getState(tagName: string) {
    let connected = 0;
    let bound = 0;

    for (const component of this.components[tagName].components) {
      if (component.connected) {
        connected++;

        if (component.bound) {
          bound++;
        }
      }
    }

    return {
      connected,
      bound,
    };
  }

  protected getStates() {
    const states: {
      [tagName: string]: ComponentLifecycleStates;
    } = {};

    for (const tagName in this.components) {
      const state = this.getState(tagName);

      states[tagName] = {
        state,
        components: this.components[tagName].components,
      };
    }

    return states;
  }

  protected checkStates() {
    let allBound = true;
    const states = this.getStates();
    for (const tagName in states) {
      const state = states[tagName].state;
      if (state.connected !== state.bound) {
        allBound = false;
        break;
      }
    }
    if (allBound) {
      this.onAllBound();
    }
    return {
      states,
      allBound,
    };
  }

  protected onAllBound() {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.events.trigger("ComponentLifecycle:allBound", this.components);
    if (this.debug) console.debug("[ComponentLifecycle] All components bound!");
  }

  protected onTimeout() {
    const states = this.getStates();
    if (Object.keys(states).length <= 0) {
      console.warn("No component found");
      return;
    }
    this.events.trigger("ComponentLifecycle:timeout", this.components);
    console.error(
      "[ComponentLifecycle] Timeout! Make sure you call the super.connectedCallback and super.afterBind methods exactly one time in all your components."
    );

    console.error("[ComponentLifecycle] Unfinished components:");
    for (const tagName in states) {
      const state = states[tagName].state;
      if (state.connected !== state.bound) {
        console.error(`${tagName}`, states[tagName].state);
      }
    }
  }

  protected resetTimeout() {
    if (this.debug) console.debug("[ComponentLifecycle] reset timeout..");
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(
      this.onTimeout.bind(this),
      this.timeoutDelay
    );
    return this.timeout;
  }

  protected reset() {
    if (this.debug) console.debug("[ComponentLifecycle] reset!");
    this.components = {};
    this.resetTimeout();
  }
}
