import { IBinder } from '../interfaces';
export interface IAssign {
    key: string;
    value: any;
}
/**
 * Blocks the binding for the current element and his childs
 */
export declare const blockBinder: IBinder<IAssign>;
