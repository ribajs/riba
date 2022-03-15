import type { Binder } from "../binder.js";
import type { ClassOfBinder } from "./class-of-binder.js";

/**
 * A list of binders with it's key name
 */
export interface Binders<T = any, E = HTMLUnknownElement,> {
  [key: string]: ClassOfBinder<Binder<T, E>, E>;
}
