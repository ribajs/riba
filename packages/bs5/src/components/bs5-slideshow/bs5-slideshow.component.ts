import { TemplatesComponent, TemplateFunction } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { Breakpoint } from "@ribajs/bs5";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import { clone, camelCase } from "@ribajs/utils/src/type";
import { throttle } from "@ribajs/utils/src/control";
import { Bs5Service } from "../../services";
import {
  SlideshowSlide,
  SlideshowControlsPosition,
  SlideshowIndicatorsPosition,
} from "../../types";
import {
  Dragscroll,
  DragscrollOptions,
  Autoscroll,
  AutoscrollOptions,
  ScrollPosition,
  ScrollEventsService,
  getScrollPosition,
} from "@ribajs/extras";
import templateSlides from "./bs5-slideshow-slides.component.html";
import templateControls from "./bs5-slideshow-controls.component.html";
import templateIndicators from "./bs5-slideshow-indicators.component.html";

const SLIDESHOW_INNER_SELECTOR = ".slideshow-row";

const SLIDES_SELECTOR = `${SLIDESHOW_INNER_SELECTOR} .slide`;

export interface ResponsiveOptions {
  /** Show controls */
  controls: boolean;
  /** Position of the controls */
  controlsPosition: SlideshowControlsPosition;
  /** Show indicators */
  indicators: boolean;
  /** Position of the indicators */
  indicatorsPosition: SlideshowIndicatorsPosition;
  /** Pauses auto scroll on hover or focus */
  pauseOnHover: boolean;
  /** number of slides to be scrolled by clicking on the controls */
  slidesToScroll: number;
  /** Autoscroll to the nearest slide after manual scroll or dragscroll */
  sticky: boolean;
  /** Slides are draggable on desktop browsers */
  drag: boolean;
  /** Enables autoplay continuously or with interval */
  autoplay: boolean;
  /** Pause between autoscroll, 0 for continuously autoscrolling */
  autoplayInterval: number;
  /** Scroll speed for continuously autoscrolling */
  autoplayVelocity: number;
  /** Icon source url for the prev slide icon button */
  controlPrevIconSrc: string;
  /** Icon source url for the next slide icon button */
  controlNextIconSrc: string;
  /** Icon source url for the inactive indicator */
  indicatorInactiveIconSrc: string;
  /** Icon source url for the active indicator */
  indicatorActiveIconSrc: string;
  /** Slide angle, can be vertical or horizontal */
  angle: "vertical" | "horizontal";
  /** Pause on autoplay (with interval) */
  pause: boolean;
  /** min width of responsive view port of from which these options take effect */
  breakpoint: number;
  /** Name of the current breakpoint, e.g. xs, sm, md, ... */
  name: string;
}

export type Options = {
  breakpoints: {
    [bp: string]: Partial<ResponsiveOptions>;
  };
};

export interface Scope extends Options {
  next: Bs5SlideshowComponent["next"];
  prev: Bs5SlideshowComponent["prev"];
  goTo: Bs5SlideshowComponent["goTo"];
  controlsPositionClass: string;
  indicatorsPositionClass: string;
  items?: SlideshowSlide[];
  /** Active breakpoint options */
  activeBreakpoint: ResponsiveOptions;
}

export class Bs5SlideshowComponent extends TemplatesComponent {
  protected resizeObserver?: ResizeObserver;
  protected bs5: Bs5Service;

  protected get slideshowInner() {
    if (!this._slideshowInner) {
      this._slideshowInner = this.querySelector(SLIDESHOW_INNER_SELECTOR);
    }
    if (!this._slideshowInner) {
      console.warn(
        new Error(
          `Child element with selector ${SLIDESHOW_INNER_SELECTOR} not found!`
        )
      );
    }
    return this._slideshowInner;
  }

  protected get slideElements() {
    if (
      !this._slideElements?.length ||
      this.scope.items?.length !== this._slideElements?.length
    ) {
      this._slideElements = this.querySelectorAll(SLIDES_SELECTOR);
    }
    if (!this._slideElements?.length) {
      console.warn(
        new Error(`Child element with selector ${SLIDES_SELECTOR} not found!`)
      );
    }
    return this._slideElements;
  }

