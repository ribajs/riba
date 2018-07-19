// babel misinterprets the "this" fake parameter, so we define it in this interfaces
type ICallFormatterFuntionParam = (this: any, ...args: any[]) => any;
type ICallFormatter = (this: any, fn: ICallFormatterFuntionParam, ...args: any[]) => any;

/**
 * Calls a function with arguments
 * @param fn The function you wish to call
 * @param args the parameters you wish to call the function with
 */
export const call = <ICallFormatter> function(fn: ICallFormatterFuntionParam, ...args: any[]) {
  return fn.apply(this, args);
};
