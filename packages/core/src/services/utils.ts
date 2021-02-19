import { ready } from "@ribajs/utils/src/dom";

/**
 * Just a class with some helpful functions
 *
 * @deprecated Use '@ribajs/utils' module instead
 */
export class Utils {
  /**
   * Cross-browser Document Ready check
   * @deprecated Use `import { ready } from '@ribajs/utils/src/dom'` instead
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
