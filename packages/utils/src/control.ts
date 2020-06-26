import { Deferred } from "./types";

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
 * @see https://css-tricks.com/styling-based-on-scroll-position/
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
    frame = requestAnimationFrame(() => {
      // Call our function and pass any params we received
      fn(...params);
    });
  };
};
