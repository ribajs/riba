import {
  EventDispatcherInstances,
  Events,
  EventCallback,
  BoundEventCallback,
} from "../interfaces/event-dispatcher";

/**
 * Little Dispatcher inspired by MicroEvent.js
 *
 * @type {object}
 */
export class EventDispatcher {
  public static instances: EventDispatcherInstances = {};

  public static getInstance(namespace: string) {
    const result = EventDispatcher.instances[namespace];
    if (!result) {
      throw new Error(
        `No EventDispatcher instance with namespace ${namespace} found!`
      );
    }
    return result;
  }

  /**
   * Object that keeps all the events
   *
   * @readOnly
   * @type {object}
   */
  private events: Events = {};

  private namespace: string;

  /**
   * Creates an singleton instance of Dispatcher.
   */
  constructor(namespace = "main") {
    this.namespace = namespace;

    if (EventDispatcher.instances[this.namespace]) {
      return EventDispatcher.instances[this.namespace];
    }

    EventDispatcher.instances[this.namespace] = this;
    return EventDispatcher.instances[this.namespace];
  }

  /**
   * Bind a callback to an event
   *
   * @param eventName
   * @param function
   * @param thisContext
   */
  public on(eventName: string, cb: EventCallback, thisContext?: any) {
    this.events[eventName] = this.events[eventName] || [];
    if (typeof thisContext !== "undefined") {
      this.events[eventName].push({
        function: cb.bind(thisContext),
        originalFunction: cb,
        thisConext: thisContext,
      });
    } else {
      this.events[eventName].push(cb);
    }
  }

  /**
   * TODO unbind all instead of first one
   * Unbind event
   *
   * @param eventName
   * @param function
   */
  public off(eventName: string, cb?: EventCallback, thisContext?: any) {
    if (eventName in this.events === false) {
      return;
    }
    if (cb !== undefined) {
      let idx = this.events[eventName].indexOf(cb);
      for (let i = 0; i < this.events[eventName].length; i++) {
        const curEvent: any = this.events[eventName][i];
        if (curEvent.originalFunction && curEvent.thisContext) {
          if (typeof thisContext !== "undefined") {
            if (curEvent.thisContext !== thisContext) {
              continue;
            }
          }
          if (curEvent.originalFunction !== cb) {
            continue;
          }
          idx = i;
          break;
        }
      }
      if (idx !== -1) {
        this.events[eventName].splice(idx, 1);
      }
    } else {
      this.events[eventName] = [];
    }
  }

  /**
   * Fire the event running all the event associated to it
   *
   * @param eventName
   * @param args
   */
  public trigger(eventName: string, ...args: any[]) {
    // e, ...args
    if (eventName in this.events === false) {
      return;
    }

    for (let i = 0; i < this.events[eventName].length; i++) {
      if (this.events[eventName][i]) {
        (this.events[eventName][i] as BoundEventCallback).function.apply(
          this,
          args
        );
      } else {
        (this.events[eventName][i] as EventCallback).apply(this, args);
      }
    }
  }
}
