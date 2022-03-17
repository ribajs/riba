import {
  TemplatesComponent,
  TemplateFunction
} from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { hasChildNodesTrim, scrollTo } from "@ribajs/utils/src/dom.js";
import { throttle, debounce } from "@ribajs/utils/src/control";
import { Bs5Service } from "../../services/index.js";
import {
  SlideshowControlsPosition,
  SlideshowIndicatorsPosition,
  SlideshowSlidePosition,
  Bs5SlideshowComponentScope,
  JsxBs5SlideshowProps
} from "../../types/index.js";
import {
  Dragscroll,
  DragscrollOptions,
  Autoscroll,
  AutoscrollOptions,
  ScrollPosition,
  ScrollEventsService,
  getScrollPosition
} from "@ribajs/extras";
import templateSlides from "./bs5-slideshow-slides.component.html";
import templateControls from "./bs5-slideshow-controls.component.html";
import templateIndicators from "./bs5-slideshow-indicators.component.html";
import templateImage from "./bs5-slideshow-image.component.html";

const SLIDESHOW_INNER_SELECTOR = ".slideshow-row";

const SLIDES_SELECTOR = `${SLIDESHOW_INNER_SELECTOR} .slide`;

export class Bs5SlideshowComponent extends TemplatesComponent {
  protected resizeObserver?: ResizeObserver;
  protected bs5: Bs5Service;

  protected get slideshowInner() {
    return this.querySelector<HTMLElement>(SLIDESHOW_INNER_SELECTOR);
  }

  protected get slideElements() {
    return this.querySelectorAll<HTMLElement>(SLIDES_SELECTOR);
  }

  protected get controlsElements() {
    return this.querySelectorAll(
      ".slideshow-control-prev, .slideshow-control-next"
    );
  }

  protected get indicatorsElement() {
    return this.querySelector(".slideshow-indicators");
  }

  static get observedAttributes(): (keyof JsxBs5SlideshowProps)[] {
    return [
      "items",
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
      "pause-on-hover",
      "sticky",
      "indicators",
      "indicators-position",
      "pause",
      "infinite"
    ];
  }

  protected defaultScope: Bs5SlideshowComponentScope = {
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
    touchScroll: true,
    autoplay: false,
    autoplayInterval: 0,
    autoplayVelocity: 0.8,
    controlPrevIconSrc: "",
    controlNextIconSrc: "",
    indicatorActiveIconSrc: "",
    indicatorInactiveIconSrc: "",
    angle: "horizontal",
    infinite: true,

    // Template methods
    next: this.next.bind(this),
    prev: this.prev.bind(this),
    goTo: this.goTo.bind(this),
    enableTouchScroll: this.enableTouchScroll.bind(this),
    disableTouchScroll: this.disableTouchScroll.bind(this),

    // Template properties
    items: undefined,

    // Classes
    controlsPositionClass: "",
    indicatorsPositionClass: "",
    intervalCount: 0,
    intervalProgress: 0,
    nextIndex: -1,
    prevIndex: -1,
    activeIndex: 0
  };

  public static tagName = "bs5-slideshow";

  protected templateAttributes = [
    {
      name: "class",
      required: false
    },
    {
      name: "handle",
      required: false
    },
    {
      name: "type",
      required: true
    },
    {
      name: "active",
      type: "boolean",
      required: false
    },
    {
      name: "index",
      type: "number",
      required: false
    },
    {
      name: "src",
      type: "string",
      required: false
    }
  ];

  protected autobind = true;

  protected dragscrollService?: Dragscroll;

  protected continuousAutoplayService?: Autoscroll;

  protected scrollEventsService?: ScrollEventsService;

  protected templateControls = templateControls;

  protected templateIndicators = templateIndicators;

  protected autoplayIntervalIndex: number | null = null;

  protected continuousAutoplayIntervalIndex: number | null = null;

  protected resumeTimer: number | null = null;

  protected routerEvents = new EventDispatcher("main");

  public scope: Bs5SlideshowComponentScope = {
    ...this.defaultScope
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
    if (
      index < 0 ||
      !this.scope.items?.[index] ||
      !this.slideElements[index] ||
      !this.slideshowInner
    ) {
      this.throw(new Error(`Can't go to slide of index ${index}`));
      console.error("items", this.scope.items);
      console.error("this.slideElements", this.slideElements);
      console.error("this.slideshowInner", this.slideshowInner);
      return;
    }
    this.setSlidePositions();

    if (!this.slideElements[index]) {
      this.throw(new Error(`Slide element with index "${index}" not found!`));
    } else {
      scrollTo(
        this.slideElements[index],
        0,
        this.slideshowInner,
        this.scope.angle
      );
      this.setSlideActive(index);
    }
  }

