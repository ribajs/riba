import { Position } from "./position.js";
import { TouchOffset } from "./touch-offset.js";

export interface TouchData {
  position: Position;
  offset: TouchOffset;
  time: number;
  index?: number;
}
