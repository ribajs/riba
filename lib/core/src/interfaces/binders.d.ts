import { IBinder } from './binder';
/**
 * A list of binders with any key name
 */
export interface IBinders<ValueType> {
    [name: string]: IBinder<ValueType>;
}
