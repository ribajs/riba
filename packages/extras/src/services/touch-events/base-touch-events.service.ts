export abstract class BaseTouchEventsService {
  protected touchCapable = "ontouchstart" in window;
  /** The element to trigger the events on */
  protected el: HTMLUnknownElement | Window;
  public get isTouchCapable() {
    return this.touchCapable;
  }
  constructor(el: HTMLUnknownElement | Window) {
    this.el = el;
  }

  protected triggerCustomEvent(
    eventName: string,
    originalEvent: Event,
    extraParameters: any = {}
  ) {
    extraParameters.originalEvent = originalEvent;
    extraParameters.target = originalEvent.target;
    // create and dispatch the event
    const event = new CustomEvent(eventName, {
      detail: extraParameters,
    });
    this.el.dispatchEvent(event);
  }
}
