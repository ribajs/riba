import { Deferred } from "./types";

export const noop = () => {
  /** do nothing */
};

export const times = (n: number, cb: () => void) => {
  for (let i = 0; i < n; i++) {
    cb();
  }
};

/**
 * Return a new "Deferred" object
 * https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred
 *
 * @return
 */
export const deferred = () => {
  const obj: Partial<Deferred> = {};
  const prom = new Promise((resolve, reject) => {
    obj.resolve = resolve;
    obj.reject = reject;
  });
  obj.promise = prom;
  return obj as Deferred;
};

/**
 * The debounce function receives our function as a parameter
 * It is recommended to use this method for scroll events, but the event should still be passive
 * This method uses internally the requestAnimationFrame method
 * @see https://css-tricks.com/styling-based-on-scroll-position/
 * @see https://www.telerik.com/blogs/debouncing-and-throttling-in-javascript
 */
export const debounce = (fn: (...params: any) => any) => {
  // This holds the requestAnimationFrame reference, so we can cancel it if we wish
  let frame: number;

  // The debounce function returns a new function that can receive a variable number of arguments
  return (...params: any) => {
    // If the frame variable has been defined, clear it now, and queue for next frame
    if (frame) {
      cancelAnimationFrame(frame);
    }

    // Queue our function call for the next frame
    frame = window.requestAnimationFrame(() => {
      // Call our function and pass any params we received
      fn(...params);
    });
  };
};

/**
 * The throttle function receives our function as a parameter
 * It is recommended to use this method for resize events
 * Throttling is a technique in which, no matter how many times the user fires the event, the attached function will be executed only once in a given time interval.
 * @see https://www.telerik.com/blogs/debouncing-and-throttling-in-javascript
 * @see https://gist.github.com/peduarte/969217eac456538789e8fac8f45143b4
 */
export const throttle = (fn: (...params: any) => any, wait = 100) => {
  let timerId: number | null = null;
  return (...params: any[]) => {
    if (timerId === null) {
      timerId = window.setTimeout(() => {
        fn(...params);
        timerId = null;
      }, wait);
    }
  };
};
