import { TouchData } from "./touch-data.js";
import { TouchDirection } from "./touch-direction.js";

export interface TouchSwipeData {
  direction: TouchDirection;
  duration: number;
  endEvnt?: TouchData;
  originalEvent?: Event;
  startEvnt?: TouchData;
  target?: HTMLElement;
  xAmount: number;
  yAmount: number;
}
