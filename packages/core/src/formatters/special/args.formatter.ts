import { IFormatter } from '../../interfaces';
import { IFormatterFuntionParam } from './call.formatter';
import { Binding } from '../../binding';

/**
 * Sets arguments to a function without directly call them
 * ```html
 * <button rv-on-click="sum | args 1 2"></button>
 * ```
 * @param fn The function the event handler should call
 * @param fnArgs the parameters you wish to get called the function with
 */
export const argsFormatter: IFormatter = {
  name: 'args',
  read(fn: IFormatterFuntionParam, ...fnArgs: any[]) {
    return (event: Event, scope: any, el: HTMLElement, binding: Binding) => {
      // append the event handler args to passed args
      fnArgs.push(event);
      fnArgs.push(scope);
      fnArgs.push(el);
      fnArgs.push(binding);
      return fn.apply(this, fnArgs);
    };
  },
};
