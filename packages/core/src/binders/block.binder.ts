import { IBinder } from '../interfaces';

export interface IAssign {
  key: string;
  value: any;
}

/**
 * Blocks the binding for the current element and his childs
 */
export const blockBinder: IBinder<IAssign> = {
  name: 'block',
  block: true,
  routine(el: HTMLElement) {/**/},
};
