import { AllowList } from "../helper/sanitizer";
import { Placement } from "./placement";

export type TooltipOffsetFn = (
  offsets: any /*TODO*/,
  el: HTMLElement
) => number[];

export type TooltipTitleFn = (el: HTMLElement) => string;
export type TooltipContentFn = (el: HTMLElement) => string;

export interface TooltipOptions {
  animation: boolean;
  delay: number | { show: number; hide: number };
  html: boolean;
  placement: Placement;
  selector?: string;
  template: string;
  title: string | TooltipTitleFn;
  trigger: string;
  offset: number | TooltipOffsetFn;
  container?: Element; // TODO,
  fallbackPlacement: "flip";
  boundary: "scrollParent";
  sanitize: boolean;
  sanitizeFn: null;
  allowList: AllowList;
  popperConfig: null | any; // TODO
  content?: string | TooltipContentFn;
}
