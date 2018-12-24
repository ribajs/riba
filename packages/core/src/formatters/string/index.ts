import { IModuleFormatters } from '../../interfaces';

// string formatters
import { append } from './append.formatter';
import { downcase } from './downcase.formatter';
import { filled } from './filled.formatter';
import { handleize } from './handleize.formatter';
import { isString } from './isString.formatter';
import { pluralize } from './pluralize.formatter';
import { prepend } from './prepend.formatter';
import { upcase } from './upcase.formatter';
import { replace } from './replace.formatter';
import { replace_first } from './replace-first.formatter';
import { slice } from './slice.formatter';
import { strip } from './strip.formatter';
import { strip_html } from './strip-html.formatter';
import { stringFormatter } from './string.formatter';

export {
  append, downcase, filled, handleize, isString, pluralize, prepend, upcase, replace, replace_first, slice, strip, strip_html, stringFormatter,
};

export const stringFormatters: IModuleFormatters = {
  append, downcase, filled, isString, handleize, pluralize, prepend, upcase, replace, replace_first, slice, strip, strip_html, string: stringFormatter,
};
