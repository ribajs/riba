import { IFormatters } from '../../formatter.service';

// string formatters
import { append } from './append.formatter';
import { downcase } from './downcase.formatter';
import { filled } from './filled.formatter';
import { isString } from './isString.formatter';
import { pluralize } from './pluralize.formatter';
import { prepend } from './prepend.formatter';
import { slice } from './slice.formatter';
import { strip } from './strip.formatter';
import { upcase } from './upcase.formatter';

export { append, downcase, filled, isString, pluralize, prepend, slice, strip, upcase };

export const stringFormatters: IFormatters = {
  append, downcase, filled, isString, pluralize, prepend, slice, strip, upcase,
};
