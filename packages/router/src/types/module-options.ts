import type { Transition } from "./transition.js";
import type { TransitionDefinition } from "./transition-definition.js";

export type RouterModuleOptions = {
  defaultTransition: Transition;
  transitions: TransitionDefinition[];
  scrollToAnchorOffset: number;
};
