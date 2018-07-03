import Debug from 'debug';

const consoleDebug = Debug('formatter');

export const debug = (target: any) => {
  consoleDebug(target);
  return target;
};