  protected get controlsElements() {
    if (!this._controlsElements) {
      this._controlsElements = this.querySelectorAll(
        ".slideshow-control-prev, .slideshow-control-next"
      );
    }
    return this._controlsElements;
  }

  protected get indicatorsElement() {
    if (!this._indicatorsElement) {
      this._indicatorsElement = this.querySelector(".slideshow-indicators");
    }
    return this._indicatorsElement;
  }

  static get observedAttributes(): string[] {
    const staticAttributes = ["items"];
    const breakpointNames = Bs5Service.getSingleton().breakpointNames;

    const responsiveAttributes: string[] = [];
    for (const breakpointName of breakpointNames) {
      responsiveAttributes.push(
        ...this.responsiveAttributes.map((prop) => `${breakpointName}-${prop}`)
      );
    }
    return [...staticAttributes, ...responsiveAttributes];
  }

  static responsiveAttributes = [
    "breakpoint",
    "name",
    "slides-to-scroll",
    "controls",
    "controls-position",
    "drag",
    "autoplay",
    "autoplay-interval",
    "autoplay-velocity",
    "control-prev-icon-src",
    "control-next-icon-src",
    "indicator-inactive-icon-src",
    "indicator-active-icon-src",
    "angle",
    "set-active-slide",
    "pause-on-hover",
    "sticky",
    "indicators",
    "indicators-position",
    "pause",
  ];

  static get responsiveProperties() {
    return this.responsiveAttributes.map((attribute) =>
      camelCase(attribute)
    ) as (keyof ResponsiveOptions)[];
  }

  protected _defaultBreakpointOptions: ResponsiveOptions = {
    // Options
    slidesToScroll: 1,
    controls: true,
    controlsPosition: "inside-middle",
    pauseOnHover: true,
    sticky: false,
    indicators: true,
    indicatorsPosition: "inside-bottom",
    pause: false,
    drag: true,
    autoplay: false,
    autoplayInterval: 0,
    autoplayVelocity: 0.8,
    controlPrevIconSrc: "",
    controlNextIconSrc: "",
    indicatorActiveIconSrc: "",
    indicatorInactiveIconSrc: "",
    angle: "horizontal",
    breakpoint: 0,
    name: "xs",
  };

  protected getDefaultBreakpointOptions() {
    return clone(true, this._defaultBreakpointOptions);
  }

  public static tagName = "bs5-slideshow";

  protected templateAttributes = [
    {
      name: "class",
      required: false,
    },
    {
      name: "handle",
      required: false,
    },
    {
      name: "type",
      required: true,
    },
    {
      name: "active",
      type: "boolean",
      required: false,
    },
    {
      name: "index",
      type: "number",
      required: false,
    },
  ];

  protected autobind = true;

  protected dragscrollService?: Dragscroll;

  protected continuousAutoplayService?: Autoscroll;

  protected scrollEventsService?: ScrollEventsService;

  protected _slideshowInner: HTMLElement | null = null;

  protected _slideElements: NodeListOf<Element> | null = null;

  protected _controlsElements: NodeListOf<Element> | null = null;

  protected _indicatorsElement: HTMLElement | null = null;

  protected templateControls = templateControls;

  protected templateIndicators = templateIndicators;

  protected autoplayIntervalIndex: number | null = null;

  protected continuousAutoplayIntervalIndex: number | null = null;

  protected resumeTimer: number | null = null;

  protected routerEvents = new EventDispatcher("main");

  /**
   * Current breakpoint
   */
  protected activeBreakpointName = "xs";

  public scope: Scope = {
    breakpoints: {},
    activeBreakpoint: this.getDefaultBreakpointOptions(),

    // Template methods
    next: this.next.bind(this),
    prev: this.prev.bind(this),
    goTo: this.goTo.bind(this),

    // Template properties
    items: undefined,

    // Classes
    controlsPositionClass: "",
    indicatorsPositionClass: "",
  };

