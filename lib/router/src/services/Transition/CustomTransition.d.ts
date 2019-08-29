/// <reference types="jquery" />
import { Debug } from '@ribajs/core';
import { BaseTransition } from './BaseTransition';
import { ITransition } from '../../interfaces/transition';
declare global {
    interface Window {
        model: any;
    }
}
/**
 * Basic Transition object, wait for the new Container to be ready,
 * scroll top, and finish the transition (removing the old container and displaying the new one)
 *
 * @private
 */
declare class CustomTransition extends BaseTransition implements ITransition {
    protected debug: Debug.Debugger;
    init($oldContainer: JQuery<Element>, newContainer: Promise<JQuery<Element>>): Promise<void>;
    start(): void;
    finish($container: JQuery<Element>): void;
}
export { CustomTransition };
