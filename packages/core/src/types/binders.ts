import { Binder } from "./binder";
/**
 * A list of binders with any key name
 */
export interface Binders<T = unknown, E = HTMLUnknownElement> {
  [name: string]: Binder<T, E>;
}
