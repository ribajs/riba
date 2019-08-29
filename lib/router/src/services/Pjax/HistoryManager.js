"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * HistoryManager helps to keep track of the navigation
 *
 * @namespace Barba.HistoryManager
 * @type {object}
 */
class HistoryManager {
    constructor() {
        /**
         * Keep track of the status in historic order
         *
         * @memberOf Barba.HistoryManager
         * @readOnly
         * @type {Array}
         */
        this.history = new Array();
        if (HistoryManager.instance) {
            return HistoryManager.instance;
        }
        HistoryManager.instance = this;
        return HistoryManager.instance;
    }
    /**
     * Return information about the current status
     *
     * @memberOf Barba.HistoryManager
     * @return {IState}
     */
    currentStatus() {
        return this.history[this.history.length - 1];
    }
    /**
     * Return information about the previous status
     *
     * @memberOf Barba.HistoryManager
     * @return {IState}
     */
    prevStatus() {
        const history = this.history;
        if (history.length < 2) {
            return null;
        }
        return history[history.length - 2];
    }
    /**
     * Add a new set of url and namespace
     *
     * @memberOf Barba.HistoryManager
     * @param {String} url
     * @param {String} namespace
     */
    add(url, namespace) {
        if (!namespace) {
            namespace = undefined;
        }
        this.history.push({
            namespace,
            url,
        });
    }
}
exports.HistoryManager = HistoryManager;