  constructor() {
    super();
    this.bs5 = Bs5Service.getSingleton();

    // set event listeners to the this-bound version once, so we can easily pass them to DOM event handlers and remove them again later
    this.onViewChanges = this.onViewChanges.bind(this);
    this.onVisibilityChanged = this.onVisibilityChanged.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onScrollend = this.onScrollend.bind(this);
    this.onMouseIn = this.onMouseIn.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  /**
   * Go to next slide
   */
  public next() {
    this.scrollToNextSlide();
  }

  /**
   * Go to prev slide
   */
  public prev() {
    this.scrollToPrevSlide();
  }

  /**
   * Go to slide by index
   * @param index
   */
  public goTo(index: number) {
    if (index < 0) {
      this.throw(new Error(`Can't go to slide of index ${index}`));
      return;
    }
    this.setSlidePositions();
    let top = 0;
    let left = 0;

    if (!this.slideshowInner) {
      return;
    }

    if (!this.scope.items?.[index]) {
      this.throw(new Error(`Slide with index "${index}" not found!`));
      return;
    }

    if (this.scope.activeBreakpoint.angle === "vertical") {
      // Check if we do not need to slide
      if (this.scope.items[index].position.centerY === 0) {
        // We do not need to scroll
        return;
      }
      top =
        this.slideshowInner.scrollTop +
        this.scope.items[index].position.centerY;
    } else {
      // Check if we do not need to slide
      if (this.scope.items[index].position.centerX === 0) {
        // We do not need to scroll
        return;
      }
      left =
        this.slideshowInner.scrollLeft +
        this.scope.items[index].position.centerX;
    }

    // TODO new scroll service based on https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/
    if (!this.slideElements[index]) {
      this.throw(new Error(`Slide element with index "${index}" not found!`));
    } else {
      if (typeof this.slideshowInner.scroll === "function") {
        console.debug("scroll left", left, this.slideshowInner);
        this.slideshowInner.scroll({
          behavior: "smooth",
          left,
          top,
        });
      } else {
        if (this.scope.activeBreakpoint.angle === "vertical") {
          this.slideshowInner.scrollTop = top;
        } else {
          this.slideshowInner.scrollLeft = left;
        }
      }
    }
  }

  protected setOptions(
    dest: Partial<ResponsiveOptions>,
    source: Partial<ResponsiveOptions>
  ) {
    const props = Bs5SlideshowComponent.responsiveProperties;
    for (const prop of props) {
      (dest[prop] as any) =
        typeof source[prop] !== "undefined"
          ? clone(false, source[prop])
          : dest[prop];
    }
  }

  protected setOptionsIfUndefined(
    dest: Partial<ResponsiveOptions>,
    source: Partial<ResponsiveOptions>
  ) {
    const props = Bs5SlideshowComponent.responsiveProperties;
    for (const prop of props) {
      (dest[prop] as any) =
        typeof dest[prop] === "undefined"
          ? clone(false, source[prop])
          : dest[prop];
    }
  }

  protected initResponsiveOptions() {
    const breakpointNames = Bs5Service.getSingleton().breakpointNames;
    for (let i = 1; i < breakpointNames.length; i++) {
      const currName = breakpointNames[i];
      const prevName = breakpointNames[i - 1];

      this.scope.breakpoints[currName] = this.scope.breakpoints[currName] || {};
      this.scope.breakpoints[prevName] = this.scope.breakpoints[prevName] || {};

      const currOptions = this.scope.breakpoints[currName];
      const prevOptions = this.scope.breakpoints[prevName];

      // Set the breakpoint min width
      currOptions.breakpoint =
        this.bs5.getBreakpointByName(currName)?.dimension || 0;
      currOptions.name = currName;

      if (prevOptions) {
        if (i === 1) {
          this.setOptionsIfUndefined(
            prevOptions,
            this.getDefaultBreakpointOptions()
          );
        }

        this.setOptionsIfUndefined(currOptions, prevOptions);
      }
    }

    this.setOptionsByBreakpoint(this.bs5.activeBreakpoint);
  }

  protected setControlsOptions() {
    let result = "";
    let count = 0;
    for (const infix in this.scope.breakpoints) {
      const breakpoint = this.scope.breakpoints[infix];
      const position = breakpoint.controlsPosition?.split(
        "-"
      ) as SlideshowControlsPosition[];
      if (breakpoint.controls && position.length === 2) {
        if (count === 0) {
          // Do not use xs on class
          result += `control-${position[0]} control-${position[1]} `;
        } else {
          result += `control-${infix}-${position[0]} control-${infix}-${position[1]} `;
        }
      }
      count++;
    }

    this.scope.controlsPositionClass = result.trim();
  }

  protected setIndicatorsOptions() {
    let result = "";
    let count = 0;

    for (const infix in this.scope.breakpoints) {
      const breakpoint = this.scope.breakpoints[infix];
      const positions = breakpoint.indicatorsPosition?.split(
        "-"
      ) as SlideshowIndicatorsPosition[];
      if (breakpoint.indicators && positions.length === 2) {
        if (count === 0) {
          // Do not use xs on class
          result += `indicators-${positions[0]} indicators-${positions[1]} `;
        } else {
          result += `indicators-${infix}-${positions[0]} indicators-${infix}-${positions[1]} `;
        }
      }
      count++;
    }

    this.scope.indicatorsPositionClass = result.trim();
  }

  protected getBreakpointOptionsByBreakpointName(name: string) {
    return this.scope.breakpoints[name];
  }

  protected setOptionsByBreakpoint(breakpoint: Breakpoint | null) {
    if (!breakpoint) {
      console.warn(`Breakpoint not found!`);
      return;
    }
    const breakpointOptions = this.getBreakpointOptionsByBreakpointName(
      breakpoint.name
    );
    if (!breakpointOptions) {
      console.warn(`Breakpoint options for "${breakpoint.name}" not found!`);
      return;
    }
    this.setOptions(this.scope.activeBreakpoint, breakpointOptions);
    if (this.scope.activeBreakpoint.autoplay) {
      this.enableAutoplay();
    } else {
      this.disableAutoplay();
    }
    if (this.scope.activeBreakpoint.drag) {
      this.enableDesktopDragscroll();
    } else {
      this.disableDesktopDragscroll();
    }
    this.setControlsOptions();
    this.setIndicatorsOptions();
  }

  protected _onBreakpointChanges(breakpoint: Breakpoint) {
    this.setOptionsByBreakpoint(breakpoint);
  }

  protected onBreakpointChanges = this._onBreakpointChanges.bind(this);

  protected _onViewChanges() {
    this.debug("onViewChanges");
    if (!this.scope.items?.length || !this.slideElements?.length) {
      return;
    }
    try {
      this.setSlidePositions();
      const index = this.setCenteredSlideActive();
      if (this.scope.activeBreakpoint.sticky) {
        this.goTo(index);
      }
    } catch (error) {
      this.throw(error);
    }
  }

  protected onViewChanges = throttle(this._onViewChanges.bind(this));

  protected onVisibilityChanged(event: CustomEvent) {
    if (event.detail.visible) {
      this.dragscrollService?.checkDraggable();
      this.continuousAutoplayService?.update();
    }
  }

  protected _onScroll() {
    this.resume(1000);
  }

  protected onScroll = throttle(this._onScroll.bind(this));

  protected onScrollend() {
    try {
      this.setSlidePositions();
      this.setCenteredSlideActive();
      if (this.scope.activeBreakpoint.sticky) {
        this.scrollToNearestSlide();
      }
      this.resume(1000);
    } catch (error) {
      this.throw(error);
    }
  }

  protected onMouseIn() {
    if (this.scope.activeBreakpoint.pauseOnHover) {
      this.scope.activeBreakpoint.pause = true;
    }
  }

  protected onMouseOut() {
    this.resume(200);
  }

  protected _onMouseUp() {
    this.resume(1000);
  }

  protected onMouseUp = throttle(this._onMouseUp.bind(this));

  /** Resume if this method was not called up for [delay] milliseconds */
  protected resume(delay = 1000) {
    if (!this.scope.activeBreakpoint.pause) {
      return;
    }

    if (this.resumeTimer !== null) {
      clearTimeout(this.resumeTimer);
      this.resumeTimer = null;
    }

    this.resumeTimer = window.setTimeout(() => {
      this.setSlidePositions();
      this.scope.activeBreakpoint.pause = false;
    }, delay);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.initSlideshowInner();
    return this.init(Bs5SlideshowComponent.observedAttributes);
  }

  protected addEventListeners() {
    this.routerEvents.on("newPageReady", this.onViewChanges);

    if (window.ResizeObserver) {
      this.resizeObserver = new window.ResizeObserver(this.onViewChanges);
      this.resizeObserver?.observe(this);
    } else {
      // Fallback watch window resize
      window.addEventListener("resize", this.onViewChanges, { passive: true });
    }

    this.bs5.events.on("breakpoint:changed", this.onBreakpointChanges);

    // Custom event triggered by some parent components when this component changes his visibility, e.g. triggered in the bs5-tabs component
    this.addEventListener(
      "visibility-changed" as any,
      this.onVisibilityChanged
    );

    this.slideshowInner?.addEventListener("scroll", this.onScroll, {
      passive: true,
    });
    this.slideshowInner?.addEventListener("scrollended", this.onScrollend, {
      passive: true,
    });

    this.addEventListener("mouseenter", this.onMouseIn, { passive: true });
    this.addEventListener("mouseover", this.onMouseIn, { passive: true });
    this.addEventListener("focusin", this.onMouseIn, { passive: true });
    this.addEventListener("touchstart", this.onMouseIn, { passive: true });

    this.addEventListener("mouseout", this.onMouseOut, { passive: true });
    this.addEventListener("mouseleave", this.onMouseOut, { passive: true });
    this.addEventListener("focusout", this.onMouseOut, { passive: true });

    this.addEventListener("mouseup", this.onMouseUp, { passive: true });
    this.addEventListener("touchend", this.onMouseUp, { passive: true });
    this.addEventListener("scroll", this.onMouseUp, { passive: true });
    this.addEventListener("scrollend", this.onMouseUp, { passive: true });
    // See ScrollEventsService for this event
    this.addEventListener("scrollended", this.onMouseUp, { passive: true });

    // initial
    this.onViewChanges();
    this.onScrollend();
  }

  protected removeEventListeners() {
    this.routerEvents.off("newPageReady", this.onViewChanges, this);

    window.removeEventListener("resize", this.onViewChanges);

    this.resizeObserver?.unobserve(this);

    this.bs5.events.off("breakpoint:changed", this.onViewChanges, this);

    this.removeEventListener(
      "visibility-changed" as any,
      this.onVisibilityChanged
    );

    this.slideshowInner?.removeEventListener("scroll", this.onScroll);
    this.slideshowInner?.removeEventListener("scrollended", this.onScrollend);

    this.removeEventListener("mouseenter", this.onMouseIn);
    this.removeEventListener("mouseover", this.onMouseIn);
    this.removeEventListener("focusin", this.onMouseIn);
    this.removeEventListener("touchstart", this.onMouseIn);

    this.removeEventListener("mouseout", this.onMouseOut);
    this.removeEventListener("mouseleave", this.onMouseOut);
    this.removeEventListener("focusout", this.onMouseOut);

    this.removeEventListener("mouseup", this.onMouseUp);
    this.removeEventListener("touchend", this.onMouseUp);
    this.removeEventListener("scroll", this.onMouseUp);
    this.removeEventListener("scrollend", this.onMouseUp);
    // See ScrollEventsService for this event
    this.removeEventListener("scrollended", this.onMouseUp);
  }

  protected async beforeBind() {
    await super.beforeBind();
  }

  protected async afterBind() {
    this.initSlideshowInner();
    this.initResponsiveOptions();
    this.addEventListeners();
    await super.afterBind();
  }

  protected async afterAllBind() {
    this.initSlideshowInner();
    this.initResponsiveOptions();
    this.addEventListeners();
    await super.afterAllBind();
  }

  protected initSlideshowInner() {
    this.initSlideshowInnerSlides();

    if (!this.slideshowInner) {
      return;
    }

    this.scrollEventsService = new ScrollEventsService(this.slideshowInner);
  }

  protected enableDesktopDragscroll() {
    if (!this.dragscrollService) {
      if (!this.slideshowInner) {
        return;
      }
      const dragscrollOptions: DragscrollOptions = { detectGlobalMove: true };
      this.dragscrollService = new Dragscroll(
        this.slideshowInner,
        dragscrollOptions
      );
    }
  }

  protected disableDesktopDragscroll() {
    if (this.dragscrollService) {
      this.dragscrollService.destroy();
      this.dragscrollService = undefined;
    }
  }

  protected enableContinuousAutoplay() {
    if (!this.continuousAutoplayService && this.slideshowInner) {
      const autoscrollOptions: AutoscrollOptions = {
        velocity: this.scope.activeBreakpoint.autoplayVelocity,
        angle: this.scope.activeBreakpoint.angle,
        pauseOnHover: this.scope.activeBreakpoint.pauseOnHover,
      };
      this.continuousAutoplayService = new Autoscroll(
        this.slideshowInner,
        autoscrollOptions
      );
    }
    // on continuous autoplay the scrollended event is never triggered, so call this method all `intervalsTimeMs` milliseconds as a WORKAROUND
    if (!this.continuousAutoplayIntervalIndex) {
      // intervals are depending on the autoscrolling speed (autoplayVelocity)
      const intervalsTimeMs =
        this.scope.activeBreakpoint.autoplayVelocity * 10000;
      // this.debug('intervalsTimeMs', intervalsTimeMs);
      this.continuousAutoplayIntervalIndex = window.setInterval(
        this.onScrollend.bind(this),
        intervalsTimeMs
      );
    }
  }

  protected disableContinuousAutoplay() {
    if (this.continuousAutoplayService) {
      this.continuousAutoplayService.destroy();
      this.continuousAutoplayService = undefined;
    }
    if (this.continuousAutoplayIntervalIndex) {
      window.clearInterval(this.continuousAutoplayIntervalIndex);
      this.continuousAutoplayIntervalIndex = null;
    }
  }

  protected enableIntervalAutoplay() {
    if (this.autoplayIntervalIndex === null) {
      this.autoplayIntervalIndex = window.setInterval(() => {
        if (!this.scope.activeBreakpoint.pause) {
          this.next();
        }
      }, this.scope.activeBreakpoint.autoplayInterval);
    }
  }

  protected disableIntervalAutoplay() {
    if (this.autoplayIntervalIndex) {
      window.clearInterval(this.autoplayIntervalIndex);
      this.autoplayIntervalIndex = null;
    }
  }

  protected disableAutoplay() {
    this.disableIntervalAutoplay();
    this.disableContinuousAutoplay();
  }

  protected enableAutoplay() {
    // continuous scrolling
    if (this.scope.activeBreakpoint.autoplayInterval <= 0) {
      this.enableContinuousAutoplay();
    } else {
      this.enableIntervalAutoplay();
    }
  }

  protected initSlideshowInnerSlides() {
    if (!this.slideElements) {
      this.throw(new Error("No slides found!"));
    }

    // If slides not added by template or attribute
    if (!this.scope.items?.length) {
      this.addItemsByChilds();
    }
  }

  protected transformTemplateAttributes(attributes: any, index: number) {
    attributes = super.transformTemplateAttributes(attributes, index);
    attributes.handle = attributes.handle || index.toString();
    attributes.index = index;
    attributes.class = attributes.class || "";
    attributes.class += " slide";
    return attributes;
  }

  /**
   * Add slide by template element
   * @param tpl template element
   */
  protected addItemByTemplate(tpl: HTMLTemplateElement, index: number) {
    const attributes = this.getTemplateAttributes(tpl, index);
    const content = tpl.innerHTML;
    if (attributes.type) {
      if (attributes.type === "slide") {
        if (!this.scope.items) {
          this.scope.items = [];
        }
        this.scope.items.push({ ...attributes, content });
      }
      if (attributes.type === "controls") {
        this.templateControls = content;
      }
      if (attributes.type === "indicators") {
        this.templateIndicators = content;
      }
    }
  }

  /**
   * Add slides by child elements (not as template elements)
   * @param tpl template element
   */
  protected addItemsByChilds() {
    if (!this.slideElements) {
      return;
    }

    this.slideElements.forEach((slideElement, index) => {
      const handle =
        slideElement.getAttribute("handle") ||
        slideElement.getAttribute("id") ||
        index.toString();
      slideElement.setAttribute("index", index.toString());
      const attributes = {
        handle,
        active: false,
        content: slideElement.innerHTML,
        index,
        position: {
          ...slideElement.getBoundingClientRect(),
          centerY: 0,
          centerX: 0,
        },
      };
      if (!this.scope.items) {
        this.scope.items = [];
      }
      this.scope.items.push(attributes);
    });
  }

  protected getScrollPosition(): ScrollPosition | null {
    if (!this.slideshowInner) {
      return null;
    }
    const scrollPosition = getScrollPosition(this.slideshowInner);
    return scrollPosition;
  }

  /**
   * get closest number
   * @see https://stackoverflow.com/a/35000557
   * @param goal the number which this number should be closest to
   * @param curr current number in loop
   * @param prev previous number or closest value found so far
   */
  protected getCurrentClosestNumber(goal: number, curr: number, prev: number) {
    return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
  }

  protected getMostCenteredSlideIndex() {
    if (!this.scope.items?.length) {
      return -1;
    }

    let nearZero = Math.abs(
      this.scope.activeBreakpoint.angle === "vertical"
        ? this.scope.items[0].position.centerY
        : this.scope.items[0].position.centerX
    );
    let minIndex = 0;

    for (let i = 1; i < this.scope.items.length; i++) {
      const position = Math.abs(
        this.scope.activeBreakpoint.angle === "vertical"
          ? this.scope.items[i].position.centerY
          : this.scope.items[i].position.centerX
      );
      nearZero = this.getCurrentClosestNumber(0, position, nearZero);
      if (nearZero === position) {
        minIndex = i;
      }
    }
    return minIndex;
  }

  protected setAllSlidesInactive(excludeIndex = -1) {
    if (!this.slideElements || !this.scope.items?.length) {
      return;
    }
    for (let index = 0; index < this.scope.items.length; index++) {
      if (index !== excludeIndex) {
        if (this.scope.items[index]) {
          this.scope.items[index].active = false;
        }
        if (this.slideElements[index] && this.slideElements[index].classList) {
          this.slideElements[index].classList.remove("active");
        }
      }
    }
  }

  protected setCenteredSlideActive(): number {
    const index = this.getMostCenteredSlideIndex();
    if (index === -1 || !this.scope.items?.length) {
      return -1;
    }
    this.setAllSlidesInactive(index);
    if (!this.scope.items[index]) {
      return -1;
    }
    this.scope.items[index].active = true;
    if (this.slideElements && this.slideElements[index].classList) {
      this.slideElements[index].classList.add("active");
    }
    return index;
  }

  protected isScrollableToIndex(index: number) {
    const scrollPosition = this.getScrollPosition();
    if (!this.scope.items?.[index] || !this.slideshowInner || !scrollPosition) {
      return false;
    }
    const maxScrollTo =
      this.scope.activeBreakpoint.angle === "vertical"
        ? scrollPosition.maxY
        : scrollPosition.maxX;
    const scrollTo =
      this.scope.activeBreakpoint.angle === "vertical"
        ? this.slideshowInner.scrollTop +
          this.scope.items[index].position.centerY
        : this.slideshowInner.scrollLeft +
          this.scope.items[index].position.centerX;
    return scrollTo <= maxScrollTo && scrollTo >= 0;
  }

  protected scrollToNextSlide() {
    this.setSlidePositions();
    const currentIndex = this.getMostCenteredSlideIndex();
    let nextIndex = currentIndex + this.scope.activeBreakpoint.slidesToScroll;

    if (nextIndex >= this.slideElements.length) {
      nextIndex = nextIndex - this.slideElements.length;
    }

    // if (!this.isScrollableToIndex(nextIndex)) {
    //   nextIndex++;
    // }

    // if (nextIndex >= this.slideElements.length) {
    //   nextIndex = nextIndex - this.slideElements.length;
    // }

    return this.goTo(nextIndex);
  }

  protected scrollToPrevSlide() {
    this.setSlidePositions();
    const currentIndex = this.getMostCenteredSlideIndex();
    let prevIndex = currentIndex - this.scope.activeBreakpoint.slidesToScroll;

    if (prevIndex < 0) {
      prevIndex = this.slideElements.length - 1 + (prevIndex + 1);
    }

    return this.goTo(prevIndex);
  }

  protected scrollToNearestSlide() {
    this.setSlidePositions();
    const nearestIndex = this.getMostCenteredSlideIndex();
    return this.goTo(nearestIndex);
  }

  protected setSlidePositions() {
    if (this.scope.items?.length !== this.slideElements?.length) {
      console.warn(
        new Error(
          `The slide objects must be the same size as the slide elements! items (${this.scope.items?.length}) !== slideElements (${this.slideElements?.length})`
        ),
        this.slideElements,
        this
      );
      return;
    }
    if (!this.slideshowInner) {
      return;
    }

    const mainBoundingClient = this.slideshowInner.getBoundingClientRect();
    for (let i = 0; i < this.scope.items.length; i++) {
      const slideElement = this.slideElements[i];
      const item = this.scope.items[i];
      const rect = slideElement.getBoundingClientRect();

      rect.x -= mainBoundingClient.x;
      rect.y -= mainBoundingClient.y;

      item.position = {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
        top: rect.top,
        toJSON: rect.toJSON,
        // 0 if element is in the middle / center
        centerY: rect.y + rect.height / 2 - mainBoundingClient.height / 2,
        // 0 if element is in the middle / center
        centerX: rect.x + rect.width / 2 - mainBoundingClient.width / 2,
      };
    }
  }

  protected requiredAttributes(): string[] {
    return ["items"];
  }

  /**
   * Default custom Element method
   * Invoked when an attribute on the custom element changes.
   * @param attributeName
   * @param oldValue
   * @param newValue
   * @param namespace
   */
  protected async attributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    let responsiveAttributeName: keyof ResponsiveOptions | null = null;

    if (
      this.observedAttributesToCheck &&
      this.observedAttributesToCheck[attributeName]
    ) {
      this.observedAttributesToCheck[attributeName].initialized = true;
    }

    newValue = this.parseAttribute(newValue);
    const breakpointNames = Bs5Service.getSingleton().breakpointNames;

    for (const name of breakpointNames) {
      const affix = name + "-";
      if (attributeName.startsWith(affix)) {
        this.scope.breakpoints[name] = this.scope.breakpoints[name] || {};
        responsiveAttributeName = camelCase(
          attributeName.slice(affix.length)
        ) as keyof ResponsiveOptions;
        (this.scope.breakpoints[name][
          responsiveAttributeName
        ] as any) = newValue;
        break;
      }
    }

    if (!responsiveAttributeName) {
      await super.attributeChangedCallback(
        attributeName,
        oldValue,
        newValue,
        namespace
      );
    } else {
      try {
        await this.bindIfReady();
      } catch (error) {
        this.throw(error);
      }
    }
  }

  /**
   * Similar to attributeChangedCallback but attribute arguments are already parsed as they are stored in the scope
   * @param attributeName
   * @param oldValue
   * @param newValue
   * @param namespace
   */
  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    return super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace
    );
  }

  // deconstruction
  protected disconnectedCallback() {
    console.debug("disconnectedCallback");
    // this.removeEventListeners();
    // this.scrollEventsService?.destroy();
    // this.disableAutoplay();
    // this.disableDesktopDragscroll();
    // return super.disconnectedCallback();
  }

  protected template(): ReturnType<TemplateFunction> {
    // Only set the component template if there no childs or the childs are templates
    if (!hasChildNodesTrim(this) || this.hasOnlyTemplateChilds()) {
      // ('Full template!', this.templateIndicators);
      return templateSlides + this.templateControls + this.templateIndicators;
    } else {
      // this.debug('Append to template!');
      // Prepend control elements if no custom control elements in template are found
      if (this.controlsElements.length <= 0) {
        this.innerHTML += this.templateControls;
      }

      if (!this.indicatorsElement) {
        this.innerHTML += this.templateIndicators;
      }

      return null;
    }
  }
}
