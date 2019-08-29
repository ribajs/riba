import { IBinder } from '../interfaces';
export interface IAssign {
    key: string;
    value: any;
}
/**
 * Assign a value in your model, value must be a object
 * experimental, please TESTME
 */
export declare const assignBinder: IBinder<IAssign>;
