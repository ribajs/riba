import { BinderDeprecated } from "./binder-deprecated";
import { Binder } from "../binder";
import { ClassOfBinder } from "./class-of-binder";

/**
 * A list of binders with any key name
 * @deprecated
 */
export interface BindersDeprecated<T = any, E = HTMLUnknownElement> {
  [name: string]: BinderDeprecated<T, E>;
}

export interface Binders<T = any, E = HTMLUnknownElement> {
  [name: string]: ClassOfBinder<Binder<T, E>, E>;
}
