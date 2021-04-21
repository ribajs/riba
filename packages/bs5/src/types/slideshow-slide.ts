import { SlideshowSlidePosition } from "./slideshow-slide-position";

export interface SlideshowSlide {
  title?: string;
  content: string;
  handle?: string;
  active: boolean;
  type?: string;
  position: SlideshowSlidePosition;
  index: number;
}
