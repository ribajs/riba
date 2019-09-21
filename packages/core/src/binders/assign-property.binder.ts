import { IBinder } from '../interfaces';
import { Utils } from '../services/utils';

export interface IAssign {
  key: string;
  value: any;
}

/**
 * assign-*
 * Assign a value in your model.
 * Sets or overwrites a value by his property name (named whatever value is in place of [property]) in your model.
 * @example
 * <div rv-assign-new='"hello"'>{new}</div>
 */
export const assignPropertyBinder: IBinder<IAssign> = {
  name: 'assign-*',
  routine(el: HTMLElement, value: any) {
    const propertyName = (this.args[0] as string).trim();
    const obj: any = {};
    obj[propertyName] = value;
    return Utils.extend(false, this.view.models, obj);
  },
};