  public getNextIndex(centeredIndex: number) {
    let nextIndex = centeredIndex + this.scope.slidesToScroll;

    if (nextIndex >= this.slideElements.length) {
      if (!this.scope.infinite) {
        return this.slideElements.length - 1;
      }
      nextIndex = nextIndex - this.slideElements.length;
    }

    return nextIndex;
  }

  public getPrevIndex(centeredIndex: number) {
    let prevIndex = centeredIndex - this.scope.slidesToScroll;

    if (prevIndex < 0) {
      if (!this.scope.infinite) {
        return 0;
      }
      prevIndex = this.slideElements.length - 1 + (prevIndex + 1);
    }
    return prevIndex;
  }

  public scrollToNearestSlide() {
    this.setSlidePositions();
    const nearestIndex = this.getMostCenteredSlideIndex();
    return this.goTo(nearestIndex);
  }

  protected scrollToNextSlide() {
    this.setSlidePositions();
    const centeredIndex = this.getMostCenteredSlideIndex();
    const nextIndex = this.getNextIndex(centeredIndex);

    return this.goTo(nextIndex);
  }

  protected scrollToPrevSlide() {
    this.setSlidePositions();
    const centeredIndex = this.getMostCenteredSlideIndex();
    const prevIndex = this.getPrevIndex(centeredIndex);
    return this.goTo(prevIndex);
  }

  protected initOptions() {
    this.setOptions();
  }

  protected setOptions() {
    if (this.scope.autoplay) {
      this.enableAutoplay();
    } else {
      this.disableAutoplay();
    }
    if (this.scope.drag) {
      this.enableDesktopDragscroll();
    } else {
      this.disableDesktopDragscroll();
    }
    if (this.scope.touchScroll) {
      this.enableTouchScroll();
    } else {
      this.disableTouchScroll();
    }
    this.setControlsOptions();
    this.setIndicatorsOptions();
  }

  protected setControlsOptions() {
    const position = this.scope.controlsPosition?.split(
      "-"
    ) as SlideshowControlsPosition[];
    if (this.scope.controls && position.length === 2) {
      this.scope.controlsPositionClass = `control-${position[0]} control-${position[1]}`;
    } else {
      this.scope.controlsPositionClass = "";
    }
  }

  protected setIndicatorsOptions() {
    const positions = this.scope.indicatorsPosition?.split(
      "-"
    ) as SlideshowIndicatorsPosition[];
    if (this.scope.indicators && positions.length === 2) {
      this.scope.indicatorsPositionClass = `indicators-${positions[0]} indicators-${positions[1]}`;
    } else {
      this.scope.indicatorsPositionClass = "";
    }
  }

  protected _onViewChanges() {
    this.debug("onViewChanges");
    if (!this.scope.items?.length || !this.slideElements?.length) {
      return;
    }
    try {
      this.setSlidePositions();
      const index = this.setCenteredSlideActive();
      if (this.scope.sticky) {
        this.goTo(index);
      }
    } catch (error: any) {
      this.throw(error);
    }
  }

  protected onViewChanges = debounce(this._onViewChanges.bind(this));

  protected onVisibilityChanged(event: CustomEvent) {
    if (event.detail.visible) {
      this.dragscrollService?.checkDraggable();
      this.continuousAutoplayService?.update();
    }
  }

  protected _onScroll() {
    //
  }

  protected onScroll = debounce(this._onScroll.bind(this));

  protected onScrollend() {
    if (!this.scope.items?.length) {
      return;
    }
    try {
      this.setSlidePositions();
      this.setCenteredSlideActive();
      if (this.scope.sticky) {
        this.scrollToNearestSlide();
      }
    } catch (error: any) {
      this.throw(error);
    }
  }

  protected onMouseIn() {
    if (this.scope.pauseOnHover) {
      this.scope.pause = true;
    }
  }

  protected onMouseOut() {
    this.resume();
  }

  protected _onMouseUp() {
    //
  }

  protected onMouseUp = throttle(this._onMouseUp.bind(this));

  protected _resume() {
    this.setSlidePositions();
    this.scope.pause = false;
  }

  /** Resume if this method was not called up for [delay] milliseconds */
  protected resume = throttle(this._resume.bind(this), 500);

  protected connectedCallback() {
    // If slides not added by template or attribute
    if (!this.scope.items?.length && this.slideElements) {
      this.addItemsByChilds();
    }
    super.connectedCallback();
    this.init(Bs5SlideshowComponent.observedAttributes);
    this.addEventListeners();
  }

