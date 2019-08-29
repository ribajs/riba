import { IBinder } from '../interfaces';
export interface IBinderAttributeChangedEvent {
    detail: {
        name: string;
        oldValue: string;
        newValue: string;
        namespace: null;
    };
}
/**
 * Sets the attribute on the element. If no binder above is matched it will fall
 * back to using this binder.
 */
export declare const starBinder: IBinder<string>;
