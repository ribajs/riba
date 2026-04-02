import { Component, TemplateFunction } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { scrollTo } from "@ribajs/utils/src/dom.js";
import { debounce } from "@ribajs/utils/src/control";
import {
  Dragscroll,
  DragscrollOptions,
  ScrollPosition,
  ScrollEventsService,
  getScrollPosition,
} from "@ribajs/extras";
import template from "./tw-slideshow.component.html?raw";

export interface TwSlideshowSlide {
  active: boolean;
  index: number;
  el?: HTMLElement;
}

export interface TwSlideshowComponentScope {
  // Options
  slidesToScroll: number;
  controls: boolean;
  controlsPosition: string;
  sticky: boolean;
  indicators: boolean;
  indicatorsPosition: string;
  drag: boolean;
  touchScroll: boolean;
  angle: "horizontal" | "vertical";
  infinite: boolean;
  columns: number;

  // States
  items: TwSlideshowSlide[];
  nextIndex: number;
  prevIndex: number;
  enableNextControl: boolean;
  enablePrevControl: boolean;
  showControls: boolean;
  showIndicators: boolean;
  activeSlides: number[];
  isScrolling: boolean;
  slideItemStyle: Record<string, string>;
  slideTemplate?: string;

  // Template methods
  next: TwSlideshowComponent["next"];
  prev: TwSlideshowComponent["prev"];
  goTo: TwSlideshowComponent["goTo"];
  enableTouchScroll: TwSlideshowComponent["enableTouchScroll"];
  disableTouchScroll: TwSlideshowComponent["disableTouchScroll"];

  // Classes
  controlsPositionClass: string;
  indicatorsPositionClass: string;
}

const SLIDESHOW_INNER_SELECTOR = ".slideshow-row";
const SLIDES_SELECTOR = `${SLIDESHOW_INNER_SELECTOR} .slide`;

/**
 * A full-featured slideshow/carousel component with drag, touch, auto-scroll,
 * indicators, and controls. Supports `<template type="slide-item">` children.
 *
 * @event scrolling - Fires when the slideshow is scrolling
 * @event scrollended - Fires when the slideshow has scrolled
 */
export class TwSlideshowComponent extends Component {
  protected resizeObserver?: ResizeObserver;

  protected get slideshowInner() {
    return this.querySelector<HTMLElement>(SLIDESHOW_INNER_SELECTOR);
  }

  protected get slideElements() {
    return Array.from(this.querySelectorAll<HTMLElement>(SLIDES_SELECTOR));
  }

  protected get controlsElements() {
    return this.querySelectorAll(
      ".slideshow-control-prev, .slideshow-control-next",
    );
  }

  protected get indicatorsElement() {
    return this.querySelector(".slideshow-indicators");
  }

  public static EVENTS = {
    scrolling: "scrolling",
    scrollended: "scrollended",
  };

  static get observedAttributes(): string[] {
    return [
      "items",
      "slides-to-scroll",
      "controls",
      "controls-position",
      "drag",
      "angle",
      "sticky",
      "indicators",
      "indicators-position",
      "infinite",
      "columns",
    ];
  }

  protected defaultScope: TwSlideshowComponentScope = {
    // Options
    slidesToScroll: 1,
    controls: true,
    controlsPosition: "inside-middle",
    sticky: false,
    indicators: true,
    indicatorsPosition: "inside-bottom",
    drag: true,
    touchScroll: true,
    angle: "horizontal",
    infinite: false,
    columns: 0,

    // States
    items: [],
    nextIndex: -1,
    prevIndex: -1,
    enableNextControl: false,
    enablePrevControl: false,
    showControls: false,
    showIndicators: false,
    activeSlides: [],
    isScrolling: false,
    slideItemStyle: {},

    // Template methods
    next: this.next.bind(this),
    prev: this.prev.bind(this),
    goTo: this.goTo.bind(this),
    enableTouchScroll: this.enableTouchScroll.bind(this),
    disableTouchScroll: this.disableTouchScroll.bind(this),

    // Classes
    controlsPositionClass: "",
    indicatorsPositionClass: "",
  };

  public static tagName = "tw-slideshow";

  protected autobind = true;

  protected dragscrollService?: Dragscroll;

  protected scrollEventsService?: ScrollEventsService;

  protected routerEvents = new EventDispatcher("main");

  public scope: TwSlideshowComponentScope = {
    ...this.defaultScope,
  };

