/**
 * Calls a function with arguments
 * @param fn The function you wish to call
 * @param args the parameters you wish to call the function with
 */
export const call = function(this: any, fn: (...args: any[]) => any, ...args: any[]) {
  return fn.apply(this, args);
};