  protected addEventListeners() {
    this.routerEvents.on("newPageReady", this.onViewChanges);

    // If sidebar itself resizes
    if (window.ResizeObserver) {
      this.resizeObserver = new window.ResizeObserver(this.onViewChanges);
      this.resizeObserver?.observe(this);
    }

    // If window resizes
    window.addEventListener("resize", this.onViewChanges, { passive: true });

    // Custom event triggered by some parent components when this component changes his visibility, e.g. triggered in the bs5-tabs component
    this.addEventListener(
      "visibility-changed" as any,
      this.onVisibilityChanged
    );

    this.slideshowInner?.addEventListener("scroll", this.onScroll, {
      passive: true
    });
    this.slideshowInner?.addEventListener("scrollended", this.onScrollend, {
      passive: true
    });

    this.addEventListener("mouseenter", this.onMouseIn, { passive: true });
    this.addEventListener("mouseover", this.onMouseIn, { passive: true });
    this.addEventListener("focusin", this.onMouseIn, { passive: true });
    this.addEventListener("touchstart", this.onMouseIn, { passive: true });

    this.addEventListener("mouseleave", this.onMouseOut, { passive: true });
    this.addEventListener("focusout", this.onMouseOut, { passive: true });

    this.addEventListener("mouseup", this.onMouseUp, { passive: true });
    this.addEventListener("touchend", this.onMouseUp, { passive: true });
    this.addEventListener("scroll", this.onMouseUp, { passive: true });
    this.addEventListener("scrollend", this.onMouseUp, { passive: true });
    // See ScrollEventsService for this event
    this.addEventListener("scrollended", this.onMouseUp, { passive: true });
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

    this.removeEventListener("mouseleave", this.onMouseOut);
    this.removeEventListener("focusout", this.onMouseOut);

    this.removeEventListener("mouseup", this.onMouseUp);
    this.removeEventListener("touchend", this.onMouseUp);
    this.removeEventListener("scroll", this.onMouseUp);
    this.removeEventListener("scrollend", this.onMouseUp);
    // See ScrollEventsService for this event
    this.removeEventListener("scrollended", this.onMouseUp);
  }

  protected initAll() {
    this.initSlideshowInner();
    this.initOptions();
    this.addEventListeners();
    // initial
    this.onViewChanges();
    this.onScrollend();
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.validateItems();
  }

  protected async afterBind() {
    this.initAll();
    await super.afterBind();
  }