  constructor() {
    super();
    this.onViewChanges = this.onViewChanges.bind(this);
    this.onVisibilityChanged = this.onVisibilityChanged.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onScrollEnd = this.onScrollEnd.bind(this);
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
   * @param index The index of the slide you want to go to
   * @param fromRight If true, the index is calculated from the right side of the slideshow
   * @returns The index of the slide you went to or -1 if the end is reached
   */
  public goTo(index: number, fromRight = false) {
    if (index === -1 && !this.scope.infinite) {
      console.warn(`End of slideshow reached!`);
      return -1;
    }

    if (index !== -1 && fromRight && this.scope.activeSlides.length > 1) {
      index = index - this.scope.activeSlides.length + 1;
      if (index < 0) {
        index = 0;
      }
    }

    const item = this.scope.items[index];

    if (!item || !this.slideshowInner || !item.el) {
      console.warn(`Slide element with index "${index}" not found!`);
      return -1;
    }

    scrollTo(item.el, 0, this.slideshowInner, this.scope.angle);
    return index;
  }

  /**
   * Calculate the next index to scroll to
   */
  protected getNextIndex(currentActive: number) {
    let nextIndex = currentActive + this.scope.slidesToScroll;

    if (nextIndex > this.scope.items.length - 1) {
      if (this.scope.infinite) {
        nextIndex = nextIndex - this.scope.items.length;
      } else {
        return -1;
      }
    }
    return nextIndex;
  }

  /**
   * Calculate the previous index to scroll to
   */
  protected getPrevIndex(currentActive: number) {
    let prevIndex = currentActive - this.scope.slidesToScroll;

    if (prevIndex < 0) {
      if (this.scope.infinite) {
        prevIndex = this.scope.items.length - 1 + (prevIndex + 1);
      } else {
        return -1;
      }
    }
    return prevIndex;
  }

  protected scrollToNextSlide() {
    if (this.scope.isScrolling) {
      this.scope.nextIndex = this.getNextIndex(this.scope.nextIndex);
      this.updateControls();
    }
    return this.goTo(this.scope.nextIndex, true);
  }

  protected scrollToPrevSlide() {
    if (this.scope.isScrolling) {
      this.scope.prevIndex = this.getPrevIndex(this.scope.prevIndex);
      this.updateControls();
    }
    return this.goTo(this.scope.prevIndex, false);
  }

  protected initOptions() {
    this.setOptions();
  }

  protected setOptions() {
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
    this.updateColumns();
    this.setControlsOptions();
    this.setIndicatorsOptions();
  }

  protected updateColumns() {
    this.scope.slideItemStyle ||= {};

    if (this.scope.columns > 0) {
      this.scope.slideItemStyle.flex = `0 0 ${100 / this.scope.columns}%`;
    } else {
      this.scope.slideItemStyle.flex = "";
    }
  }

  protected setControlsOptions() {
    const position = this.scope.controlsPosition?.split("-");
    if (this.scope.controls && position.length === 2) {
      this.scope.controlsPositionClass = `control-${position[0]} control-${position[1]}`;
    } else {
      this.scope.controlsPositionClass = "";
    }
  }

  protected setIndicatorsOptions() {
    const positions = this.scope.indicatorsPosition?.split("-");
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
      this.updateSlides();
    } catch (error: any) {
      this.throw(error);
    }
  }

  protected onViewChanges = debounce(this._onViewChanges.bind(this));

  protected onVisibilityChanged(event: CustomEvent) {
    if (event.detail.visible) {
      this.dragscrollService?.checkDraggable();
    }
  }

  protected onScroll(
    event: CustomEvent<{
      startPosition: ScrollPosition | null;
      currentPosition: ScrollPosition;
      direction: string;
    }>,
  ) {
    this.scope.isScrolling = true;
    this.dispatchEvent(new CustomEvent(event.type, { detail: event.detail }));
  }

  protected onScrollEnd(
    event: CustomEvent<{
      startPosition: ScrollPosition | null;
      endPosition: ScrollPosition | null;
      direction: string;
    }>,
  ) {
    this.scope.isScrolling = false;
    if (!this.scope.items?.length) {
      return;
    }

    if (event.detail.direction === "none") {
      return;
    }

    this.dispatchEvent(new CustomEvent(event.type, { detail: event.detail }));

    try {
      this.updateSlides();
    } catch (error: any) {
      this.throw(error);
    }
  }

