/// <reference types="jquery" />
import { Debug } from '@ribajs/core';
import { ITransition } from '../../interfaces/transition';
/**
 * BaseTransition to extend
 *
 * @namespace Barba.BaseTransition
 * @type {Object}
 */
export declare abstract class BaseTransition implements ITransition {
    /**
     * @memberOf Barba.BaseTransition
     * @type {JQuery<Element>}
     */
    protected $oldContainer?: JQuery<Element>;
    /**
     * @memberOf Barba.BaseTransition
     * @type {JQuery<Element>}
     */
    protected $newContainer?: JQuery<Element>;
    /**
     * @memberOf Barba.BaseTransition
     * @type {Promise}
     */
    protected newContainerLoading?: Promise<JQuery<Element>>;
    protected deferred: any;
    protected debug: Debug.Debugger;
    protected action: 'replace' | 'append';
    constructor(action?: 'replace' | 'append');
    /**
     * This function is called from Pjax module to initialize
     * the transition.
     *
     * @memberOf Barba.BaseTransition
     * @private
     * @param  {Element} oldContainer
     * @param  {Promise} newContainer
     * @return {Promise}
     */
    init($oldContainer: JQuery<Element>, newContainer: Promise<JQuery<Element>>): Promise<void>;
    /**
     * This function needs to be called as soon the Transition is finished
     *
     * @memberOf Barba.BaseTransition
     */
    done(): void;
    /**
     * Constructor for your Transition
     *
     * @memberOf Barba.BaseTransition
     * @abstract
     */
    abstract start(): any;
}
