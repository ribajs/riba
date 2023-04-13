import type {
  ScrollPosition,
  ScrollDirection,
  BaseEventDetail,
} from "@ribajs/extras";

export interface ScrollEventDetail extends BaseEventDetail {
  startPosition?: ScrollPosition | null;
  endPosition?: ScrollPosition | null;
  currentPosition?: ScrollPosition;
  direction?: ScrollDirection;
}