  protected connectedCallback() {
    if (this.scope.items.length || this.scope.slideTemplate) {
      this.updateItems();
    } else {
      this.initItemsByChildren();
    }

    super.connectedCallback();
    this.init(TwSlideshowComponent.observedAttributes);
    this.addEventListeners();
  }

  protected addEventListeners() {
    this.routerEvents.on("newPageReady", this.onViewChanges);

    if (window.ResizeObserver) {
      this.resizeObserver = new window.ResizeObserver(this.onViewChanges);
      this.resizeObserver?.observe(this);
    }

    window.addEventListener("resize", this.onViewChanges, { passive: true });

    this.addEventListener(
      "visibility-changed" as any,
      this.onVisibilityChanged,
    );

    this.slideshowInner?.addEventListener(
      "scrolling",
      this.onScroll as EventListener,
      { passive: true },
    );
    this.slideshowInner?.addEventListener(
      "scrollended",
      this.onScrollEnd as EventListener,
      { passive: true },
    );
  }

  protected removeEventListeners() {
    this.routerEvents.off("newPageReady", this.onViewChanges, this);

    window.removeEventListener("resize", this.onViewChanges);

    this.resizeObserver?.unobserve(this);

    this.removeEventListener(
      "visibility-changed" as any,
      this.onVisibilityChanged,
    );

    this.slideshowInner?.removeEventListener(
      "scrolling",
      this.onScroll as EventListener,
    );
    this.slideshowInner?.removeEventListener(
      "scrollended",
      this.onScrollEnd as EventListener,
    );
  }

  protected initAll() {
    this.initSlideshowInner();
    this.initOptions();
    this.addEventListeners();
    this.updateSlides();
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.validateItems();
  }

  protected async afterBind() {
    if (this._usePassthrough) {
      // Destroy any dragscroll created during attribute parsing (before DOM was restructured)
      this.disableDesktopDragscroll();
      this.wrapInSlideshowInner();
      this.injectControls();
      this.injectIndicators();
    }
    this.initAll();
    this.updateItems();
    // Re-apply drag classes after items are fully initialized
    if (this.scope.drag) {
      this.enableDesktopDragscroll();
    }
    this.classList.add(`${TwSlideshowComponent.tagName}-ready`);
    await super.afterBind();
  }

  protected async afterAllBind() {
    this.updateItems();
    await super.afterAllBind();
  }

  protected initSlideshowInner() {
    if (!this.slideshowInner) {
      this.throw(new Error("Can't init slideshow inner!"));
      return;
    }

    this.scrollEventsService = new ScrollEventsService(this.slideshowInner);
  }

  protected preventDragstart = (e: Event) => e.preventDefault();

  protected onDragMouseDown = () => {
    // Disable scroll-snap and smooth scrolling during drag so that
    // rapid programmatic scrollLeft changes in onMouseMove apply immediately
    // instead of each triggering a competing smooth animation.
    if (this.slideshowInner) {
      this.slideshowInner.style.scrollSnapType = "none";
      this.slideshowInner.style.scrollBehavior = "auto";
    }
  };

  protected onDragMouseUp = () => {
    // Re-enable scroll-snap and smooth scrolling
    if (this.slideshowInner) {
      this.slideshowInner.style.scrollSnapType = "";
      this.slideshowInner.style.scrollBehavior = "";
    }
  };

  protected enableDesktopDragscroll() {
    console.debug("[tw-slideshow] enableDesktopDragscroll", {
      hasDragscrollService: !!this.dragscrollService,
      hasSlideshowInner: !!this.slideshowInner,
      scopeDrag: this.scope.drag,
      passthrough: this._usePassthrough,
    });

    if (!this.dragscrollService) {
      if (!this.slideshowInner) {
        console.warn("[tw-slideshow] No slideshowInner found, cannot enable dragscroll");
        return;
      }
      const dragscrollOptions: DragscrollOptions = { detectGlobalMove: true };
      this.dragscrollService = new Dragscroll(
        this.slideshowInner,
        dragscrollOptions,
      );
      console.debug("[tw-slideshow] Dragscroll service created");
    }

    // Temporarily disable scroll-snap while dragging
    this.slideshowInner?.addEventListener("mousedown", this.onDragMouseDown);
    window.addEventListener("mouseup", this.onDragMouseUp);

    // Prevent ghost images: suppress the native dragstart event and
    // set draggable=false on all draggable content (images, links, etc.)
    this.addEventListener("dragstart", this.preventDragstart);
    this.classList.add("drag-none");
    const draggables = this.querySelectorAll("img, video, svg, a");
    draggables.forEach((el) => {
      el.setAttribute("draggable", "false");
      el.classList.add("drag-none");
    });
  }

