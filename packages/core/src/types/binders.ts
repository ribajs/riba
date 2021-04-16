import { Binder } from "./binder";
/**
 * A list of binders with any key name
 */
export interface Binders<T = unknown> {
  [name: string]: Binder<T>;
}
