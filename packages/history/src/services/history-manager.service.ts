import { State } from "../types/state";
/**
 * HistoryManager helps to keep track of the navigation
 */
export class HistoryManager {
  private static instance: HistoryManager;

  /**
   * Keep track of the status in historic order
   */
  private readonly history: State[] = [];

  constructor() {
    if (HistoryManager.instance) {
      return HistoryManager.instance;
    }

    HistoryManager.instance = this;
    return HistoryManager.instance;
  }

  /**
   * Return information about the current status
   */
  public currentStatus(): State {
    return this.history[this.history.length - 1];
  }

  /**
   * Return information about the previous status
   */
  public prevStatus(): State | null {
    const history = this.history;

    if (history.length < 2) {
      return null;
    }

    return history[history.length - 2];
  }

  /**
   * Add a new set of url and namespace
   */
  public add(url: string, namespace: string | null = null) {
    this.history.push({
      namespace,
      url
    });
  }
}
