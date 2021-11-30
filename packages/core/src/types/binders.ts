import { BinderDeprecated } from "./binder-deprecated";
import { Binder } from "../binder";
import { TypeOf } from "./type-of";

/**
 * A list of binders with any key name
 * @deprecated
 */
export interface BindersDeprecated<T = unknown, E = HTMLUnknownElement> {
  [name: string]: BinderDeprecated<T, E>;
}

export interface Binders<T = unknown, E = HTMLUnknownElement> {
  [name: string]: TypeOf<Binder<T, E>>;
}
