// babel misinterprets the "this" fake parameter, so we define it in this interfaces
export type IFormatterFuntionParam = (this: any, ...args: any[]) => any;
export type IFunctionFormatter = (this: any, fn: IFormatterFuntionParam, ...args: any[]) => any;

/**
 * Calls a function with arguments
 * @param fn The function you wish to call
 * @param args the parameters you wish to call the function with
 */
export const call = <IFunctionFormatter> function(fn: IFormatterFuntionParam, ...args: any[]) {
  return fn.apply(this, args);
};
