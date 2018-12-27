import { Debug } from '../../modules/debug.module';

const debuggurito = Debug('formatter');

export const debug = (target: any) => {
  debuggurito(target);
  return target;
};
