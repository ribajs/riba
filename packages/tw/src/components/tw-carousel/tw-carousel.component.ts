import { TemplateFunction } from "@ribajs/core";
import {
  TwSlideshowComponent,
  TwSlideshowComponentScope,
} from "../tw-slideshow/tw-slideshow.component.js";

/**
 * Carousel component — a thin alias for TwSlideshowComponent with
 * different defaults suited for auto-playing, infinite-looping carousels.
 */
export class TwCarouselComponent extends TwSlideshowComponent {
  public static override tagName = "tw-carousel";

  static override get observedAttributes(): string[] {
    return [
      ...TwSlideshowComponent.observedAttributes,
      "autoplay",
      "autoplay-interval",
    ];
  }

  protected override defaultScope: TwSlideshowComponentScope = {
    // Options — carousel-specific defaults
    slidesToScroll: 1,
    controls: true,
    controlsPosition: "inside-middle",
    sticky: false,
    indicators: true,
    indicatorsPosition: "inside-bottom",
    drag: true,
    touchScroll: true,
    angle: "horizontal",
    infinite: true,
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

  protected autoplayEnabled = false;
  protected autoplayInterval = 5000;
  protected autoplayTimerIndex: number | null = null;

  public override scope: TwSlideshowComponentScope = {
    ...this.defaultScope,
  };

  constructor() {
    super();
  }

  protected override parsedAttributeChangedCallback(
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

    if (attributeName === "autoplay") {
      this.autoplayEnabled = !!newValue;
      if (this.autoplayEnabled) {
        this.startAutoplay();
      } else {
        this.stopAutoplay();
      }
    }

    if (attributeName === "autoplayInterval") {
      this.autoplayInterval =
        typeof newValue === "number" ? newValue : parseInt(newValue, 10) || 5000;
      if (this.autoplayEnabled) {
        this.startAutoplay();
      }
    }
  }

  protected override async afterBind() {
    await super.afterBind();
    if (this.autoplayEnabled) {
      this.startAutoplay();
    }
  }

  protected startAutoplay() {
    this.stopAutoplay();
    if (this.autoplayInterval > 0) {
      this.autoplayTimerIndex = window.setInterval(() => {
        this.next();
      }, this.autoplayInterval);
    }
  }

  protected stopAutoplay() {
    if (this.autoplayTimerIndex !== null) {
      window.clearInterval(this.autoplayTimerIndex);
      this.autoplayTimerIndex = null;
    }
  }

  protected override disconnectedCallback() {
    this.stopAutoplay();
    super.disconnectedCallback();
  }

  protected override template(): ReturnType<TemplateFunction> {
    // Re-use the slideshow template
    return super.template();
  }
}
