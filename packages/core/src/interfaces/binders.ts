import { Binder } from './binder';
/**
 * A list of binders with any key name
 */
export interface Binders<ValueType> {
  [name: string]: Binder<ValueType>;
}
