export interface Settings {
  tap_pixel_range: number;
  swipe_h_threshold: number;
  swipe_v_threshold: number;
  taphold_threshold: number;
  doubletap_int: number;
  shake_threshold: number;

  touch_capable: boolean;
  orientation_support: boolean;

  startevent: 'touchstart' | 'mousedown';
  endevent: 'touchend' | 'mouseup';
  moveevent: 'touchmove' | 'mousemove';
  tapevent: 'tap' | 'click';
  scrollevent: 'touchmove' | 'scroll';
}

export interface Position {
  x: number;
  y: number;
}

export interface Offset {
  x: number;
  y: number;
}

export interface TouchData {
  position: Position;
  offset: Offset;
  time: number;
  target: EventTarget | null;
}

const instances: TouchEventService[] = [];

export class TouchEventService {

  // GETTERS Convenience functions:

  public get isTouchCapable() {
    return this.settings.touch_capable;
  }

  public get startEvent() {
    return this.settings.startevent;
  }

  public get endEvent() {
    return this.settings.endevent;
  }

  public get moveEvent() {
    return this.settings.moveevent;
  }

  public get tapEvent() {
    return this.settings.tapevent;
  }

  public get scrollEvent() {
    return this.settings.scrollevent;
  }

  // SETTERS:

  /** Set the X threshold of swipe events */
  public set swipeThresholdX( threshold: number ) {
    if ( typeof threshold !== 'number' ) { throw new Error('Threshold parameter must be a type of number'); }
    this.settings.swipe_h_threshold = threshold;
  }

  /** Set the Y threshold of swipe events */
  public set swipeThresholdY( threshold: number ) {
    if ( typeof threshold !== 'number' ) { throw new Error('Threshold parameter must be a type of number'); }
    this.settings.swipe_v_threshold = threshold;
  }

  /** Set the double tap interval */
  public set doubleTapInt( interval: number ) {
    if ( typeof interval !== 'number' ) { throw new Error('Interval parameter must be a type of number'); }
    this.settings.doubletap_int = interval;
  }

  /** Set the taphold threshold */
  public set tapHoldThreshold( threshold: number ) {
    if ( typeof threshold !== 'number' ) { throw new Error('Threshold parameter must be a type of number'); }
    this.settings.taphold_threshold = threshold;
  }

  /** Set the pixel range for tapas */
  public set tapRange( range: number ) {
    if ( typeof range !== 'number' ) { throw new Error('Ranger parameter must be a type of number'); }
    this.settings.tap_pixel_range = range;
  }

  /**
   * Get the instance from the instance array by the index from the data attribute
   */
  public static getInstance(index: number) {
    return instances[index];
  }

  protected startPosition: Position = {
    x: 0,
    y: 0,
  };

  protected endPosition: Position = {
    x: 0,
    y: 0,
  };

  protected tapheld = false;

  protected startTime: number = 0;

  protected holdTimer: number = -1;
  protected tapTimer: number = -1;
  protected settings: Settings;

  constructor(readonly el: HTMLElement, settings: Settings = {
    tap_pixel_range: 5,
    swipe_h_threshold: 50,
    swipe_v_threshold: 50,
    taphold_threshold: 750,
    doubletap_int: 500,
    shake_threshold: 15,
    orientation_support: ('orientation' in window && 'onorientationchange' in window),
    touch_capable: false,

    startevent:  'touchstart',
    endevent:    'touchend',
    moveevent:   'touchmove',
    tapevent:    'tap',
    scrollevent: 'touchmove',
  }) {
    // Set settings by device type
    settings.touch_capable = ('ontouchstart' in window);
    settings.startevent = (settings.touch_capable ) ? 'touchstart' : 'mousedown';
    settings.endevent = (settings.touch_capable ) ? 'touchend' : 'mouseup';
    settings.moveevent = (settings.touch_capable ) ? 'touchmove' : 'mousemove';
    settings.tapevent = (settings.touch_capable ) ? 'tap' : 'click';
    settings.scrollevent = (settings.touch_capable ) ? 'touchmove' : 'scroll';

    this.settings = settings;

    if (this.el.dataset.touchEvents) {
      return TouchEventService.getInstance(Number(this.el.dataset.touchEvents));
    } else {
      this.setInstance(this);
    }

    this.addEventListeners();
  }

