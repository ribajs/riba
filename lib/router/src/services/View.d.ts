/// <reference types="jquery" />
/**
 * BaseView to be extended
 *
 * @namespace Barba.BaseView
 * @type {Object}
 */
declare abstract class BaseView {
    /**
     * Namespace of the view.
     * (need to be associated with the data-namespace of the container)
     *
     * @memberOf Barba.BaseView
     * @type {string}
     */
    protected namespace?: string;
    protected $container?: JQuery<HTMLElement>;
    private dispatcher;
    /**
     * Helper to extend the object
     *
     * @memberOf Barba.BaseView
     * @param  {Object} newObject
     * @return {Object} newInheritObject
     */
    extend(obj: object): object;
    /**
     * Init the view.
     * P.S. Is suggested to init the view before starting Barba.Pjax.start(),
     * in this way .onEnter() and .onEnterCompleted() will be fired for the current
     * container when the page is loaded.
     *
     * @memberOf Barba.BaseView
     */
    init(): void;
    /**
     * This function will be fired when the container
     * is ready and attached to the DOM.
     *
     * @memberOf Barba.BaseView
     * @abstract
     */
    protected abstract onEnter(): any;
    /**
     * This function will be fired when the transition
     * to this container has just finished.
     *
     * @memberOf Barba.BaseView
     * @abstract
     */
    protected abstract onEnterCompleted(): any;
    /**
     * This function will be fired when the transition
     * to a new container has just started.
     *
     * @memberOf Barba.BaseView
     * @abstract
     */
    protected abstract onLeave(): any;
    /**
     * This function will be fired when the container
     * has just been removed from the DOM.
     *
     * @memberOf Barba.BaseView
     * @abstract
     */
    protected abstract onLeaveCompleted(): any;
}
export { BaseView };
