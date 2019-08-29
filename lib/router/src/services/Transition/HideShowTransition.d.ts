import { Debug } from '@ribajs/core';
import { BaseTransition } from './BaseTransition';
import { ITransition } from '../../interfaces/transition';
/**
 * Basic Transition object, wait for the new Container to be ready,
 * scroll top, and finish the transition (removing the old container and displaying the new one)
 *
 * @private
 * @namespace Barba.HideShowTransition
 * @augments Barba.BaseTransition
 */
export declare class HideShowTransition extends BaseTransition implements ITransition {
    protected debug: Debug.Debugger;
    protected action: 'replace' | 'append';
    protected scrollToTop: boolean;
    constructor(action?: 'replace' | 'append', scrollToTop?: boolean);
    /**
     * TODO use css transition: https://github.com/julianshapiro/velocity/wiki/Property---ScrollTop
     */
    doScrollToTop(): Promise<unknown>;
    start(): void;
    finish(): void;
}
