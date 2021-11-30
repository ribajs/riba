import { Binding } from "../binding";
import { Binder } from "../binder";

/** Interface for the event handler, augment the event handler of the on-* binder */
export type EventHandler = (
  this: any,
  context: Binding | Binder<any, any>,
  ev: Event,
  binding: Binding | Binder<any, any>,
  el: HTMLElement
) => void;
