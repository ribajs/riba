import { IState } from '../interfaces/state';
/**
 * HistoryManager helps to keep track of the navigation
 *
 * @namespace Barba.HistoryManager
 * @type {object}
 */
export class HistoryManager {

  private static instance: HistoryManager;

  /**
   * Keep track of the status in historic order
   *
   * @memberOf Barba.HistoryManager
   * @readOnly
   * @type {Array}
   */
  private history: IState[] = new Array();

  constructor() {
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
  public currentStatus(): IState {
    return this.history[this.history.length - 1];
  }

  /**
   * Return information about the previous status
   *
   * @memberOf Barba.HistoryManager
   * @return {IState}
   */
  public prevStatus(): IState | null {
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
  public add(url: string, namespace?: string) {

    if (!namespace) {
      namespace = undefined;
    }

    this.history.push({
      namespace,
      url,
    });
  }

}
