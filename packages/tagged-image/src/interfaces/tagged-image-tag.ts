import { PopoverOptions } from "@ribajs/bs4";

/*
 * TODO: make tag an own component to encapsulate attributes?
 */
export interface TaggedImageTag {
  x: number;
  y: number;
  index?: number;
  left?: string;
  top?: string;
  popoverOptions: Partial<PopoverOptions>;
  el?: HTMLElement;
  shape?: string; // "circle" | "square"; // for border radius 100% or 0
  color?: string; // names for bootstrap theme colors or any CSS color expression
  borderRadius?: string; // CSS string
  smallSize?: string; // CSS string
  fullSize?: string; // CSS string
}
