import type { JsxHtmlGlobalProps, JSXComponentBoolean } from "@ribajs/jsx";
import {
  Bs5SliderIndicatorsPosition,
  Bs5SliderControlsPosition,
} from "../../index.js";

export interface JsxBs5SliderProps extends JsxHtmlGlobalProps {
  items?: string;
  /** number of slides to be scrolled by clicking on the controls */
  "slides-to-scroll"?: number;
  /** Show controls */
  controls?: JSXComponentBoolean;
  /** Position of the controls */
  "controls-position"?: Bs5SliderControlsPosition;
  /** Slides are draggable on desktop browsers */
  drag?: JSXComponentBoolean;
  /** Slide angle, can be vertical or horizontal */
  angle?: "vertical" | "horizontal";
  /** Pauses auto scroll on hover or focus */
  "pause-on-hover"?: JSXComponentBoolean;
  /** Autoscroll to the nearest slide after manual scroll or dragscroll */
  sticky?: JSXComponentBoolean;
  /** Show indicators */
  indicators?: string;
  /** Position of the indicators */
  "indicators-position"?: Bs5SliderIndicatorsPosition;
  /** Disables wraparound to first/last element of slideshow  */
  infinite?: JSXComponentBoolean;
  /** Slides are scrollable through touch on touch devices */
  "touch-scroll"?: JSXComponentBoolean;
  /** Number of columns to show per slide */
  columns?: number;
}
