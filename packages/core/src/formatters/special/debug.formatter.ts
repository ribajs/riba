import Debug from 'debug';

const debuggurito = Debug('formatter');

export const debug = (target: any) => {
  debuggurito(target);
  return target;
};
