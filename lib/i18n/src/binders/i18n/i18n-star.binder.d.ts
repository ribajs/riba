import { BinderWrapper } from '@ribajs/core';
export interface IBinderAttributeChangedEvent {
    detail: {
        name: string;
        oldValue: string;
        newValue: string;
        namespace: null;
    };
}
/**
 *
 */
export declare const i18nStarBinderWrapper: BinderWrapper<string>;
