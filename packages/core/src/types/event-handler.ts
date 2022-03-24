import type { Binder } from "../binder.js";

/** Interface for the event handler, augment the event handler of the on-* binder */
export type EventHandler = (
  this: any,
  context: Binder<any, any>,
  ev: Event,
  binding: Binder<any, any>,
  el: HTMLElement
) => void;
