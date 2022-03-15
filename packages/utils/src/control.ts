import { Deferred, TimeoutPromise } from "./types/index.js";

export const noop = () => {
  /** do nothing */
};

export const times = (n: number, cb: () => void) => {
  for (let i = 0; i < n; i++) {
    cb();
  }
};

export const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const waitForProp = async <T = any,>(
  propName: string,
  obj: any = window,
  delay = 1000
) => {
  while (!obj[propName]) {
    await sleep(delay);
  }
  return obj[propName] as T;
};

/**
 * Return a new "Deferred" object
 * https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred
 *
 * @return
 */
export const deferred = <T = any,>() => {
  const obj: Partial<Deferred<T>> = {};
  const prom = new Promise<T>((resolve, reject) => {
    obj.resolve = resolve;
    obj.reject = reject;
  });
  obj.promise = prom;
  return obj as Deferred<T>;
};

/**
 * debounce (Timeout + Callback edition)
 * The debounce function receives our function as a parameter
 * It is recommended to use this method for scroll events, but the event should still be passive.
 * In the debouncing technique, no matter how many times the user fires the event,
 * the attached function will be executed only after the specified time once the user stops firing the event.
 * This method uses internally the setTimeout method
 * @see https://css-tricks.com/styling-based-on-scroll-position/
 * @see https://www.telerik.com/blogs/debouncing-and-throttling-in-javascript
 */
export const debounceCb = <T = any,>(fn: (...args: any[]) => T, wait = 100) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...params: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...params), wait);
  };
};

/**
 * debounce (Timeout + Promise edition)
 * The debounce function receives our function as a parameter
 * It is recommended to use this method for scroll events, but the event should still be passive.
 * In the debouncing technique, no matter how many times the user fires the event,
 * the attached function will be executed only after the specified time once the user stops firing the event.
 * This method uses internally the setTimeout method
 */
export const debounceT = <T = any,>(fn: (...args: any[]) => any, wait = 100) => {
  let resolve: (val: any) => any;
  let reject: (error: any) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  let debounce: undefined | ((...params: any[]) => void) = undefined;

  return (...params: any[]) => {
    if (!debounce)
      debounce = debounceCb(() => {
        try {
          resolve(fn(...params));
          // Reset
          debounce = undefined;
        } catch (error) {
          reject(error);
        }
      }, wait);
    debounce(...params);

    return promise;
  };
};

/**
 * debounce (RequestAnimationFrame + Promise edition)
 * The debounce function receives our function as a parameter
 * It is recommended to use this method for scroll events, but the event should still be passive.
 * In the debouncing technique, no matter how many times the user fires the event,
 * the attached function will be executed only after the specified time once the user stops firing the event.
 * This method uses internally the requestAnimationFrame method
 * @see https://css-tricks.com/styling-based-on-scroll-position/
 * @see https://www.telerik.com/blogs/debouncing-and-throttling-in-javascript
 */
export const debounceF = (fn: (...params: any) => any) => {
  // This holds the requestAnimationFrame reference, so we can cancel it if we wish
  let frame: number | null = null;
  let resolve: (val: any) => any;
  let reject: (error: Error) => void;
  let promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  // The debounce function returns a new function that can receive a variable number of arguments
  return (...params: any) => {
    // If the frame variable has been defined, clear it now, and queue for next frame
    if (frame) {
      cancelAnimationFrame(frame);
    }

    // Queue our function call for the next frame
    frame = window.requestAnimationFrame(() => {
      // Call our function and pass any params we received
      try {
        resolve(fn(...params));
      } catch (error) {
        reject(error as Error);
      }
      // reset frame and initialize new promise for next call
      frame = null;
      promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
    });

    return promise;
  };
};

/**
 * debounce (RequestAnimationFrame + Promise edition)
 * The debounce function receives our function as a parameter
 * It is recommended to use this method for scroll events, but the event should still be passive.
 * In the debouncing technique, no matter how many times the user fires the event,
 * the attached function will be executed only after the specified time once the user stops firing the event.
 * This method uses requestAnimationFrame method if no delay is passed, otherwise a timeout
 */
export const debounce = (fn: (...params: any) => any, wait?: number) => {
  if (typeof wait === "number") {
    return debounceT(fn, wait);
  } else {
    return debounceF(fn);
  }
};

/**
 * The throttle function receives our function as a parameter
 * It is recommended to use this method for resize events
 * Throttling is a technique in which, no matter how many times the user fires the event,
 * the attached function will be executed only once in a given time interval.
 * @see https://www.telerik.com/blogs/debouncing-and-throttling-in-javascript
 * @see https://gist.github.com/peduarte/969217eac456538789e8fac8f45143b4
 */
export const throttle = (fn: (...params: any[]) => any, wait = 100) => {
  let timerId: number | null = null;
  let resolve: (val: any) => any;
  let reject: (error: Error) => void;
  let promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return (...params: any[]) => {
    if (timerId === null) {
      timerId = window.setTimeout(() => {
        // reset timerId and initialize new promise for next call
        timerId = null;
        promise = new Promise((res, rej) => {
          resolve = res;
          reject = rej;
        });
      }, wait);
      try {
        resolve(fn(...params));
      } catch (error) {
        reject(error as Error);
      }
    }
    return promise;
  };
};

/**
 * Cancel promise on timeout.
 */
export const pTimeout = <T,>(value: Promise<T>, ms: number, error?: Error) => {
  const def = deferred<T>();

  const p: TimeoutPromise<T> = {
    _timeout: setTimeout(() => {
      def.reject(error || new Error(`Timeout after ${ms}ms`));
    }, ms),
    promise: def.promise,
    cancel: () => {
      def.resolve(value);
      if (p._timeout) {
        clearTimeout(p._timeout);
      }
    }
  };

  value
    .then((value: T) => {
      p.cancel();
      def.resolve(value);
    })
    .catch((error) => {
      p.cancel();
      def.reject(error);
    });

  return p.promise;
};
