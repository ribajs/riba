import { IFormatters } from '../../formatter.service';

// string formatters
import { append } from './append.formatter';
import { downcase } from './downcase.formatter';
import { filled } from './filled.formatter';
import { handleize } from './handleize.formatter';
import { isString } from './isString.formatter';
import { pluralize } from './pluralize.formatter';
import { prepend } from './prepend.formatter';
import { upcase } from './upcase.formatter';
import { slice } from './slice.formatter';
import { strip } from './strip.formatter';
import { strip_html } from './strip-html.formatter';

export { append, downcase, filled, handleize, isString, pluralize, prepend, upcase, slice, strip, strip_html };

export const stringFormatters: IFormatters = {
  append, downcase, filled, isString, handleize, pluralize, prepend, upcase, slice, strip, strip_html,
};
