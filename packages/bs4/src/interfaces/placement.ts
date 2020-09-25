export type PlacementFn = (el1: HTMLElement, el2: HTMLElement) => string;

export type Placement =
  | "auto"
  | "top"
  | "right"
  | "bottom"
  | "left"
  | PlacementFn;
