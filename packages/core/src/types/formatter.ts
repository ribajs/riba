export interface FormatterEventTarget {
  on: (
    eventName: string,
    callback: (...args: any[]) => void,
    ...args: any[]
  ) => any;
  off: (
    eventName: string,
    callback: (...args: any[]) => void,
    ...args: any[]
  ) => any;
}

export interface FormatterContext {
  /**
   * Re-run this binding without changing the observed keypath.
   */
  invalidate: () => void;
  /**
   * Register cleanup logic that will run automatically on binding unbind.
   * If a key is provided, existing cleanup for that key is replaced.
   */
  addCleanup: (cleanup: () => void, key?: string) => void;
  /**
   * Register and auto-cleanup an event subscription for this binding.
   */
  on: (
    target: FormatterEventTarget,
    eventName: string,
    callback: (...args: any[]) => void,
    key?: string,
  ) => void;
}

export type FormatterFn = (
  val: any,
  ...args: Array<any | FormatterContext>
) => any;

export interface Formatter {
  name: string;
  read?: FormatterFn;
  publish?: FormatterFn;
  /**
   * A formatter can have any other private properties or methods
   */
  [propertyOrFunction: string]: any;
}