  public removeEventListeners() {
    this.el.removeEventListener<any>(this.settings.startevent, this.onStartEvent.bind(this));
    this.el.removeEventListener<any>(this.settings.moveevent, this.onMoveEvent.bind(this));
    this.el.removeEventListener<any>(this.settings.endevent, this.onEndEvent.bind(this));
    this.el.removeEventListener<any>(this.settings.scrollevent, this.onScrollEvent.bind(this));
  }

  /**
   * Set the instance in the instance array and sets the index to the data attribute
   */
  protected setInstance(instance: TouchEventService) {
    instances.push(instance);
    this.el.setAttribute('data-touch-events', (instances.length - 1).toString());
    return instances.length - 1;
  }

  protected triggerCustomEvent(eventName: string, extraParameters: any) {
    // create and dispatch the event
    const event = new CustomEvent(eventName, {
      detail: extraParameters,
    });
    this.el.dispatchEvent(event);
  }

  protected getPostion(event: TouchEvent | MouseEvent): Position {
    const position = {
      x: (this.settings.touch_capable) ? (event as TouchEvent).touches[0].pageX : (event as MouseEvent).pageX,
      y: (this.settings.touch_capable) ? (event as TouchEvent).touches[0].pageY : (event as MouseEvent).pageY,
    };
    return position;
  }

  protected getTargetPostion(event: TouchEvent | MouseEvent): Position {
    const position = {
      x: (this.settings.touch_capable) ? (event as TouchEvent).targetTouches[0].pageX : (event as MouseEvent).pageX,
      y: (this.settings.touch_capable) ? (event as TouchEvent).targetTouches[0].pageY : (event as MouseEvent).pageY,
    };
    return position;
  }

  protected getOffset(event: TouchEvent | MouseEvent): Offset {
    const boundingClientRect = this.el.getBoundingClientRect();
    const offset = {
      x: (this.settings.touch_capable) ? Math.round((event as TouchEvent).changedTouches[0].pageX - (boundingClientRect ? boundingClientRect.left : 0)) : Math.round((event as any as MouseEvent).pageX - (boundingClientRect ? boundingClientRect.left : 0)),
      y: (this.settings.touch_capable) ? Math.round((event as TouchEvent).changedTouches[0].pageY - (boundingClientRect ? boundingClientRect.top : 0)) : Math.round((event as any as MouseEvent).pageY - (boundingClientRect ? boundingClientRect.top : 0)),
    };
    return offset;
  }

  protected getTouchData(event: TouchEvent | MouseEvent): TouchData {
    const touchData = {
      position: this.getPostion(event),
      offset: this.getOffset(event),
      time: Date.now(),
      target: event.target,
    };
    return touchData;
  }

  protected addEventListeners() {
    this.el.addEventListener<any>(this.settings.startevent, this.onStartEvent.bind(this));
    this.el.addEventListener<any>(this.settings.moveevent, this.onMoveEvent.bind(this));
    this.el.addEventListener<any>(this.settings.endevent, this.onEndEvent.bind(this));
    this.el.addEventListener<any>(this.settings.scrollevent, this.onScrollEvent.bind(this));
  }

  // Event handlers

  protected onStartEvent(event: TouchEvent | MouseEvent) {
    this.startPosition = this.getTargetPostion(event);
    this.endPosition.x = this.startPosition.x;
    this.endPosition.y = this.startPosition.y;
    this.startTime = Date.now();
    this.tapstart(event);
    this.taphold(event);
    this.doubletap(event);
    this.singletap(event);
    this.tap(event);
  }

  protected onEndEvent(event: TouchEvent | MouseEvent) {
    this.endPosition = this.getTargetPostion(event);
    this.tapheld = false;
    window.clearTimeout(this.holdTimer);
    this.tapend(event);
    this.swipeend(event);
  }

  protected onMoveEvent(event: TouchEvent | MouseEvent) {
    this.endPosition = this.getTargetPostion(event);
    this.tapmove(event);
    this.swipe(event);
  }

  protected onScrollEvent(event: TouchEvent | MouseEvent) {
    this.scrollstart(event);
  }

