import { Debug } from '../../vendors/debug.module';

const _debug = Debug('formatter');

export const debugFormatter = {
  name: 'debug',
  read(toPrint: any) {
    _debug(toPrint);
    return toPrint;
  },
};
