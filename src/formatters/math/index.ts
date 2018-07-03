import { IFormatters } from '../../formatter.service';

// math formatters
import { random } from './random.formatter';
import { plus } from './plus.formatter';
import { minus } from './minus.formatter';
import { times } from './times.formatter';
import { dividedBy } from './dividedBy.formatter';
import { modulo } from './modulo.formatter';
import { gcd } from './gcd.formatter';
import { even } from './even.formatter';
import { uneven } from './uneven.formatter';
import { digits } from './digits.formatter';

export { random, plus, minus, times, dividedBy, modulo, gcd, even, uneven, digits };

export const mathFormatters: IFormatters = {
  random, plus, minus, times, dividedBy, modulo, gcd, even, uneven, digits,
}