  // CUSTOM EVENT METHODS:

  /** tapstart Event */
  protected tapstart(event: TouchEvent | MouseEvent) {
    if (event.which && event.which !== 1) {
      return false;
    }
    this.triggerCustomEvent('tapstart', this.getTouchData(event));
    return true;
  }

  /** tapmove Event */
  protected tapmove(event: TouchEvent | MouseEvent) {
    if (event.which && event.which !== 1) {
      return false;
    }
    this.triggerCustomEvent('tapmove', this.getTouchData(event));
    return true;
  }

  /** tapend Event */
  protected tapend(event: TouchEvent | MouseEvent) {
    if (event.which && event.which !== 1) {
      return false;
    }
    this.triggerCustomEvent('tapend', this.getTouchData(event));
    return true;
  }

  /** taphold Event */
  protected taphold(event: TouchEvent | MouseEvent) {
    if (event.which && event.which !== 1) {
      return false;
    }

    this.holdTimer = window.setTimeout(() => {
      const diffX = this.startPosition.x - this.endPosition.x;
      const diffY = this.startPosition.y - this.endPosition.y;

      // helded?
      if (
        (this.startPosition.x === this.endPosition.x && this.startPosition.y === this.endPosition.y)
        || (diffX >= -(this.settings.tap_pixel_range)
        && diffX <= this.settings.tap_pixel_range
        && diffY >= -(this.settings.tap_pixel_range)
        && diffY <= this.settings.tap_pixel_range)
      ) {
        this.tapheld = true;
        const endTime = Date.now();
        const duration = endTime - this.startTime;
        const touchesLength: number = ((event as TouchEvent).targetTouches) ? (event as TouchEvent).targetTouches.length : 1;
        const touchData = new Array<TouchData>();

        for (let i = 0; i < touchesLength; i++) {
          const elOffset = this.el.getBoundingClientRect();
          const touch = {
            position: {
              x: (this.settings.touch_capable) ? (event as TouchEvent).changedTouches[i].pageX : (event as MouseEvent).pageX,
              y: (this.settings.touch_capable) ? (event as TouchEvent).changedTouches[i].pageY : (event as MouseEvent).pageY,
            },
            offset: {
              x: (this.settings.touch_capable) ? Math.round((event as TouchEvent).changedTouches[i].pageX - (elOffset ? elOffset.left : 0)) : Math.round((event as MouseEvent).pageX - (elOffset ? elOffset.left : 0)),
              y: (this.settings.touch_capable) ? Math.round((event as TouchEvent).changedTouches[i].pageY - (elOffset ? elOffset.top : 0)) : Math.round((event as MouseEvent).pageY - (elOffset ? elOffset.top : 0)),
            },
            time: Date.now(),
            target: event.target,
            duration,
          };

          touchData.push(touch);
        }
        const eventName = (touchesLength === 2) ? 'taphold2' : 'taphold';
        this.triggerCustomEvent(eventName, touchData);
      }

    }, this.settings.taphold_threshold);

    return true;
  }

  /** doubletap Event */
  protected doubletap(event: TouchEvent | MouseEvent) {
    // TODO
  }

  /**
   * singletap Event
   * This is used in conjuction with doubletap when both events are needed on the same element
   */
  protected singletap(event: TouchEvent | MouseEvent) {
    // TODO
  }

  /** tap Event */
  protected tap(event: TouchEvent | MouseEvent) {
    // TODO
  }

  /**
   * swipe Event
   * (also handles swipeup, swiperight, swipedown and swipeleft)
   *
   * (`touchMove` method in jquery touch events)
   */
  protected swipe(event: TouchEvent | MouseEvent) {
    // TODO
  }

  /**
   * swipeend Event
   * (`touchEnd` method in jquery touch events)
   */
  protected swipeend(event: TouchEvent | MouseEvent) {
    // TODO
  }

  /**
   * scrollstart Event
   * (also handles scrollend)
   */
  protected scrollstart(event: TouchEvent | MouseEvent) {
    // TODO
  }

  /** orientationchange Event */
  protected orientationchange(event: DeviceOrientationEvent) {
    // TODO
  }

}