  protected disableDesktopDragscroll() {
    if (this.dragscrollService) {
      this.dragscrollService.destroy();
      this.dragscrollService = undefined;
    }
    this.slideshowInner?.removeEventListener("mousedown", this.onDragMouseDown);
    window.removeEventListener("mouseup", this.onDragMouseUp);
    this.removeEventListener("dragstart", this.preventDragstart);
    this.classList.remove("drag-none");
    const draggables = this.querySelectorAll("img, video, svg, a");
    draggables.forEach((el) => {
      el.removeAttribute("draggable");
      el.classList.remove("drag-none");
    });
  }

  public enableTouchScroll() {
    this.classList.remove("touchscroll-disabled");
  }

  public disableTouchScroll() {
    this.classList.add("touchscroll-disabled");
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
    }
  }

  public updateItems() {
    let hasChange = false;
    const slideEls = this.slideElements;

    if (!this.scope.slideTemplate) {
      slideEls.forEach((slideEl, index) => {
        const exists = this.scope.items.find((item) => item.el === slideEl);
        if (!exists) {
          this.addItemByElement(slideEl, index);
          hasChange = true;
        }
      });

      for (const item of this.scope.items) {
        const exists = slideEls.find((slideEl) => slideEl === item.el);
        if (!exists) {
          this.removeItem(item.index, false);
          hasChange = true;
        }
      }
    }

    if (hasChange) {
      this.updateItemIndexes();
      this.updateSlides();
    }

    return hasChange;
  }

  protected removeItem(index: number, updateIndex = true) {
    const item = this.scope.items[index];
    if (!item) {
      return;
    }
    item.el?.remove();
    this.scope.items.splice(index, 1);
    if (updateIndex) this.updateItemIndexes();
  }

  protected updateItemIndexes() {
    for (let i = 0; i < this.scope.items.length; i++) {
      const item = this.scope.items[i];
      item.index = i;
    }
  }

  protected addItemByElement(slideElement: HTMLElement, index: number) {
    slideElement.setAttribute("data-index", index.toString());
    const attributes: TwSlideshowSlide = {
      active: false,
      index,
      el: slideElement,
    };
    this.scope.items.push(attributes);
  }

  protected initItemsByChildren() {
    if (!this.slideElements) {
      this.throw(
        new Error(
          "Can't add items by children because no slide children are found!",
        ),
      );
    }
    this.scope.items = [];
    this.slideElements.forEach(this.addItemByElement.bind(this));
  }

  protected getScrollPosition(): ScrollPosition | null {
    if (!this.slideshowInner) {
      return null;
    }
    return getScrollPosition(this.slideshowInner);
  }

  protected setAllSlidesInactive(excludeIndex = -1) {
    for (const item of this.scope.items) {
      if (item.index !== excludeIndex) {
        item.active = false;
        item.el?.classList.remove("active");
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
      this.throw(new Error("Slide item to set active, not found!"));
      return 0;
    }

    const item = this.scope.items[index];
    item.active = true;
    item.el?.classList.add("active");
  }

  protected setSlidesActive(slides: number[]) {
    this.setAllSlidesInactive();
    for (const slideIndex of slides) {
      this.setSlideActive(slideIndex);
    }
  }

  protected isScrollable() {
    if (!this.slideshowInner) {
      return false;
    }

    const hasScrollableContent =
      this.scope.angle === "horizontal"
        ? this.slideshowInner.scrollWidth > this.slideshowInner.clientWidth
        : this.slideshowInner.scrollHeight > this.slideshowInner.clientHeight;

    return hasScrollableContent;
  }

  protected getSlideElementByIndex(index: number) {
    if (!this.slideshowInner) {
      return undefined;
    }
    return this.slideshowInner.querySelector(
      `[data-index="${index}"]`,
    ) as HTMLElement;
  }

  protected isSlideVisible(item: TwSlideshowSlide, offset: number) {
    if (!this.slideshowInner) {
      return false;
    }
    const containerRect = this.slideshowInner.getBoundingClientRect();
    item.el ||= this.getSlideElementByIndex(item.index);
    const slideEl = item.el;
    if (!slideEl) {
      console.warn("Slide element not found!");
      return false;
    }
    const slideRect = slideEl.getBoundingClientRect();

    const isVisible =
      this.scope.angle === "horizontal"
        ? slideRect.left + offset >= containerRect.left &&
          slideRect.right - offset <= containerRect.right
        : slideRect.top + offset >= containerRect.top &&
          slideRect.bottom - offset <= containerRect.bottom;

    return isVisible;
  }

  protected getVisibleSlides(offset: number) {
    const activeSlides: number[] = [];

    if (!this.scope.items?.length) {
      return activeSlides;
    }

    for (const item of this.scope.items) {
      if (this.isSlideVisible(item, offset)) {
        activeSlides.push(item.index);
      }
    }

    return activeSlides.sort((a, b) => a - b);
  }

  protected setVisibleSlidesActive(offset: number) {
    this.setAllSlidesInactive();
    const activeSlides = this.getVisibleSlides(offset);
    this.setSlidesActive(activeSlides);
    return activeSlides;
  }

  updateActiveSlides(offset = 8) {
    const activeSlides = this.setVisibleSlidesActive(offset);
    const firstIndex = activeSlides[0] || 0;
    const lastIndex = activeSlides[activeSlides.length - 1] || 0;
    const prevIndex = this.getPrevIndex(firstIndex);
    const nextIndex = this.getNextIndex(lastIndex);
    return {
      firstIndex,
      lastIndex,
      activeSlides,
      prevIndex,
      nextIndex,
    };
  }

  protected updateSlides(offset = 8, isRetry = false): number[] {
    if (!this.scope.items.length) {
      return [];
    }
    const { activeSlides, firstIndex, prevIndex, nextIndex } =
      this.updateActiveSlides(offset);

    // Try again with a bigger offset if no slides are found
    if (!activeSlides.length && !isRetry) {
      let fallbackOffset = offset * 2;
      if (this.scope.angle === "horizontal") {
        const slideWidth = this.scope.items[0]?.el?.clientWidth || 0;
        if (slideWidth) {
          fallbackOffset = Math.round(slideWidth / 2 - 0.5);
        }
      } else {
        const slideHeight = this.scope.items[0]?.el?.clientHeight || 0;
        if (slideHeight) {
          fallbackOffset = Math.round(slideHeight / 2 - 0.5);
        }
      }
      return this.updateSlides(fallbackOffset, true);
    }

    this.scope.activeSlides = activeSlides;
    this.scope.prevIndex = prevIndex;
    this.scope.nextIndex = nextIndex;

    this.updateControls();
    this.updateIndicators();

    if (this.scope.sticky) {
      this.goTo(firstIndex);
    }

    return activeSlides;
  }

  protected updateControls() {
    const isScrollable = this.isScrollable();
    this.scope.showControls =
      this.scope.controls && isScrollable && this.scope.items.length > 1;

    if (this.scope.infinite) {
      this.scope.enableNextControl = true;
      this.scope.enablePrevControl = true;
      return;
    }

    this.scope.enableNextControl =
      isScrollable &&
      this.scope.nextIndex !== -1 &&
      this.scope.nextIndex <= this.scope.items.length - 1;
    this.scope.enablePrevControl =
      isScrollable && this.scope.prevIndex !== -1 && this.scope.prevIndex >= 0;
  }

  protected updateIndicators() {
    const isScrollable = this.isScrollable();
    this.scope.showIndicators =
      this.scope.indicators && isScrollable && this.scope.items.length > 1;
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null,
  ) {
    super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace,
    );

    if (attributeName === "items") {
      this.validateItems();
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

    if (attributeName === "columns") {
      this.updateColumns();
    }
  }

  protected disconnectedCallback() {
    this.removeEventListeners();
  }

  protected async beforeTemplate(): Promise<void> {
    const templates = Array.from(this.querySelectorAll("template"));
    for (const tpl of templates) {
      const type = tpl.getAttribute("type");
      switch (type) {
        case "slide-item":
          this.scope.slideTemplate =
            tpl.content.children.item(0)?.outerHTML || undefined;
          this.debug("Slide template found!", this.scope.slideTemplate);
          break;
        default:
          console.warn(`Unknown template type: ${type}`, tpl);
          break;
      }
    }
  }

  /** Whether we're using pass-through mode (consumer provided slide children) */
  protected _usePassthrough = false;

  protected template(): ReturnType<TemplateFunction> {
    // If the consumer already provides .slideshow-row or .slide children,
    // keep them and enhance with controls/indicators dynamically.
    if (
      this.querySelector(SLIDESHOW_INNER_SELECTOR) ||
      this.querySelector(SLIDES_SELECTOR)
    ) {
      this._usePassthrough = true;
      return null;
    }
    return template;
  }

  /**
   * In pass-through mode, wrap existing content in a .slideshow-inner container
   * so controls/indicators can be positioned correctly.
   */
  protected wrapInSlideshowInner() {
    if (this.querySelector(".slideshow-inner")) return;

    const wrapper = document.createElement("div");
    wrapper.className = "slideshow-inner relative overflow-hidden w-full";

    while (this.firstChild) {
      wrapper.appendChild(this.firstChild);
    }
    this.appendChild(wrapper);
  }

  /**
   * Create an SVG chevron element for control buttons.
   */
  protected createChevronSvg(direction: "left" | "right"): SVGElement {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "w-5 h-5");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("viewBox", "0 0 24 24");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("stroke-width", "2");
    path.setAttribute(
      "d",
      direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7",
    );
    svg.appendChild(path);
    return svg;
  }

  /**
   * Dynamically inject prev/next control buttons for pass-through mode.
   */
  protected injectControls() {
    if (!this.scope.controls) return;
    const inner = this.querySelector(".slideshow-inner");
    if (!inner || inner.querySelector(".slideshow-controls")) return;

    const controlsDiv = document.createElement("div");
    controlsDiv.className =
      "slideshow-controls absolute inset-0 flex items-center justify-between pointer-events-none z-10";

    const prevBtn = document.createElement("button");
    prevBtn.className =
      "slideshow-control-prev pointer-events-auto flex items-center justify-center w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors ml-2";
    prevBtn.setAttribute("aria-label", "Previous slide");
    prevBtn.appendChild(this.createChevronSvg("left"));
    prevBtn.addEventListener("click", () => this.prev());

    const nextBtn = document.createElement("button");
    nextBtn.className =
      "slideshow-control-next pointer-events-auto flex items-center justify-center w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors mr-2";
    nextBtn.setAttribute("aria-label", "Next slide");
    nextBtn.appendChild(this.createChevronSvg("right"));
    nextBtn.addEventListener("click", () => this.next());

    controlsDiv.appendChild(prevBtn);
    controlsDiv.appendChild(nextBtn);
    inner.appendChild(controlsDiv);
  }

  /**
   * Dynamically inject indicator dots for pass-through mode.
   */
  protected injectIndicators() {
    if (!this.scope.indicators) return;
    const inner = this.querySelector(".slideshow-inner");
    if (!inner || inner.querySelector(".slideshow-indicators")) return;

    const indicatorsDiv = document.createElement("div");
    indicatorsDiv.className =
      "slideshow-indicators absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10";

    inner.appendChild(indicatorsDiv);

    // Override updateIndicators to also render pass-through dots
    const origUpdateIndicators = this.updateIndicators.bind(this);
    this.updateIndicators = () => {
      origUpdateIndicators();
      this.renderPassthroughIndicators(indicatorsDiv);
    };
  }

  /**
   * Render indicator dots based on current items for pass-through mode.
   */
  protected renderPassthroughIndicators(container: HTMLElement) {
    if (!this.scope.showIndicators) {
      container.style.display = "none";
      return;
    }
    container.style.display = "";

    // Sync dot count with items
    while (container.children.length > this.scope.items.length) {
      container.lastChild?.remove();
    }
    while (container.children.length < this.scope.items.length) {
      const dot = document.createElement("button");
      dot.className =
        "w-2.5 h-2.5 rounded-full transition-colors border border-white/60";
      dot.setAttribute("aria-label", "Go to slide");
      const idx = container.children.length;
      dot.addEventListener("click", () => this.goTo(idx));
      container.appendChild(dot);
    }

    // Update active state
    Array.from(container.children).forEach((dot, i) => {
      const isActive = this.scope.activeSlides.includes(i);
      dot.classList.toggle("bg-white", isActive);
      dot.classList.toggle("bg-white/40", !isActive);
    });
  }
}
