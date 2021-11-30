import type { Bs5SlideshowComponent } from "../components/bs5-slideshow/bs5-slideshow.component";

import type {
  SlideshowSlide,
  SlideshowControlsPosition,
  SlideshowIndicatorsPosition,
} from ".";

export interface Bs5SlideshowComponentResponsiveOptions {
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
  /** Slides are scrollable through touch on touch devices */
  touchScroll: boolean;
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
  /** Disables wraparound to first/last element of slideshow  */
  infinite: boolean;
}

export type Bs5SlideshowComponentOptions = {
  breakpoints: {
    [bp: string]: Partial<Bs5SlideshowComponentResponsiveOptions>;
  };
};

export interface Bs5SlideshowComponentScope
  extends Bs5SlideshowComponentOptions {
  next: Bs5SlideshowComponent["next"];
  prev: Bs5SlideshowComponent["prev"];
  goTo: Bs5SlideshowComponent["goTo"];
  enableTouchScroll: Bs5SlideshowComponent["enableTouchScroll"];
  disableTouchScroll: Bs5SlideshowComponent["disableTouchScroll"];
  controlsPositionClass: string;
  indicatorsPositionClass: string;
  items?: SlideshowSlide[];
  /** Active breakpoint options */
  activeBreakpoint: Bs5SlideshowComponentResponsiveOptions;
  /** If interval autoplay is active, this is the interval count. */
  intervalCount: number;
  /** If interval autoplay is active, this is the progress (in percent) until the next page is switched to. */
  intervalProgress: number;
  nextIndex: number;
  prevIndex: number;
  activeIndex: number;
}