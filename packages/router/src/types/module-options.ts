import type { Transition } from "./transition.js";

export type RouterModuleOptions = {
  defaultTransition: Transition;
  scrollToAnchorOffset: number;
};
