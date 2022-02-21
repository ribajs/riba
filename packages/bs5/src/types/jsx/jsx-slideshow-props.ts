import type { JsxHtmlGlobalProps } from "@ribajs/jsx";
import { SlideshowIndicatorsPosition, SlideshowControlsPosition } from ".."

export interface JsxBs5SlideshowProps extends JsxHtmlGlobalProps {
  "items"?: string;
  /** number of slides to be scrolled by clicking on the controls */
  "slides-to-scroll"?: number;
  /** Show controls */
  "controls"?: boolean;
  /** Position of the controls */
  "controls-position"?: SlideshowControlsPosition;
  /** Slides are draggable on desktop browsers */
  "drag"?: boolean;
  /** Enables autoplay continuously or with interval */
  "autoplay"?: boolean;
  /** Pause between autoscroll, 0 for continuously autoscrolling */
  "autoplay-interval"?: number;
  /** Scroll speed for continuously autoscrolling */
  "autoplay-velocity"?: number;
  /** Icon source url for the prev slide icon button */
  "control-prev-icon-src"?: string;
  /** Icon source url for the next slide icon button */
  "control-next-icon-src"?: string;
  /** Icon source url for the inactive indicator */
  "indicator-inactive-icon-src"?: string;
  /** Icon source url for the active indicator */
  "indicator-active-icon-src"?: string;
  /** Slide angle, can be vertical or horizontal */
  "angle"?: "vertical" | "horizontal";
  /** Pauses auto scroll on hover or focus */
  "pause-on-hover"?: boolean;
  /** Autoscroll to the nearest slide after manual scroll or dragscroll */
  "sticky"?: boolean;
  /** Show indicators */
  "indicators"?: string;
  /** Position of the indicators */
  "indicators-position"?: SlideshowIndicatorsPosition;
  /** Pause on autoplay (with interval) */
  "pause"?: boolean;
  /** Disables wraparound to first/last element of slideshow  */
  "infinite"?: boolean;
  /** Slides are scrollable through touch on touch devices */
  "touch-scroll"?: boolean;
}
