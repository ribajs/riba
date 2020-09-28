type EventCallback = (...args: any[]) => any;

interface Events {
  [eventName: string]: EventCallback[];
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
   */
  public on(e: string, f: EventCallback) {
    this.events[e] = this.events[e] || [];
    this.events[e].push(f);
  }

  /**
   * Unbind event
   *
   * @param eventName
   * @param function
   */
  public off(e: string, f: EventCallback) {
    if (e in this.events === false) {
      return;
    }

    const idx = this.events[e].indexOf(f);
    if (idx !== -1) {
      this.events[e].splice(idx, 1);
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
      this.events[e][i].apply(this, args);
    }
  }
}

export { EventDispatcher };
