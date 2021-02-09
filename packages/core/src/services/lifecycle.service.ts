import { EventDispatcher } from "@ribajs/events";
import type { ComponentLifecycleEventData } from "../interfaces";

/**
 * Component lifecycle control service.
 * Useful to check if all current components are bound and ready.
 */
export class LifecycleService {
  public events = EventDispatcher.getInstance("lifecycle");
  protected routerEvents = EventDispatcher.getInstance();
  protected static instance: LifecycleService;

  protected components: {
    [name: string]: "connected" | "binding" | "bound";
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

  protected addEventListeners() {
    this.events.on(
      "Component:connected",
      (data: ComponentLifecycleEventData) => {
        this.components[data.id] = "connected";
        console.debug(
          "[ComponentLifecycle] New component connected: " + data.id
        );
      }
    );

    this.events.on(
      "Component:beforeBind",
      (data: ComponentLifecycleEventData) => {
        this.components[data.id] = "binding";
        console.debug("[ComponentLifecycle] New component binding: " + data.id);
      }
    );

    this.events.on(
      "Component:afterBind",
      (data: ComponentLifecycleEventData) => {
        this.components[data.id] = "bound";
        console.debug("[ComponentLifecycle] New component bound: " + data.id);
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
    for (const id in this.components) {
      allBound = allBound && this.components[id] === "bound";
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
