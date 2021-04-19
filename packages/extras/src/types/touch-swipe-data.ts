import { TouchData } from "./touch-data";
import { TouchDirection } from "./touch-direction";

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
