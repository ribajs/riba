import { EventDispatcher } from "@ribajs/events";
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
  protected routerEvents = EventDispatcher.getInstance();
  protected static instance: LifecycleService;

  protected components: {
    [name: string]: ComponentLifecycleObject;
  } = {};

  protected constructor() {
    this.addEventListeners();
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
        console.debug(
          "[ComponentLifecycle] New component bound: " + data.tagName
        );
        this.checkState();
      }
    );

    // Router
    this.routerEvents.on("initStateChange", () => {
      console.debug("[ComponentLifecycle] Reset!");
      this.reset();
    });

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
      this.events.trigger("ComponentLifecycle:allBound", this.components);
      console.debug("[ComponentLifecycle] All components bound!");
    }
  }

  protected reset() {
    this.components = {};
  }
}
