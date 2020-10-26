import { Binding } from "../binding";

/** Interface for the event handler, augment the event handler of the on-* binder */
export type EventHandler = (
  this: any,
  context: Binding,
  ev: Event,
  binding: Binding,
  el: HTMLElement
) => void;
