import { Position } from "./position.js";

export interface ScrollPosition extends Position {
  /** horizontal: left / right / width */
  maxX: number;
  /** vertical: top / bottom / height */
  maxY: number;
}
