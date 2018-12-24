import { IModuleFormatters } from '../../interfaces';

// special helper formatters
import { args } from './args.formatter';
import { booleanFormatter } from './boolean.formatter';
import { debug } from './debug.formatter';
import { defaultBinder } from './default.formatter';
import { call } from './call.formatter';
import { currency } from './currency.formatter';
import { json } from './json.formatter';

export { args, booleanFormatter, debug, defaultBinder, call, currency, json };

export const specialFormatters: IModuleFormatters = {
  args, boolean: booleanFormatter, debug, default: defaultBinder, call, currency, json,
};
