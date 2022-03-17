import { SlideshowSlidePosition } from "./slideshow-slide-position.js";

export interface SlideshowSlide {
  title?: string;
  content: string;
  handle?: string;
  active: boolean;
  type?: string;
  position: SlideshowSlidePosition;
  class?: string;
  index: number;
  /** Optional image source, can be used to append an image dynamically */
  src?: string;
}