  protected initSlideshowInner() {
    if (!this.slideshowInner) {
      this.throw(new Error("Can't init slideshow inner!"));
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

  public enableTouchScroll() {
    this.classList.remove("touchscroll-disabled");
  }

  public disableTouchScroll() {
    this.classList.add("touchscroll-disabled");
  }

  protected enableContinuousAutoplay() {
    if (!this.continuousAutoplayService && this.slideshowInner) {
      const autoscrollOptions: AutoscrollOptions = {
        velocity: this.scope.autoplayVelocity,
        angle: this.scope.angle,
        pauseOnHover: this.scope.pauseOnHover
      };
      this.continuousAutoplayService = new Autoscroll(
        this.slideshowInner,
        autoscrollOptions
      );
    }
    // on continuous autoplay the scrollended event is never triggered, so call this method all `intervalsTimeMs` milliseconds as a WORKAROUND
    if (this.continuousAutoplayIntervalIndex === null) {
      // intervals are depending on the autoscrolling speed (autoplayVelocity)
      const intervalsTimeMs = this.scope.autoplayVelocity * 10000;
      // this.debug('intervalsTimeMs', intervalsTimeMs);
      this.continuousAutoplayIntervalIndex = window.setInterval(
        this.onScrollend.bind(this),
        intervalsTimeMs
      );
    }
  }

  protected disableContinuousAutoplay() {
    if (this.continuousAutoplayService) {
      this.continuousAutoplayService.pause();
      this.continuousAutoplayService.destroy();
      this.continuousAutoplayService = undefined;
    }
    if (this.continuousAutoplayIntervalIndex !== null) {
      window.clearInterval(this.continuousAutoplayIntervalIndex);
      this.continuousAutoplayIntervalIndex = null;
    }
  }

  protected resetIntervalAutoplay() {
    this.scope.intervalCount = 0;
    this.scope.intervalProgress = 0;
  }

  protected enableIntervalAutoplay() {
    const steps = 100;
    if (this.autoplayIntervalIndex === null) {
      this.autoplayIntervalIndex = window.setInterval(() => {
        if (!this.scope.pause) {
          this.scope.intervalCount += steps;
          this.scope.intervalProgress =
            (this.scope.intervalCount / this.scope.autoplayInterval) * 100;
          if (this.scope.intervalProgress >= 100) {
            this.next();
          }
        }
      }, steps);
    }
  }

  protected disableIntervalAutoplay() {
    this.resetIntervalAutoplay();
    console.debug("disableIntervalAutoplay", this.autoplayIntervalIndex);
    if (this.autoplayIntervalIndex !== null) {
      window.clearInterval(this.autoplayIntervalIndex);
      this.autoplayIntervalIndex = null;
    }
  }

  protected disableAutoplay() {
    this.disableIntervalAutoplay();
    this.disableContinuousAutoplay();
  }

  protected enableAutoplay() {
    this.disableAutoplay();
    // continuous scrolling
    if (this.scope.autoplayInterval <= 0) {
      this.enableContinuousAutoplay();
    } else {
      this.enableIntervalAutoplay();
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

  protected validateItems() {
    if (!this.scope.items) {
      this.throw(new Error("No items to validate!"));
      return;
    }
    for (let i = 0; i < this.scope.items.length; i++) {
      const item = this.scope.items[i];
      item.index = item.index || i;
      item.active = item.active || false;
      item.title = item.title || "";
      item.handle = item.handle || item.index.toString();
      item.position =
        item.position ||
        ({
          centerX: 0,
          centerY: 0
        } as SlideshowSlidePosition);

      item.class = item.class || "";
      item.class += " slide";

      item.content = item.content || templateImage;
    }
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
      this.throw(
        new Error(
          "Can't not add items by child's because no slide child's are found!"
        )
      );
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
          centerX: 0
        }
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
      this.throw(new Error("No slide items found!"));
      return -1;
    }

    let nearZero = Math.abs(
      this.scope.angle === "vertical"
        ? this.scope.items[0].position.centerY
        : this.scope.items[0].position.centerX
    );
    let minIndex = 0;

    for (let i = 1; i < this.scope.items.length; i++) {
      const position = Math.abs(
        this.scope.angle === "vertical"
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

  protected setSlideActive(index: number) {
    if (index === -1 || !this.scope.items?.length) {
      console.warn(new Error("Most centered slide not found!"));
      index = 0;
    }

    if (!this.scope.items?.[index]) {
      index = 0;
    }
    if (!this.scope.items?.[index]) {
      this.throw(new Error("Slide item to set active not found!"));
      return 0;
    }
    this.setAllSlidesInactive(index);
    this.scope.items[index].active = true;
    this.scope.activeIndex = index;
    this.scope.nextIndex = this.getNextIndex(index);
    this.scope.prevIndex = this.getPrevIndex(index);
    this.resetIntervalAutoplay();

    if (this.slideElements && this.slideElements[index].classList) {
      this.slideElements[index].classList.add("active");
    }
  }

  protected setCenteredSlideActive(): number {
    const index = this.getMostCenteredSlideIndex();
    this.setSlideActive(index);
    return index;
  }

  protected isScrollableToIndex(index: number) {
    const scrollPosition = this.getScrollPosition();
    if (!this.scope.items?.[index] || !this.slideshowInner || !scrollPosition) {
      return false;
    }
    const maxScrollTo =
      this.scope.angle === "vertical"
        ? scrollPosition.maxY
        : scrollPosition.maxX;
    const scrollTo =
      this.scope.angle === "vertical"
        ? this.slideshowInner.scrollTop +
          this.scope.items[index].position.centerY
        : this.slideshowInner.scrollLeft +
          this.scope.items[index].position.centerX;
    return scrollTo <= maxScrollTo && scrollTo >= 0;
  }

  protected setSlidePositions() {
    if (!this.bound) {
      return;
    }

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
        ...rect,
        // 0 if element is in the middle / center
        centerY: rect.y + rect.height / 2 - mainBoundingClient.height / 2,
        // 0 if element is in the middle / center
        centerX: rect.x + rect.width / 2 - mainBoundingClient.width / 2
      };
    }
  }

  protected requiredAttributes(): string[] {
    return ["items"];
  }

  /**
   * Similar to attributeChangedCallback but attribute arguments are already parsed as they are stored in the scope
   * @param attributeName
   * @param oldValue
   * @param newValue
   * @param namespace
   */
  protected parsedAttributeChangedCallback(
    attributeName: keyof Bs5SlideshowComponentScope,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace
    );

    if (attributeName === "items") {
      this.validateItems();
    }

    if (attributeName === "autoplay") {
      if (this.scope.autoplay) {
        this.enableAutoplay();
      } else {
        this.disableAutoplay();
      }
    }

    if (attributeName === "drag") {
      if (this.scope.drag) {
        this.enableDesktopDragscroll();
      } else {
        this.disableDesktopDragscroll();
      }
    }

    if (attributeName === "touchScroll") {
      if (this.scope.touchScroll) {
        this.enableTouchScroll();
      } else {
        this.disableTouchScroll();
      }
    }
    if (attributeName === "controls" || attributeName === "controlsPosition") {
      this.setControlsOptions();
    }

    if (
      attributeName === "indicators" ||
      attributeName === "indicatorsPosition"
    ) {
      this.setIndicatorsOptions();
    }
  }

  // deconstruction
  protected disconnectedCallback() {
    this.removeEventListeners();
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
