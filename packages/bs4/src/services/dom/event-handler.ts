/**
 * see see https://github.com/twbs/bootstrap/blob/master/js/src/dom/event-handler.js
 */
class EventHandler {
  public static on<T>(
    element: HTMLElement | Document | Window,
    eventName: string,
    handler: EventListenerOrEventListenerObject
  ) {
    return element.addEventListener(eventName as any, handler, {});
  }

  public static one<T>(
    element: HTMLElement | Document | Window,
    eventName: string,
    handler: EventListenerOrEventListenerObject
  ) {
    return element.addEventListener(eventName as any, handler, { once: true });
  }

  public static off<T>(
    element: HTMLElement | Document | Window,
    originalTypeEvent: string,
    handler: EventListenerOrEventListenerObject
  ) {
    return element.removeEventListener(originalTypeEvent as any, handler);
  }

  public static trigger<T = any>(
    element: HTMLElement | Document | Window,
    eventName: string,
    extraParameters: any = {}
  ) {
    const event = new CustomEvent<T>(eventName, {
      detail: extraParameters,
    });
    element.dispatchEvent(event);
    return event;
  }
}

export default EventHandler;
