import type { Binder } from "../binder";
import type { ClassOfBinder } from "./class-of-binder";

/**
 * A list of binders with it's key name
 */
export interface Binders<T = any, E = HTMLUnknownElement> {
  [key: string]: ClassOfBinder<Binder<T, E>, E>;
}
