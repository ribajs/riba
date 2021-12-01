import type { View } from "../view";
import type { Binder } from "../binder";

/**
 * Interface for type of class
 * @see https://stackoverflow.com/a/56363362
 */
export interface ClassOfBinder<T = Binder<any, any>, E = any> extends Function {
  // tslint:disable:callable-types
  new (
    view: View,
    el: E,
    type: string | null,
    keypath: string | undefined,
    formatters: string[] | null,
    identifier: string | null
  ): T;
  block: boolean;
  key: string;
}
