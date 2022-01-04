import type { Deferred, TimeoutPromise } from "./types/index.ts";

/**
 * See packages/core/src/formatters/type/json.formatter.ts
 */
export const toJsonString = <T = any>(
  object: T,
  space = 0,
  replaceSingleQuote = true,
) => {
  let result = JSON.stringify(object, null, space);
  if (replaceSingleQuote && result) {
    result = result.replace(/'/g, `&#39;`);
  }
  result = result.replace(/"/g, `'`);
  return result;
};

/**
 * Return a new "Deferred" object
 * https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred
 *
 * @return
 */
export const deferred = <T>() => {
  const obj: Partial<Deferred<T>> = {};
  const prom = new Promise<T>((resolve, reject) => {
    obj.resolve = resolve;
    obj.reject = reject;
  });
  obj.promise = prom;
  return obj as Deferred<T>;
};

/**
 * Cancel promise on timeout.
 */
export const pTimeout = <T>(
  value: Promise<T>,
  ms: number,
  error?: Error,
) => {
  const def = deferred<T>();

  const p: TimeoutPromise<T> = {
    _timeout: setTimeout(() => {
      def.reject(error || new Error(`Timeout after ${ms}ms`));
    }, ms),
    promise: def.promise,
    cancel: () => {
      def.resolve(value);
      clearTimeout(p._timeout);
    },
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
