import { Position } from "./position";
import { TouchOffset } from "./touch-offset";

export interface TouchData {
  position: Position;
  offset: TouchOffset;
  time: number;
  index?: number;
}
