import type { View } from "../view.js";
import type { Binder } from "../binder.js";

/**
 * Interface for type of class
 * @see https://stackoverflow.com/a/56363362
 */
export interface ClassOfBinder<T = Binder<any, any>, E = any> {
  // tslint:disable:callable-types
  new (
    view: View,
    el: E,
    type: string | null,
    name: string,
    keypath: string | undefined,
    formatters: string[] | null,
    identifier: string | null,
  ): T;
  block: boolean;
  key: string;
}
