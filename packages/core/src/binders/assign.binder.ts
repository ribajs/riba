import { IOneWayBinder } from '../services/binder.service';
import { Utils } from '../services/utils';

export interface IAssign {
  key: string;
  value: any;
}

/**
 * Assign a value in your model, value must be a object
 * experimental, please TESTME
 */
export const assign: IOneWayBinder<IAssign> = function(el: HTMLElement, obj: any) {
  Utils.extend(false, this.view.models, obj);
};
