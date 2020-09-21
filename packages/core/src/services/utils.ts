import { ready } from "@ribajs/utils/src/dom";

/**
 * Just a class with some helpful functions
 *
 * @export
 * @class Utils
 */
export class Utils {
  /**
   * Cross-browser Document Ready check
   * @see https://www.competa.com/blog/cross-browser-document-ready-with-vanilla-javascript/
   * @param callback
   */
  public static domIsReady(callback: () => void) {
    console.warn(
      "Utils.domIsReady is deprecated, use import { ready } from '@ribajs/utils/src/dom' instead"
    );
    return ready(callback);
  }
}
