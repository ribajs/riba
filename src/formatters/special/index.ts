import { IFormatters } from '../../formatter.service';

// special helper formatters
import { args } from './args.formatter';
import { debug } from './debug.formatter';
import { defaultBinder } from './default.formatter';
import { call } from './call.formatter';
import { currency } from './currency.formatter';

export { args, debug, defaultBinder, currency };

export const specialFormatters: IFormatters = {
  args, debug, default: defaultBinder, call, currency,
};
