import { IBinder } from './binder';
/**
 * This wrapper is used if you need to pass over some dependencies for your binder
 */
export declare type BinderWrapper<ValueType> = (...deps: any[]) => IBinder<ValueType>;
