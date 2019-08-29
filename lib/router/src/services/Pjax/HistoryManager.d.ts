import { IState } from '../../interfaces/state';
/**
 * HistoryManager helps to keep track of the navigation
 *
 * @namespace Barba.HistoryManager
 * @type {object}
 */
export declare class HistoryManager {
    private static instance;
    /**
     * Keep track of the status in historic order
     *
     * @memberOf Barba.HistoryManager
     * @readOnly
     * @type {Array}
     */
    private history;
    constructor();
    /**
     * Return information about the current status
     *
     * @memberOf Barba.HistoryManager
     * @return {IState}
     */
    currentStatus(): IState;
    /**
     * Return information about the previous status
     *
     * @memberOf Barba.HistoryManager
     * @return {IState}
     */
    prevStatus(): IState | null;
    /**
     * Add a new set of url and namespace
     *
     * @memberOf Barba.HistoryManager
     * @param {String} url
     * @param {String} namespace
     */
    add(url: string, namespace?: string): void;
}
