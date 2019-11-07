import { Formatter } from '../../interfaces';

// babel misinterprets the "this" fake parameter, so we define it in this interfaces
export type FormatterFuntionParam = (this: any, ...args: any[]) => any;

/**
 * Calls a function with arguments
 * @param fn The function you wish to call
 * @param args the parameters you wish to call the function with
 */
export const callFormatter: Formatter = {
  name: 'call',
  read(fn: FormatterFuntionParam, ...args: any[]) {
    return fn.apply(this, args);
  },
};
