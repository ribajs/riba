import { Debug } from '../../vendors/debug.module';

const _debug = Debug('formatter');

export const debug = {
  name: 'debug',
  read(toPrint: any) {
    _debug(toPrint);
    return toPrint;
  },
};
