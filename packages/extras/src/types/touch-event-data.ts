import type { BaseEventDetail, TouchData } from "@ribajs/extras";

export interface TouchEventData extends BaseEventDetail, Partial<TouchData> {
  touches?: Array<Partial<TouchData>>;
  duration?: number;
  firstTap?: TouchData;
  secondTap?: TouchData;
  interval?: number;
}
