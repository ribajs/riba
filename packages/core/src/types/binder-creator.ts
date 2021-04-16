import { Binder } from "./binder";
/**
 * This wrapper is used if you need to pass over some dependencies for your binder
 */
export type BinderCreator<T> = (options: unknown) => Binder<T>;
