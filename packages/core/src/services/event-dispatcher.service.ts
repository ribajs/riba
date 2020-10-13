type EventCallback = (...args: any[]) => any;
type BoundEventCallback = {
  function: EventCallback;
  originalFunction: EventCallback;
  thisConext: any;
};

interface Events {
  [eventName: string]: (EventCallback | BoundEventCallback)[];
}

export interface EventDispatcherInstances {
  [key: string]: EventDispatcher;
}

/**
 * Little Dispatcher inspired by MicroEvent.js
 *
 * @type {object}
 */
class EventDispatcher {
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
  public on(e: string, f: EventCallback, thisContext?: any) {
    this.events[e] = this.events[e] || [];
    if (typeof thisContext !== "undefined") {
      this.events[e].push({
        function: f.bind(thisContext),
        originalFunction: f,
        thisConext: thisContext,
      });
    } else {
      this.events[e].push(f);
    }
  }

  /**
   * TODO unbind all instead of first one
   * Unbind event
   *
   * @param eventName
   * @param function
   */
  public off(e: string, f?: EventCallback, thisContext?: any) {
    if (e in this.events === false) {
      return;
    }
    if (f !== undefined) {
      let idx = this.events[e].indexOf(f);
      for (let i = 0; i < this.events[e].length; i++) {
        const curEvent: any = this.events[e][i];
        if (curEvent.originalFunction && curEvent.thisContext) {
          if (typeof thisContext !== "undefined") {
            if (curEvent.thisContext !== thisContext) {
              continue;
            }
          }
          if (curEvent.originalFunction !== f) {
            continue;
          }
          idx = i;
          break;
        }
      }
      if (idx !== -1) {
        this.events[e].splice(idx, 1);
      }
    } else {
      this.events[e] = [];
    }
  }

  /**
   * Fire the event running all the event associated to it
   *
   * @param eventName
   * @param args
   */
  public trigger(e: string, ...args: any[]) {
    // e, ...args
    if (e in this.events === false) {
      return;
    }

    for (let i = 0; i < this.events[e].length; i++) {
      if ((this.events[e][i] as BoundEventCallback).function) {
        (this.events[e][i] as BoundEventCallback).function.apply(this, args);
      } else {
        (this.events[e][i] as EventCallback).apply(this, args);
      }
    }
  }
}

export { EventDispatcher };
