import type { Bs5SliderComponent } from "../components/bs5-slider/bs5-slider.component.js";

import type {
  Bs5SliderSlide,
  Bs5SliderControlsPosition,
  Bs5SliderIndicatorsPosition,
} from "./index.js";

export interface Bs5SliderComponentScope {
  // TEMPLATE METHODS

  next: Bs5SliderComponent["next"];
  prev: Bs5SliderComponent["prev"];
  goTo: Bs5SliderComponent["goTo"];
  enableTouchScroll: Bs5SliderComponent["enableTouchScroll"];
  disableTouchScroll: Bs5SliderComponent["disableTouchScroll"];

  // TEMPLATE PROPERTIES

  items: Bs5SliderSlide[];

  // CLASSES

  controlsPositionClass: string;
  indicatorsPositionClass: string;

  // STATES

  nextIndex: number;
  prevIndex: number;
  enableNextControl: boolean;
  enablePrevControl: boolean;
  activeSlides: number[];
  isScrolling: boolean;
  showControls: boolean;
  showIndicators: boolean;
  slideItemStyle: {
    [key: string]: string;
  };

  // OPTIONS

  /** Show controls */
  controls: boolean;
  /** Position of the controls */
  controlsPosition: Bs5SliderControlsPosition;
  /** Show indicators */
  indicators: boolean;
  /** Position of the indicators */
  indicatorsPosition: Bs5SliderIndicatorsPosition;
  /** number of slides to be scrolled by clicking on the controls */
  slidesToScroll: number;
  /** Autoscroll to the nearest slide after manual scroll or dragscroll */
  sticky: boolean;
  /** Slides are draggable on desktop browsers / non-touch devices */
  drag: boolean;
  /** Slides are scrollable through touch on touch devices */
  touchScroll: boolean;
  /** Slide angle, can be vertical or horizontal */
  angle: "vertical" | "horizontal";
  /** Starts again at the beginning/end, so that infinite scrolling is possible  */
  infinite: boolean;
  /** Number of columns per slide, `0` this will be ignored */
  columns: number;
  /** Riba slide template */
  slideTemplate?: string;
}
