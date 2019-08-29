import { EventDispatcher, Debug } from '@ribajs/core';
import { IEASDK } from '../interfaces/shopify-easdk';
export declare class WrapperService {
    static inIframe(): boolean;
    protected static ERRORS: {
        EASDK_NOT_FOUND: string;
    };
    event: EventDispatcher;
    protected debug: Debug.IDebugger;
    protected shopifyApp: IEASDK;
    constructor(shopifyApp?: IEASDK);
    useFallback(force: boolean): boolean;
}
