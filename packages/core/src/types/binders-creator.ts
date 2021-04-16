import { Binders } from "./binders";
/**
 * This wrapper is used if you need to pass over some dependencies for your binders
 */
export type BindersCreator<T = unknown> = (options: unknown) => Binders<T>;
